import { Context } from 'koa'
import notionFetch from '../utils/fetch'
import notionConfig from '../config/notion'
import { find, findKey, isNil, get } from 'lodash'
import {
  NotionUserContent,
  NotionQueryCollection,
  NotionBlock,
  NotionPageChunk,
  NotionRecordMapItem,
} from 'src/types/notion'
import { Post } from 'src/types/api'
import * as validator from 'validator'

export default class NotionServices {
  static generateQueryCollectionParams = (
    viewId: string,
    collectionId: string,
    sortId?: string,
    filterId?: string
  ) => {
    return {
      collectionId: collectionId,
      collectionViewId: viewId,
      query: {
        sort: [
          !isNil(sortId) && {
            property: sortId,
            direction: 'descending',
          },
        ].filter(item => !!item),
        filter_operator: !isNil(filterId) && 'and',
        filter: [
          !isNil(filterId) && {
            property: filterId,
            comparator: 'checkbox_is',
            value: 'Yes',
          },
        ].filter(item => !!item),
      },
      loader: {
        type: 'table',
        limit: 200,
        userTimeZone: 'Asia/Shanghai',
        userLocale: 'zh-cn',
        loadContentCover: false,
      },
    }
  }

  static generateLoadPageChunkParams = (pageId: string) => {
    return {
      pageId,
      limit: 1000,
      cursor: {
        stack: [],
      },
      chunkNumber: 0,
      vertialColumns: false,
    }
  }

  static parseBlockTreeContentById = (
    blocks: NotionRecordMapItem<NotionBlock>,
    ids: string[]
  ) => {
    return ids.map(id => {
      const blockEntity = find(blocks, block => block.value.id === id)
      if (isNil(blockEntity)) {
        return
      } else {
        const blockContents = blockEntity.value.content
        if (!Array.isArray(blockContents)) {
          return blockEntity.value
        } else {
          return {
            ...blockEntity.value,
            content: NotionServices.parseBlockTreeContentById(
              blocks,
              blockContents
            ),
          }
        }
      }
    })
  }

  static async getPostListByCollectionName(name: string): Promise<Post[]> {
    try {
      const userContent: NotionUserContent = await notionFetch({
        endpoint: 'loadUserContent',
        token: notionConfig.token,
      })
      const { block, collection } = userContent.recordMap
      const targetCollectionItem = find(collection, item => {
        return item.value.name[0][0] === name
      })
      const sortSchemaId = findKey(targetCollectionItem.value.schema, item => {
        return item.type === 'created_time' && item.name === 'Created Time'
      })
      const filterSchemaId = findKey(
        targetCollectionItem.value.schema,
        item => {
          return item.type === 'checkbox' && item.name === 'Publish'
        }
      )
      const collectionViewPage = find(block, item => {
        return (
          item.value.type === 'collection_view_page' &&
          item.value.id === targetCollectionItem.value.parent_id
        )
      })
      const collectionViewId = collectionViewPage.value.view_ids![0]
      const collectionId = collectionViewPage.value.collection_id!
      const queryCollectionParams = this.generateQueryCollectionParams(
        collectionViewId,
        collectionId,
        sortSchemaId,
        filterSchemaId
      )
      const queryCollection: NotionQueryCollection = await notionFetch({
        endpoint: 'queryCollection',
        token: notionConfig.token,
        body: queryCollectionParams,
      })
      const { blockIds } = queryCollection.result
      const targetCollectionInQueryCollectionRes = collection[collectionId]
      const collectionTagsSchema = findKey(
        targetCollectionInQueryCollectionRes.value.schema,
        item => {
          return item.type === 'multi_select' && item.name === 'Tags'
        }
      )
      const linkSchema = findKey(
        targetCollectionInQueryCollectionRes.value.schema,
        item => {
          return item.type === 'text' && item.name === 'Link'
        }
      )
      return blockIds.map(blockId => {
        const targetBlock = queryCollection.recordMap.block[blockId].value
        const id = targetBlock.id
        const title = targetBlock.properties.title[0][0]
        const tags = get(
          targetBlock,
          ['properties', collectionTagsSchema, 0, 0],
          ''
        )
          .split(',')
          .filter(tag => tag.length !== 0)
        const link = get(targetBlock, ['properties', linkSchema, 0, 0])
        const lastEditedTime = targetBlock.last_edited_time
        const createdTime = targetBlock.created_time
        return {
          id,
          title,
          tags,
          lastEditedTime,
          createdTime,
          link,
        }
      })
    } catch (err) {
      console.log(err)
      return []
    }
  }

  static async findPostByLinkOrID(linkOrID: string) {
    const isIDLink = validator.isUUID(linkOrID)
    let postId: string = linkOrID
    if (!isIDLink) {
      const postList = await this.getPostListByCollectionName(
        notionConfig.collectionName
      )
      postId = find(postList, post => {
        return post.link === linkOrID
      }).id
    }
    const pageData: NotionPageChunk = await notionFetch({
      endpoint: 'loadPageChunk',
      token: notionConfig.token,
      body: this.generateLoadPageChunkParams(postId),
    })
    const blocks = pageData.recordMap.block
    const pageBlock = find(blocks, block => block.value.type === 'page')
    const contentBlocks = pageBlock.value.content
      .map(id => this.parseBlockTreeContentById(blocks, [id]))
      .map(arrayMap => arrayMap[0])
    const id = get(pageBlock, ['value', 'id'])
    const title = get(pageBlock, ['value', 'properties', 'title', 0, 0])
    const lastEditedTime = get(pageBlock, ['value', 'last_edited_time'])
    const createdTime = get(pageBlock, ['value', 'created_time'])
    return {
      id,
      title,
      lastEditedTime,
      createdTime,
      blocks: contentBlocks,
    }
  }
}

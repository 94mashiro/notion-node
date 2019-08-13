import NotionClient from '../../../api/src/client'
import notionConfig from '../../src/config/notion'
import { find, get, findKey } from 'lodash'
import {
  CollectionFilterQuery,
  CollectionSortQuery,
} from '../../../api/src/queryCollection'
import {
  CollectionSchema,
  PageChunkMeta,
  LoadPageChunkResponse,
} from '../../../api/src/loadPageChunk'
import { Block } from '../../../api/src/getRecordValues'
import redis from '../utils/redis'
import { isNil } from 'lodash'

const { token, collectionId, collectionViewId, tagProperties } = notionConfig
const client = new NotionClient(token)

export type GetPostListData = {
  schema: CollectionSchema
  page: Block[]
}

const getPostList = async (): Promise<GetPostListData> => {
  const CACHE_KEY = 'GET_POST_LIST'
  const cache = await redis.get(CACHE_KEY)
  if (isNil(cache)) {
    const filterQuery: CollectionFilterQuery[] = [
      {
        comparator: 'checkbox_is',
        property: tagProperties.publish,
        value: 'Yes',
      },
    ]
    const sortQuery: CollectionSortQuery[] = [
      {
        direction: 'descending',
        property: tagProperties.createdTime,
        type: 'created_time',
      },
    ]
    const queryCollection = await client.GetQueryCollection({
      collectionID: collectionId,
      collectionViewID: collectionViewId,
      filter: filterQuery,
      sort: sortQuery,
    })
    const payload = {
      schema: queryCollection.schema,
      page: queryCollection.page.map(item => item.value),
    }
    await redis.set(CACHE_KEY, JSON.stringify(payload))
    return payload
  } else {
    return JSON.parse(CACHE_KEY)
  }
}

type getCollectionIdByCollectionNameResult = {
  queryCollectionId: string | null
  queryCollectionViewId: string | null
}

const getCollectionIdByCollectionName = async (
  name: string
): Promise<getCollectionIdByCollectionNameResult> => {
  const CACHE_KEY = `GET_COLLECTION_ID_BY_COLLECTION_NAME:${name}`
  const cache = await redis.get(CACHE_KEY)
  if (isNil(cache)) {
    const userContent = await client.LoadUserContent()
    const collection = find(userContent.collection, item => {
      const collectionName = get(item, ['value', 'name', 0, 0])
      return collectionName === name
    })
    const parentId = get(collection, ['value', 'parent_id'])
    const parentBlock = get(userContent.block, [parentId])
    const queryCollectionId = get(parentBlock, ['value', 'collection_id'], null)
    const queryCollectionViewId = get(
      parentBlock,
      ['value', 'view_ids', 0],
      null
    )
    const payload = {
      queryCollectionId,
      queryCollectionViewId,
    }
    await redis.set(CACHE_KEY, payload)
    return payload
  } else {
    return JSON.parse(cache)
  }
}

export type GetPostDetailByPostIdResponse = {
  meta: PageChunkMeta
  content: Block[]
  raw: LoadPageChunkResponse
}

const getPostDetailByPostId = async (
  id: string
): Promise<GetPostDetailByPostIdResponse> => {
  const CACHE_KEY = `GET_POST_DETAIL_BY_POST_ID:${id}`
  const cache = await redis.get(CACHE_KEY)
  if (isNil(cache)) {
    const pageChunk = await client.LoadPageChunk({
      pageId: id,
      chunkNumber: 0,
      limit: 10000,
      verticalColumns: false,
      cursor: { stack: [] },
    })
    const content = pageChunk.content
    const meta = pageChunk.meta
    const raw = pageChunk.raw
    const payload = {
      meta,
      content,
      raw,
    }
    await redis.set(CACHE_KEY, JSON.stringify(payload))
    return payload
  } else {
    return JSON.parse(cache)
  }
}

const getNotionUserList = async () => {
  const CACHE_KEY = `GET_NOTION_USER_LIST`
  const cache = await redis.get(CACHE_KEY)
  if (isNil(cache)) {
    const userContent = await client.LoadUserContent()
    const payload = userContent.notionUser
    await redis.set(CACHE_KEY, JSON.stringify(payload))
    return payload
  } else {
    return JSON.parse(cache)
  }
}

const convertLinkPropsToPostId = async (link: string) => {
  const CACHE_KEY = `CONVERT_LINK_PROPS_TO_POST_ID:${link}`
  const cache = await redis.get(CACHE_KEY)
  if (isNil(cache)) {
    const { schema, page } = await getPostList()
    const linkSchemaId = findKey(schema, item => {
      return item.name === 'Link'
    })
    if (!linkSchemaId) {
      throw new Error('could not find schema id')
    } else {
      const payload = get(
        find(page, item => {
          return link === get(item, ['properties', linkSchemaId, 0, 0])
        }),
        ['id']
      )
      await redis.set(CACHE_KEY, payload)
      return payload
    }
  } else {
    return cache
  }
}

const getSignedFileByUrls = async (url: string) => {
  const payload = {
    urls: [
      {
        url: url,
      },
    ],
  }
  const signedUrls = await client.GetSignedFileUrls(payload)
  return signedUrls
}

export default {
  getPostList,
  getCollectionIdByCollectionName,
  getPostDetailByPostId,
  getNotionUserList,
  convertLinkPropsToPostId,
  getSignedFileByUrls,
}

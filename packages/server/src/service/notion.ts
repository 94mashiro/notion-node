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

const { token, collectionId, collectionViewId, tagProperties } = notionConfig
const client = new NotionClient(token)

export type GetPostListData = {
  schema: CollectionSchema
  page: Block[]
}

const getPostList = async (): Promise<GetPostListData> => {
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

  return {
    schema: queryCollection.schema,
    page: queryCollection.page.map(item => item.value),
  }
}

type getCollectionIdByCollectionNameResult = {
  queryCollectionId: string | null
  queryCollectionViewId: string | null
}

const getCollectionIdByCollectionName = async (
  name: string
): Promise<getCollectionIdByCollectionNameResult> => {
  const userContent = await client.LoadUserContent()
  const collection = find(userContent.collection, item => {
    const collectionName = get(item, ['value', 'name', 0, 0])
    return collectionName === name
  })
  const parentId = get(collection, ['value', 'parent_id'])
  const parentBlock = get(userContent.block, [parentId])
  const queryCollectionId = get(parentBlock, ['value', 'collection_id'], null)
  const queryCollectionViewId = get(parentBlock, ['value', 'view_ids', 0], null)
  return {
    queryCollectionId,
    queryCollectionViewId,
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
  return {
    meta,
    content,
    raw,
  }
}

const getNotionUserList = async () => {
  const userContent = await client.LoadUserContent()
  return userContent.notionUser
}

const convertLinkPropsToPostId = async (link: string) => {
  const { schema, page } = await getPostList()
  const linkSchemaId = findKey(schema, item => {
    return item.name === 'Link'
  })
  if (!linkSchemaId) {
    return
  } else {
    return get(
      find(page, item => {
        return link === get(item, ['properties', linkSchemaId, 0, 0])
      }),
      ['id']
    )
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

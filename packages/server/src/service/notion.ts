import NotionClient from 'src/lib/notion/client'
import notionConfig from 'src/config/notion'
import { find, get } from 'lodash'
import {
  CollectionFilterQuery,
  CollectionSortQuery,
} from 'src/lib/notion/queryCollection'

const { token, collectionId, collectionViewId, tagProperties } = notionConfig
const client = new NotionClient(token)

const getPostList = async () => {
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
  const queryCollection = await client.QueryCollection({
    collectionID: collectionId,
    collectionViewID: collectionViewId,
    filter: filterQuery,
    sort: sortQuery,
  })
  return queryCollection.blocks
}

type getCollectionIdByCollectionNameResult = {
  queryCollectionId: string | null
  queryCollectionViewId: string | null
}

const getCollectionIdByCollectionName = async (
  name: string
): Promise<getCollectionIdByCollectionNameResult> => {
  const rawData = await client.LoadUserContent()
  const collection = find(rawData.recordMap.collection, item => {
    const collectionName = get(item, ['value', 'name', 0, 0])
    return collectionName === name
  })
  const parentId = get(collection, ['value', 'parent_id'])
  const parentBlock = get(rawData.recordMap.block, [parentId])
  const queryCollectionId = get(parentBlock, ['value', 'collection_id'], null)
  const queryCollectionViewId = get(parentBlock, ['value', 'view_ids', 0], null)
  return {
    queryCollectionId,
    queryCollectionViewId,
  }
}

export default { getPostList, getCollectionIdByCollectionName }

import { RecordMap } from './loadPageChunk'
import { BlockWithRole } from './getRecordValues'
import { find } from 'lodash'

export interface QueryCollectionRequest {
  collectionID: string
  collectionViewID: string
  search?: string
  type?: string
  aggregate?: AggregateQuery[]
  filter?: CollectionFilterQuery[]
  filterOperator?: string
  sort?: CollectionSortQuery[]
}

export type Loader = Partial<{
  type: string
  limit: number
  userTimeZone: string
  userLocale: string
}>

export type CollectionQuery = Partial<{
  aggregate: AggregateQuery[]
  group_by: string
  calendar_by: string
  filter_operator: string
  filter: CollectionFilterQuery[]
  sort: CollectionSortQuery[]
}>

export type AggregateQuery = {
  aggregation_type: string
  id: string
  property: string
  type: string
  view_type: string
}

export type CollectionFilterQuery = {
  comparator: string
  id?: string
  property: string
  type?: string
  value: string
}

export type CollectionSortQuery = {
  direction: string
  id?: string
  property: string
  type: string
}

export type QueryCollectionResponse = {
  recordMap: RecordMap
  result: QueryCollectionResult
}

export type QueryCollectionResult = {
  type: string
  blockIds: string[]
  aggregationResults: AggregateResult[]
  total: number
}

export type AggregateResult = {
  id: string
  value: number
}

class QueryCollection {
  collection: QueryCollectionResponse
  constructor(collection: QueryCollectionResponse) {
    this.collection = collection
  }

  get rawData() {
    return this.collection
  }

  get blocks(): BlockWithRole[] {
    return this.collection.result.blockIds.map(blockId => {
      return find(
        this.collection.recordMap.block,
        item => item.value.id === blockId
      )
    })
  }
}

export default QueryCollection

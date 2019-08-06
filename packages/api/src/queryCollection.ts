import { RecordMap } from './loadPageChunk'
import { find, isNil, head, map, get } from 'lodash'
import { parseProperties } from './helper'

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
  private _raw: QueryCollectionResponse
  constructor(raw: QueryCollectionResponse) {
    this._raw = raw
  }

  private get _queryCollectionBlock() {
    return head(map(this._raw.recordMap.collection))
  }

  private get _pageBlock() {
    return head(map(this._raw.recordMap.block))
  }

  get raw() {
    return this._raw
  }

  get page() {
    return this._raw.result.blockIds
      .map(blockId => {
        return find(
          this._raw.recordMap.block,
          item => item.value.id === blockId
        )
      })
      .filter(item => !isNil(item))
  }

  get schema() {
    return get(this._queryCollectionBlock, ['value', 'schema']) || {}
  }
}

export default QueryCollection

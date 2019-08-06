import {
  Permission,
  BlockWithRole,
  TableProperty,
  // Block,
} from './getRecordValues'
import { Table } from './page'
import { map, head, get, find } from 'lodash'

export type LoadPageChunkRequest = {
  pageId: string
  chunkNumber: number
  limit: number
  cursor: Cursor
  verticalColumns: boolean
}

export type LoadPageChunkResponse = {
  recordMap: RecordMap
  cursor: Cursor
}

export type Cursor = {
  stack: Stack[][]
}

export type Stack = {
  id: string
  index: number
  table: Table
}

export type RecordMapItem<T> = {
  [key: string]: T
}

export type RecordMap = {
  block: RecordMapItem<BlockWithRole>
  space: RecordMapItem<SpaceWithRole>
  notion_user: RecordMapItem<UserWithRole>
  collection: RecordMapItem<CollectionWithRole>
  collection_view: RecordMapItem<CollectionViewWithRole>
}

export type SpaceWithRole = {
  role?: string
  value?: Space
}

export type Space = {
  id: string
  version: number
  name: string
  beta_enabled: boolean
  permissions?: Permission[]
  pages?: string[]
}

export type CollectionViewWithRole = {
  role: string
  value: CollectionView
}

export type CollectionView = {
  id: string
  alive: boolean
  format: CollectionViewFormat
  name: string
  page_sort: string[]
  parent_id: string
  parent_table: string
  query: CollectionViewQuery
  type: string
  version: number
}

export type CollectionViewFormat = {
  table_properties: TableProperty[]
  table_wrap: boolean
}

export type CollectionViewQuery = {
  aggregate: AggregateQuery[]
}

export type AggregateQuery = {
  aggregation_type: string
  id: string
  property: string
  type: string
  view_type: string
}

export type CollectionWithRole = {
  role: string
  value: Collection
}

export type CollectionSchema = Record<string, CollectionColumnInfo>

export type Collection = {
  alive: boolean
  format: CollectionFormat
  id: string
  name: string[][]
  parent_id: string
  parent_table: string
  schema: CollectionSchema
  version: number
}

export type CollectionFormat = {
  collection_page_properties: CollectionPageProperty[]
}

export type CollectionPageProperty = {
  property: string
  visible: boolean
}

export type CollectionColumnInfo = {
  name: string
  options: CollectionColumnOption[]
  type: string
}

export type CollectionColumnOption = {
  color: string
  id: string
  value: string
}

export type UserWithRole = {
  role: string
  value: User
}

export type User = {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  mobile_onboarding_completed: boolean
  onboarding_completed: boolean
  profile_photo: string
  time_zone: string
  version: number
}

export type Date = {
  date_format: string
  reminder?: Reminder
  start_date: string
  start_time?: string
  end_Date?: string
  end_time?: string
  time_zone?: string
  time_format?: string
  type: string
}

export type Reminder = {
  time: string
  unit: string
  value: number
}

export type PageChunkMeta = Partial<{
  property: PageChunkProperty[]
  createdBy: User
  createdTime: number
  lastEditedBy: User
  lastEditedTime: number
}>

export type PageChunkProperty = {
  name: string
  type: string
  value: Array<string | Array<Array<string>>>
}

export class PageChunk {
  private _raw: LoadPageChunkResponse
  constructor(raw: LoadPageChunkResponse) {
    this._raw = raw
  }

  getUserById(id: string) {
    return get(this._raw.recordMap.notion_user, [id, 'value'])
  }

  private get _queryCollectionBlock() {
    return head(map(this._raw.recordMap.collection))
  }

  private get _pageBlock() {
    return head(map(this._raw.recordMap.block))
  }

  private _getBlockById(id: string) {
    const blocks = this._raw.recordMap.block
    const targetBlock = get(find(blocks, block => block.value.id === id), [
      'value',
    ])
    return targetBlock
  }

  get raw(): LoadPageChunkResponse {
    return this._raw
  }

  get property(): PageChunkProperty[] {
    const schemas = get(this._queryCollectionBlock, ['value', 'schema']) || {}
    const pageProperties = get(this._pageBlock, ['value', 'properties']) || {}
    return map(pageProperties, (value, key) => ({
      name: schemas[key].name,
      type: schemas[key].type,
      value: value,
    })) as any
    //TODO: fix it
  }

  get createdBy() {
    const createdBy = get(this._pageBlock, ['value', 'created_by'])
    if (!!createdBy) {
      return this.getUserById(createdBy)
    }
  }

  get createdTime() {
    return get(this._pageBlock, ['value', 'created_time'])
  }

  get lastEditedBy() {
    const lastEditedBy = get(this._pageBlock, ['value', 'last_edited_by'])
    if (!!lastEditedBy) {
      return this.getUserById(lastEditedBy)
    }
  }

  get lastEditedTime() {
    return get(this._pageBlock, ['value', 'last_edited_time'])
  }

  get content() {
    const contents = get(this._pageBlock, ['value', 'content'])
    return map(contents, id => {
      return this._getBlockById(id)
    })
  }

  get meta(): PageChunkMeta {
    return {
      property: this.property,
      createdBy: this.createdBy,
      createdTime: this.createdTime,
      lastEditedBy: this.lastEditedBy,
      lastEditedTime: this.lastEditedTime,
    }
  }
}

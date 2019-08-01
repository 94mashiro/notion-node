import { Permission, BlockWithRole, TableProperty } from './getRecordValues'
import { Table } from './page'

export type LoadPageChunkRequest = {
  pageId: string
  chunkNumber: string
  limit: number
  cursor: Cursor
  verticalColumns: boolean
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

export type Collection = {
  alive: boolean
  format: CollectionFormat
  id: string
  name: string[][]
  parent_id: string
  parent_table: string
  schema: {
    [key: string]: CollectionColumnInfo
  }
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

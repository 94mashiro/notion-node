export type NotionSchemaType =
  | 'checkbox'
  | 'title'
  | 'created_time'
  | 'last_edited_time'
  | 'multi_select'
  | 'url'
  | 'text'
  | 'rollup'
  | 'relation'

export type NotionBlockType =
  | 'page'
  | 'text'
  | 'header'
  | 'sub_header'
  | 'sub_sub_header'
  | 'divider'
  | 'break'
  | 'numbered_list'
  | 'bulleted_list'
  | 'collection_view_page'

export type NotionObject = {
  id: string
  type:
    | 'page'
    | 'text'
    | 'header'
    | 'sub_header'
    | 'sub_sub_header'
    | 'divider'
    | 'break'
    | 'numbered_list'
    | 'bulleted_list'
  properties: {
    title: Array<Array<String>>
  }
  format: {
    page_icon: string
    page_cover: string
    page_cover_position: number
    block_color: string
  }
}

export type NotionResponse = {
  recordMap: {
    block: {
      [id: string]: {
        value: NotionObject
      }
    }
  }
}

export type NotionRecordMapItem<T> = {
  [id: string]: {
    role: string
    value: T
  }
}

export type NotionUserContent = {
  recordMap: NotionRecordMap
}

export type NotionPageChunk = {
  recordMap: NotionRecordMap
}

export type NotionRecordMap = {
  block: NotionRecordMapItem<NotionBlock>
  collection: NotionRecordMapItem<NotionCollection>
  notion_user: NotionRecordMapItem<NotionUser>
  space: NotionRecordMapItem<NotionSpace>
  space_view: NotionRecordMapItem<NotionSpaceView>
  user_root: NotionRecordMapItem<NotionUserRoot>
  user_settings: NotionRecordMapItem<NotionUserSettings>
}

export type NotionBlock = {
  alive: boolean
  content: string[]
  collection_id?: string
  copied_from?: string
  created_by: string
  created_time: number
  format: {
    block_color: string
    page_cover: string
    page_cover_position: number
    page_full_width: number
    page_icon: string
  }
  id: string
  last_edited_by: string
  last_edited_time: number
  parent_id: string
  parent_table: string
  permissions: {
    role: string
    type: string
    group_id?: string
  }[]
  properties: {
    title: [[string]]
  }
  type: NotionBlockType
  version: number
  view_ids?: string[]
}

export type NotionCollection = {
  alive: boolean
  copied_from?: string
  cover?: string
  description?: [[string]]
  format?: {
    collection_cover_position?: number
    collection_page_properties?: {
      visible: boolean
      property: string
    }[]
  }
  icon?: string
  id: string
  name: [[string]]
  parent_id: string
  parent_table: string
  schema?: {
    [id: string]: {
      name: string
      type: NotionSchemaType
      options?: {
        id: string
        color: string
        value: string
      }[]
      aggregation?: string
      relation_property?: string
      target_property?: string
      target_property_type?: string
      collection_id?: string
    }
  }
  version: number
}

export type NotionUser = {
  clipper_onboarding_completed: boolean
  email: string
  family_name: string
  given_name: string
  id: string
  mobile_onboarding_completed: string
  onboarding_completed: string
  profile_photo: string
  version: number
}

export type NotionSpace = {
  beta_enabled: boolean
  created_by: string
  created_time: number
  domain: string
  icon?: string
  id: string
  last_edited_by: string
  last_edited_time: string
  name: string
  pages: string[]
  permissions: {
    role: string
    type: string
    user_id: string
  }[]
  version: number
}

export type NotionSpaceView = {
  alive: boolean
  created_getting_started: boolean
  id: string
  notify_desktop: boolean
  notify_email: boolean
  notify_mobile: boolean
  parent_id: string
  parent_table: string
  space_id: string
  version: number
}

export type NotionUserRoot = {
  id: string
  space_views: string[]
}

export type NotionUserSettings = {
  id: string
  settings: {
    locale: string
    persona: string
    start_day_of_week: number
    time_zone: string
    type: string
    used_desktop_web_app: boolean
    used_ios_app: boolean
    used_mac_app: boolean
  }
  version: number
}

export type NotionQueryCollection = {
  result: NotionQueryCollectionResult
  recordMap: NotionRecordMap
}

export type NotionQueryCollectionResult = {
  aggregationResults: {
    id: string
    value: any
  }[]
  blockIds: string[]
  total: number
  type: string
}

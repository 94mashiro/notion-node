import { CollectionView, Collection } from './loadPageChunk'
import { InlineBlock } from './inlineBlock'

export type GetRecordValuesRequest = {
  requests: GetRecordValuesRequestInner[]
}

export type GetRecordValuesRequestInner = {
  table: string
  id: string
}

export type GetRecordValuesResponse = {
  results: BlockWithRole[]
}

export type BlockWithRole = {
  role: string
  value: Block
}

export type BlockPageType = number

export type BlockPropertyType = Array<string | string[][]>

export type BlockProperties = Record<string, BlockPropertyType[]>

export type Block = {
  id: string
  alive: boolean
  content?: string[]
  copied_from?: string
  collection_id?: string
  created_by: string
  created_time: number
  discussion?: string[]
  file_ids?: string[]
  format?: number[]
  ignore_block_count?: boolean
  last_edited_by: string
  last_edited_time: number
  parent_id: string
  parent_table: string
  permissions?: Permission[]
  properties?: BlockProperties
  type: string
  version: number
  view_ids?: string[]
  content_resolved?: Block[]
  inline_content?: InlineBlock[]
  title?: string
  is_checked?: boolean
  description?: string
  link?: string
  source?: string
  file_size?: string
  image_url?: string
  code?: string
  code_language?: string
  collection_views?: CollectionViewInfo[]
  format_page?: FormatPage
  format_bookmark?: FormatBookmark
  format_image?: FormatImage
  format_column?: FormatColumn
  format_text?: FormatText
  format_table?: FormatTable
  format_video?: FormatVideo
  format_embed?: FormatEmbed
}

export type CollectionViewInfo = {
  collection_view: CollectionView
  collection: Collection
  collection_rows: Block[]
}

export type FormatPage = {
  page_cover: string
  page_cover_position: number
  page_font: string
  page_full_width: boolean
  page_icon: string
  page_small_text: boolean
  page_cover_url?: string
}

export type FormatBookmark = {
  bookmark_icon: string
}

export type FormatImage = {
  block_aspect_ratio: number
  block_full_width: boolean
  block_page_width: boolean
  block_preserve_scale: boolean
  block_width: number
  display_source?: string
}

export type FormatVideo = {
  block_width: number
  block_height: number
  display_source: string
  block_full_width: boolean
  block_page_width: boolean
  block_aspect_ratio: number
  block_preserve_scale: boolean
}

export type FormatText = {
  block_color?: string
}

export type FormatTable = {
  table_wrap: boolean
  table_properties: TableProperty[]
}

export type TableProperty = {
  width: number
  visible: boolean
  property: string
}

export type FormatColumn = {
  column_ratio: number
}

export type FormatEmbed = {
  block_full_width: boolean
  block_height: number
  block_page_width: boolean
  block_preserve_scale: boolean
  display_source: string
}

export type Permission = {
  role: string
  type: string
  user_id?: string
}

import { RecordMap } from './loadPageChunk'

export type GetUserContentResponse = {
  recordMap: RecordMap
}

export class UserContent {
  private _raw: GetUserContentResponse
  constructor(raw: GetUserContentResponse) {
    this._raw = raw
  }

  get notionUser() {
    return this._raw.recordMap.notion_user
  }

  get raw() {
    return this._raw
  }

  get collection() {
    return this._raw.recordMap.collection
  }

  get block() {
    return this._raw.recordMap.block
  }
}

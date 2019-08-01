export type AttrFlag = number

export type InlineBlock = {
  Text: string
  AttrFlags?: AttrFlag
  Link?: string
  UserID?: string
  CommentID?: string
  Date?: Date
  Highlight?: string
}

import { BlockProperties } from './getRecordValues'
import { CollectionSchema } from './loadPageChunk'
import { mapValues } from 'lodash'

export type ParsedPropertyRecord = {
  [id: string]: {
    name: string
    type: string
    value: any
  }
}

export const parseProperties = (
  rawProperties: BlockProperties,
  schemas: CollectionSchema
): ParsedPropertyRecord => {
  return mapValues(rawProperties, (value, key) => ({
    name: schemas[key].name,
    type: schemas[key].type,
    value: value,
  }))
}

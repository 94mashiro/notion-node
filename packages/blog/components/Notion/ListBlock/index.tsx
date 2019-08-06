import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import { get, find, isNil } from 'lodash'
import NotionNumberedList from '../NumberedList'
import NotionBulletedList from '../BulletedList'
import { PostBlocksContext } from '../../../pages/post/[pid]'

type IComponentProps = {
  blocks: (Block | string)[]
}

class NotionListBlock extends React.PureComponent<IComponentProps> {
  convertBlocks = (blocks: (Block | string)[], contents: Block[]) =>
    blocks
      .map(block => {
        if (typeof block === 'string') {
          const targetBlock = find(contents, content => content.id === block)
          console.log(contents, block, targetBlock)
          return targetBlock
        } else {
          return block
        }
      })
      .filter(block => !isNil(block))
  render() {
    return (
      <PostBlocksContext.Consumer>
        {fullBlocks => {
          const convertedBlocks = this.convertBlocks(
            this.props.blocks,
            fullBlocks
          )
          const listBlockType = get(convertedBlocks, [0, 'type'])
          if (listBlockType === 'numbered_list') {
            return <NotionNumberedList blocks={convertedBlocks} />
          } else if (listBlockType === 'bulleted_list') {
            return <NotionBulletedList blocks={convertedBlocks} />
          } else {
            return null
          }
        }}
      </PostBlocksContext.Consumer>
    )
  }
}

export default NotionListBlock

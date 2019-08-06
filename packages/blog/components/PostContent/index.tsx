import * as React from 'react'
import { Block } from '../../../api/src/getRecordValues'
import styles from './index.scss'
import NotionBlock from '../Notion/Block'
import NotionListBlock from '../Notion/ListBlock'
import classNames from 'classnames/bind'
import { isNil, get } from 'lodash'

type IComponentProps = {
  content: Block[]
}

class PostContent extends React.PureComponent<IComponentProps> {
  static defaultProps = {
    content: [],
  }
  convertContentBlocks = (blocks: Block[]) => {
    const LIST_TYPE = ['numbered_list', 'bulleted_list']
    let listArray: Block[] = []
    const isListBlock = (block?: Block) => {
      if (isNil(block)) {
        return false
      }
      return LIST_TYPE.includes(block.type)
    }
    const isSameTypeBlocks = (block: Block, block2?: Block) => {
      if (isNil(block2)) {
        return false
      }
      return get(block, ['type']) === get(block2, ['type'])
    }
    return blocks
      .map((block, index, blocks) => {
        const isCurrentListBlock = isListBlock(block)
        const prevBlock = get(blocks, [index - 1])
        const nextBlock = get(blocks, [index + 1])
        const isCurrentFirstListBlock =
          isCurrentListBlock && !isSameTypeBlocks(block, prevBlock)
        const isCurrentLastListBlock =
          isCurrentListBlock && !isSameTypeBlocks(block, nextBlock)
        if (!isCurrentListBlock) {
          return block
        } else {
          if (isCurrentFirstListBlock) {
            listArray = []
            listArray.push(block)
          } else if (isCurrentLastListBlock) {
            listArray.push(block)
            return listArray
          } else {
            listArray.push(block)
          }
        }
      })
      .filter(block => !isNil(block))
  }
  render() {
    const cx = classNames.bind(styles)
    const convertedBlocks = this.convertContentBlocks(this.props.content)
    return (
      <div className={cx('post-content-wrapper')}>
        {convertedBlocks.map((block, index) => {
          if (Array.isArray(block)) {
            return <NotionListBlock key={index} blocks={block} />
          } else {
            return <NotionBlock key={index} block={block} />
          }
        })}
      </div>
    )
  }
}

export default PostContent

import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import NotionPlainText from '../PlainText'
import NotionHeadingText from '../HeadingText'
import NotionImage from '../Image'
import NotionCode from '../Code'
import NotionGist from '../Gist'
import NotionQuote from '../Quote'

type IComponentProps = {
  block: Block
}

class NotionBlock extends React.PureComponent<IComponentProps> {
  render() {
    const { block } = this.props
    if (block.type === 'text') {
      return <NotionPlainText block={block} />
    }
    if (['header', 'sub_header', 'sub_sub_header'].includes(block.type)) {
      return <NotionHeadingText block={block} />
    }
    if (block.type === 'image') {
      return <NotionImage block={block} />
    }
    if (block.type === 'code') {
      return <NotionCode block={block} />
    }
    if (block.type === 'gist') {
      return <NotionGist block={block} />
    }
    if (block.type === 'quote') {
      return <NotionQuote block={block} />
    }
    if (block.type === 'divider') {
      return <hr />
    }
    return null
  }
}

export default NotionBlock

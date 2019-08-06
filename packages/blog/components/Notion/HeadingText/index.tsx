import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import NotionStyleText from '../StyleText'

type IComponentProps = {
  block: Block
}

class NotionHeadingText extends React.PureComponent<IComponentProps> {
  HeadingText = () => {
    const { block } = this.props
    if (block.type === 'header') {
      return (
        <h1>
          <NotionStyleText block={block} />
        </h1>
      )
    } else if (block.type === 'sub_header') {
      return (
        <h2>
          <NotionStyleText block={block} />
        </h2>
      )
    } else {
      return (
        <h3>
          <NotionStyleText block={block} />
        </h3>
      )
    }
  }
  render() {
    return <this.HeadingText />
  }
}

export default NotionHeadingText

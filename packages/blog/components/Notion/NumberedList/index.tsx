import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import NotionStyleText from '../StyleText'
import NotionListBlock from '../ListBlock'

type IComponentProps = {
  blocks: Block[]
}

class NotionNumberedList extends React.PureComponent<IComponentProps> {
  render() {
    return (
      <ol>
        {this.props.blocks.map(block => (
          <li key={block.id}>
            <NotionStyleText block={block} />
            {Array.isArray(block.content) && (
              <NotionListBlock blocks={block.content} />
            )}
          </li>
        ))}
      </ol>
    )
  }
}

export default NotionNumberedList

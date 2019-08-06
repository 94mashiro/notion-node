import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import NotionStyleText from '../StyleText'

type IComponentProps = {
  block: Block
}

class NotionPlainText extends React.PureComponent<IComponentProps> {
  render() {
    return (
      <p>
        <NotionStyleText block={this.props.block} />
      </p>
    )
  }
}

export default NotionPlainText

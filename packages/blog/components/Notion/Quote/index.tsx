import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import styles from './index.scss'
import classNames from 'classnames/bind'
import NotionStyleText from '../StyleText'

type IComponentProps = {
  block: Block
}

class NotionQuote extends React.PureComponent<IComponentProps> {
  render() {
    const cx = classNames.bind(styles)
    return (
      <blockquote className={cx('notion-quote')}>
        <NotionStyleText block={this.props.block} />
      </blockquote>
    )
  }
}

export default NotionQuote

import * as React from 'react'
import styles from './index.scss'
import classNames from 'classnames/bind'
import { Block } from '../../../../api/src/getRecordValues'
import { get } from 'lodash'
import { NotionColor } from '../../../utils/color'

type IComponentProps = {
  block: Block
}

class NotionCallout extends React.PureComponent<IComponentProps> {
  render() {
    const cx = classNames.bind(styles)
    const pageIcon = get(this.props.block, ['format', 'page_icon'])
    const blockColor = get(
      this.props.block,
      ['format', 'block_color'],
      ''
    ) as string
    const isBackgroundStyle = blockColor.indexOf('background') > -1
    const content = get(this.props.block, ['properties', 'title', 0, 0])
    const style: React.CSSProperties = {
      backgroundColor: isBackgroundStyle ? NotionColor[blockColor] : undefined,
      color: !isBackgroundStyle ? NotionColor[blockColor] : undefined,
    }
    return (
      <div
        className={cx('notion-callout', {
          'no-border': isBackgroundStyle,
        })}
        style={style}
      >
        <div className={cx('icon')}>{pageIcon}</div>
        <div className={cx('content')}>{content}</div>
      </div>
    )
  }
}

export default NotionCallout

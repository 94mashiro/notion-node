import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import styles from './index.scss'
import classNames from 'classnames/bind'
import { get } from 'lodash'

type IComponentProps = {
  blocks: Block[]
}

class NotionTodoList extends React.PureComponent<IComponentProps> {
  render() {
    const cx = classNames.bind(styles)
    return (
      <ul className={cx('notion-todo-list')}>
        {this.props.blocks.map(block => {
          const label = get(block, ['properties', 'title', 0, 0])
          const checked = get(block, ['properties', 'checked', 0, 0])
          return (
            <li className={cx('todo-list-item')} key={block.id}>
              <input
                className={cx('task-list-item-checkbox')}
                type="checkbox"
                disabled
                checked={!!checked}
              />
              {`  ${label}`}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default NotionTodoList

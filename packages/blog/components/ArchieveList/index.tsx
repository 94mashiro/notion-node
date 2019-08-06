import * as React from 'react'
import { ArticleMeta } from 'pages'
import ArchieveItem from '../ArchieveItem'
import styles from './index.scss'
import classNames from 'classnames/bind'

type Props = {
  list: ArticleMeta[]
}

class ArchieveList extends React.PureComponent<Props> {
  render() {
    const cx = classNames.bind(styles)
    return (
      <div className={cx('archieve-list')}>
        {this.props.list.map(item => (
          <ArchieveItem key={item.id} meta={item} />
        ))}
      </div>
    )
  }
}

export default ArchieveList

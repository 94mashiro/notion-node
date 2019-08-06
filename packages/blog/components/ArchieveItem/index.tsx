import * as React from 'react'
import { ArticleMeta } from '../../pages/index'
import { get, find } from 'lodash'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from './index.scss'
import dayjs from 'dayjs'

type Props = {
  meta: ArticleMeta
}

class ArchieveItem extends React.PureComponent<Props> {
  render() {
    const cx = classNames.bind(styles)
    const { properties, id, createdTime } = this.props.meta
    const title = get(find(properties, p => p.type === 'title'), [
      'value',
      0,
      0,
    ])
    const slogan = get(find(properties, p => p.name === 'Slogan'), [
      'value',
      0,
      0,
    ])
    const tag = (get(
      find(properties, p => p.name === 'Tags'),
      ['value', 0, 0],
      ''
    ) as string)
      .split(',')
      .filter(tag => tag.length > 0)
      .map(tag => `#${tag}`)
      .join('，')
    const link =
      get(find(properties, p => p.name === 'Link'), ['value', 0, 0]) || id
    const createdTimeFormatString = dayjs(createdTime).format('YYYY-MM-DD')
    return (
      <Link href="/post/[pid]" as={`/post/${link}`} prefetch={false}>
        <a className={cx('archieve-item')}>
          <article className={cx('item-wrapper')}>
            <div className={cx('item-wrapper-inner')}>
              <header>
                <h3>{title}</h3>
                <small className={cx('item-meta')}>
                  <span>{tag || '#empty'}</span>
                  <span>{`${createdTimeFormatString}`}</span>
                </small>
              </header>
              <p>{slogan}</p>
            </div>
          </article>
        </a>
      </Link>
    )
  }
}

export default ArchieveItem

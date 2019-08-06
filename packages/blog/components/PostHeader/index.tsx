import * as React from 'react'
import { PageChunkMeta } from '../../../api/src/loadPageChunk'
import styles from './index.scss'
import classNames from 'classnames/bind'
import { get, find } from 'lodash'
import { getSignedFileUrls } from '../../service/api'
import dayjs from 'dayjs'

type IComponentProps = {
  meta: PageChunkMeta
}

type IComponentState = {
  coverUrl?: string
}

class PostHeader extends React.PureComponent<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { meta } = this.props
    const postMetaProperties = get(meta, ['property'])
    const coverProperty = find(
      postMetaProperties,
      property => property.name === 'Cover'
    )
    const coverUrls = get(coverProperty, ['value', 0, 1, 0, 1])
    const { data } = await getSignedFileUrls(coverUrls)
    const signedFileUrl = get(data, ['signedUrls', 0])
    this.setState({
      coverUrl: signedFileUrl,
    })
  }

  render() {
    const cx = classNames.bind(styles)
    const postProperties = get(this.props.meta, ['property'])
    const postCreatedTime = get(this.props.meta, ['createdTime'])
    const postTitle = get(
      find(postProperties, property => property.type === 'title'),
      ['value', 0, 0]
    )
    const postTags = (get(
      find(postProperties, property => property.name === 'Tags'),
      ['value', 0, 0]
    ) as string)
      .split(',')
      .join(', ')
    return (
      <div
        className={cx('post-header-wrapper')}
        style={{ backgroundImage: `url(${this.state.coverUrl})` }}
      >
        <div className={cx('post-title')}>
          {postTitle}
          <div className={cx('post-meta')}>
            <i className="material-icons">access_time</i>
            <time dateTime={new Date(postCreatedTime).toISOString()}>
              {dayjs(postCreatedTime).format('YYYY-MM-DD HH:mm')}
            </time>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className="material-icons">label</i>
            <span>{postTags}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PostHeader

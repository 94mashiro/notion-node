import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import { get } from 'lodash'
import { getSignedFileUrls } from '../../../service/api'
import styles from './index.scss'
import classNames from 'classnames/bind'

type IComponentState = {
  loading: boolean
  src?: string
  caption?: string
}

type IComponentProps = {
  block: Block
}

class NotionImage extends React.PureComponent<
  IComponentProps,
  IComponentState
> {
  constructor(props: IComponentProps) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  async componentDidMount() {
    const imageRawLink = get(this.props.block, [
      'properties',
      'source',
      0,
      0,
    ]) as string
    const imageCaption = get(this.props.block, [
      'properties',
      'caption',
      0,
      0,
    ]) as string
    const { data } = await getSignedFileUrls(imageRawLink)
    this.setState({
      caption: imageCaption,
      src: data.signedUrls[0],
      loading: false,
    })
  }

  render() {
    const cx = classNames.bind(styles)
    return (
      !this.state.loading && (
        <div className={cx('notion-image')}>
          <img src={this.state.src} alt={this.state.caption} />
        </div>
      )
    )
  }
}

export default NotionImage

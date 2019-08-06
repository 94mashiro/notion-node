import * as React from 'react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { getPostById } from '../../service/api'
import { get, map } from 'lodash'
import Layout from '../../components/Layout'
import styles from './index.scss'
import classNames from 'classnames/bind'
import PostHeader from '../../components/PostHeader'
import { GetPostDetailByPostIdResponse } from '../../../server/src/service/notion'
import PostContent from '../../components/PostContent'
import { Block } from '../../../api/src/getRecordValues'
import PostComment from '../../components/PostComment'

type IPageProps = WithRouterProps & {
  data: GetPostDetailByPostIdResponse
}

export const PostBlocksContext = React.createContext<Block[]>([])

class PostDetailPage extends React.PureComponent<IPageProps> {
  static async getInitialProps(ctx) {
    const pid = get(ctx, ['query', 'pid'])
    const { data } = await getPostById(pid)
    return {
      data,
    }
  }

  render() {
    const cx = classNames.bind(styles)
    const { meta, content, raw } = this.props.data
    const completeBlocks = map(raw.recordMap.block, item => item.value)
    return (
      <PostBlocksContext.Provider value={completeBlocks}>
        <Layout>
          <article>
            <header className={cx('post-header')}>
              <PostHeader meta={meta} />
            </header>
            <div className={cx('post-main')}>
              <PostContent content={content} />
            </div>
            <footer className={cx('post-footer')}>
              <PostComment />
            </footer>
          </article>
        </Layout>
      </PostBlocksContext.Provider>
    )
  }
}

export default withRouter(PostDetailPage)

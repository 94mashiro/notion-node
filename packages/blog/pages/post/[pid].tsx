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
import isBot from 'isbot'

type IPageProps = WithRouterProps & {
  data: GetPostDetailByPostIdResponse
  ssr: boolean
  pid: string
}

type IPageState = {
  data?: GetPostDetailByPostIdResponse
}

export const PostBlocksContext = React.createContext<Block[]>([])

class PostDetailPage extends React.PureComponent<IPageProps, IPageState> {
  static async getInitialProps(ctx) {
    const pid = get(ctx, ['query', 'pid'])
    const ua = get(ctx, ['req', 'headers', 'user-agent'])
    const ssr = isBot(ua)
    if (ssr) {
      const { data } = await getPostById(pid)
      return {
        data,
        ssr,
      }
    } else {
      return {
        ssr,
        pid,
      }
    }
  }

  constructor(props: IPageProps) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { ssr, pid } = this.props
    if (!ssr) {
      const { data } = await getPostById(pid)
      this.setState({
        data,
      })
    }
  }

  render() {
    const cx = classNames.bind(styles)
    const { ssr } = this.props
    // const { meta, content, raw } = ssr ? this.props.data : this.state.data || {}
    const data = ssr ? this.props.data : this.state.data
    const meta = get(data, ['meta'])
    const content = get(data, ['content'])
    const raw = get(data, ['raw'])
    const completeBlocks = map(
      get(raw, ['recordMap', 'block']),
      item => item.value
    )
    const loading = !ssr && !this.state.data
    return (
      <PostBlocksContext.Provider value={completeBlocks}>
        <Layout>
          {!loading && (
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
          )}
        </Layout>
      </PostBlocksContext.Provider>
    )
  }
}

export default withRouter(PostDetailPage)

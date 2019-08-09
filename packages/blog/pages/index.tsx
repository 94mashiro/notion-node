import * as React from 'react'
import { getBlogArticles, getNotionUsers } from '../service/api'
import { get, mapValues } from 'lodash'
import { Block } from '../../api/src/getRecordValues'
import {
  CollectionSchema,
  UserWithRole,
  CollectionColumnOption,
  User,
} from '../../api/src/loadPageChunk'
import ArchieveList from '../components/ArchieveList'
import Layout from '../components/Layout'
import isBot from 'isbot'

type IPageProps = {
  data?: any
  ssr: boolean
}

type IPageState = {
  data?: any
}

export type MixedBlockProperty = {
  name: string
  options: CollectionColumnOption[]
  type: string
  //TODO: fix it
  value: any
}

export type ArticleMeta = Partial<{
  id: string
  properties: Record<string, MixedBlockProperty>
  createdBy: User
  createdTime: number
  lastEditedBy: User
  lastEditedTime: number
}>

const parseArticleList = (
  page: Block[],
  schema: CollectionSchema,
  users: Record<string, UserWithRole>
): ArticleMeta[] => {
  return page.map(item => {
    const properties = mapValues(
      get(item, ['properties']) || {},
      (item, key) => ({
        value: item,
        ...schema[key],
      })
    )
    const createdById = get(item, ['created_by'])
    const lastEditedById = get(item, ['last_edited_by'])
    const createdBy = get(users, [createdById, 'value'])
    const lastEditedBy = get(users, [lastEditedById, 'value'])
    const createdTime = get(item, ['created_time'])
    const lastEditedTime = get(item, ['last_edited_time'])
    const id = get(item, ['id'])
    return {
      id,
      properties,
      createdBy,
      createdTime,
      lastEditedBy,
      lastEditedTime,
    }
  })
}

class Page extends React.PureComponent<IPageProps, IPageState> {
  static async getInitialProps({ req }) {
    const ua = get(req, ['headers', 'user-agent'])
    const ssr = isBot(ua)
    try {
      if (ssr) {
        const postsRes = await getBlogArticles()
        const usersRes = await getNotionUsers()
        const page = get(postsRes, ['data', 'page']) || []
        const schema = get(postsRes, ['data', 'schema']) || {}
        const users = get(usersRes, ['data']) || {}
        const data = parseArticleList(page, schema, users)
        return {
          data,
          ssr,
        }
      } else {
        return {
          ssr,
        }
      }
    } catch (err) {
      return {
        data: {},
        schema: {},
      }
    }
  }
  constructor(props: IPageProps) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    if (!this.props.ssr) {
      const postsRes = await getBlogArticles()
      const usersRes = await getNotionUsers()
      const page = get(postsRes, ['data', 'page']) || []
      const schema = get(postsRes, ['data', 'schema']) || {}
      const users = get(usersRes, ['data']) || {}
      const data = parseArticleList(page, schema, users)
      this.setState({
        data,
      })
    }
  }
  static defaultProps = {
    data: {},
  }
  render() {
    const { data, ssr } = this.props
    return ssr ? (
      <Layout>
        <ArchieveList list={data} />
      </Layout>
    ) : (
      <Layout>
        {this.state.data && <ArchieveList list={this.state.data} />}
      </Layout>
    )
  }
}

export default Page

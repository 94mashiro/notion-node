import * as React from 'react'
import { NextPage } from 'next'
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

type IPageProps = {
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

const Page: NextPage<IPageProps> = ({ data }) => (
  <Layout>
    <ArchieveList list={data} />
  </Layout>
)

Page.defaultProps = {
  data: [],
}

Page.getInitialProps = async () => {
  try {
    const postsRes = await getBlogArticles()
    const usersRes = await getNotionUsers()
    const page = get(postsRes, ['data', 'page']) || []
    const schema = get(postsRes, ['data', 'schema']) || {}
    const users = get(usersRes, ['data']) || {}
    const data = parseArticleList(page, schema, users)
    return {
      data,
    }
  } catch (err) {
    return {
      data: {},
      schema: {},
    }
  }
}

export default Page

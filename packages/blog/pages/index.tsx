import * as React from 'react'
import { NextPage } from 'next'
import { getBlogArticles } from '../service/api'

type IPageProps = {
  data: any
}

const Page: NextPage<IPageProps> = ({ data }) => (
  <main>{JSON.stringify(data)}</main>
)

Page.getInitialProps = async () => {
  const data = await getBlogArticles()
  return { data }
}

export default Page

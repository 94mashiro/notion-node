import { get, post } from './http'
import { GetPostListData } from '../../server/src/service/notion'
import { UserWithRole } from '../../api/src/loadPageChunk'
import { GetSignedFileUrlsResponse } from '../../api/src/getSignedFileUrls'

export const getBlogArticles = async () => {
  const res = await get<GetPostListData>('/api/post')
  return res
}

export const getNotionUsers = async () => {
  const res = await get<Record<string, UserWithRole>>('/api/user')
  return res
}

export const getPostById = async (id: string) => {
  const res = await get(`/api/post/${id}`)
  return res
}

export const getSignedFileUrls = async (url: string) => {
  const res = await post<GetSignedFileUrlsResponse>(`/api/file`, {
    url: url,
  })
  return res
}

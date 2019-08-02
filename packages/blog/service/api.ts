import { get } from './http'

export const getBlogArticles = async () => {
  const res = await get('/blog')
  return res
}

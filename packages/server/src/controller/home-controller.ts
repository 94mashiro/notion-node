import NotionServices from '../service/notion'

export default class NotionController {
  static async getPostList(ctx) {
    const data = await NotionServices.getPostList()
    ctx.body = {
      code: 200,
      msg: 'OK',
      data,
    }
  }

  static async getCollectionByName(ctx) {
    const { name } = ctx.params
    const data = await NotionServices.getCollectionIdByCollectionName(name)
    ctx.body = {
      code: 200,
      msg: 'OK',
      data,
    }
  }

  static async getPageById(ctx) {
    const id = ctx.params.id
    const data = await NotionServices.getPostDetailByPostId(id)
    ctx.body = {
      code: 200,
      msg: 'OK',
      data,
    }
  }
}

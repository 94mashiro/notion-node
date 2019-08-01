import NotionServices from '../service/notion'

export default class NotionController {
  static async getPostList(ctx) {
    ctx.body = await NotionServices.getPostList()
  }

  static async getCollectionByName(ctx) {
    const { name } = ctx.params
    console.log(name)
    ctx.body = await NotionServices.getCollectionIdByCollectionName(name)
  }

  static async getPageById(ctx) {
    const id = ctx.params.id
    ctx.body = await NotionServices.getPostDetailByPostId(id)
  }
}

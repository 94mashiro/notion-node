import NotionServices from '../service/notion'
import * as isUUID from 'validator/lib/isUUID'
import { isNil, get } from 'lodash'

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
    let id = ctx.params.id
    if (!isUUID(id)) {
      id = await NotionServices.convertLinkPropsToPostId(id)
    }
    if (isNil(id)) {
      ctx.body = {
        code: 404,
        msg: 'NOT FOUND',
      }
      return
    }
    const data = await NotionServices.getPostDetailByPostId(id)
    ctx.body = {
      code: 200,
      msg: 'OK',
      data,
    }
  }

  static async getNotionUsers(ctx) {
    try {
      const data = await NotionServices.getNotionUserList()
      ctx.body = {
        code: 200,
        msg: 'OK',
        data,
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: err.message,
      }
    }
  }

  static async getSignedFileByUrls(ctx) {
    try {
      const url = get(ctx, ['request', 'body', 'url'])
      const data = await NotionServices.getSignedFileByUrls(url)
      ctx.body = {
        code: 200,
        msg: 'OK',
        data,
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: err.message,
      }
    }
  }
}

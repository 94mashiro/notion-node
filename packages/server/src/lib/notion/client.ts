import fetch from 'node-fetch'
import QueryCollection, {
  QueryCollectionResponse,
  QueryCollectionRequest,
} from './queryCollection'
import { GetUserContentResponse } from './getUserContent'
import { merge } from 'lodash'

const BASE_URL = 'https://www.notion.so/api/v3'

class NotionClient {
  authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  private _post = <T>(url: string, data?: object): Promise<T> => {
    return fetch(`${BASE_URL}${url}`, {
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        cookie: `token_v2=${this.authToken}`,
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3483.0 Safari/537.36',
      },
      method: 'POST',
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }
  QueryCollection = async (
    payload: QueryCollectionRequest
  ): Promise<QueryCollection> => {
    const {
      collectionID,
      collectionViewID,
      search,
      type,
      aggregate,
      filter,
      filterOperator,
      sort,
    } = payload
    const userPayload = {
      collectionId: collectionID,
      collectionViewId: collectionViewID,
      loader: {
        query: search,
        type,
      },
      query: {
        aggregate,
        filter,
        filterOperator,
        sort,
      },
    }
    const defaultPayload = {
      query: {
        aggregate: [],
        filter: [],
        filterOperator: 'and',
        sort: [],
      },
      loader: {
        limit: 10000,
        loadContentCover: true,
        query: '',
        type: 'table',
        userLocale: 'zh-cn',
        userTimeZone: 'Asia/Shanghai',
      },
    }
    const data = merge(defaultPayload, userPayload)
    const res = await this._post<QueryCollectionResponse>(
      '/queryCollection',
      data
    )
    return new QueryCollection(res)
  }

  LoadUserContent = async (): Promise<GetUserContentResponse> => {
    const res = await this._post<GetUserContentResponse>('/loadUserContent', {})
    return res
  }
}

export default NotionClient

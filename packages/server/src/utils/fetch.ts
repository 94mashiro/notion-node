import { NotionResponse } from 'src/types/notion'
import fetch from 'node-fetch'
import * as https from 'https'

interface NotionRequestParams {
  endpoint: string
  token: string
  body?: object
}

const BASE_URL = 'https://www.notion.so/api/v3'

const request = ({ endpoint, token, body }: NotionRequestParams) => {
  return fetch(`${BASE_URL}/${endpoint}`, {
    agent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
      Accept: '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      Cookie: `token_v2=${token};`,
    },
    body: JSON.stringify({
      limit: 50,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
      ...body,
    }),
    method: 'POST',
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export default request

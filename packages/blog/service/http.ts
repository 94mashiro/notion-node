import Axios from 'axios'

const service = Axios.create({
  timeout: 60000,
  responseType: 'json',
  baseURL: 'http://localhost:8080/',
})

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
service.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'

service.interceptors.response.use(response => {
  if (response.status === 200 && response.data.code === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
})

service.defaults.validateStatus = status => {
  return status === 200
}

function get<T>(url: string, params?: any): Promise<APIResponse<T>> {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function post<T>(
  url: string,
  body?: Record<string, any>
): Promise<APIResponse<T>> {
  return new Promise((resolve, reject) => {
    service
      .post(url, body)
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}

export type APIResponse<T> = {
  code: number
  msg: string
  data?: T
}

export { get, post }

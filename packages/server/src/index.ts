import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as cache from 'koa-redis-cache'
import AppRoutes from './routes'

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 8080
const redisOptions = {
  expire: 24 * 60 * 60,
  redis: {
    post: 6379,
    host: '127.0.0.1',
    options: {
      password: '9Ef4cmr8jwaTs6cbYGJXVURsnbRAjLbAoh7LE6DsByGcCTuXt',
    },
  },
}

//路由
AppRoutes.forEach(route => router[route.method](route.path, route.action))

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(cache(redisOptions))
app.listen(port)

console.log(`应用启动成功 端口:${port}`)

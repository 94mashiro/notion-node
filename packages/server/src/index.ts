import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import AppRoutes from './routes'

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 8080

//路由
AppRoutes.forEach(route => router[route.method](route.path, route.action))

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log(`应用启动成功 端口:${port}`)

## 介绍

这是一个基于 Notion 的 Blog 实现。

Demo： https://blog.mashiro.wang/

使用 Notion 作为后台编辑工具，解析 Notion 暂未公开的接口获取数据并进行页面渲染。

实现原理：https://blog.mashiro.wang/post/blog-powered-by-notion



 ## Packages

`packages/api`  封装 Notion 的接口

`packages/server` Blog 的后端实现

`packages/blog` Blog 的前端实现



## 使用方法

1. yarn instlall
2. lerna bootstrap
3. 修改 packages/server/src/config/notion.ts 中的 notionConfig
4. 分别启动 server 和 blog
5. 自行配置 nginx

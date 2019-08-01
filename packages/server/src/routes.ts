import NotionController from './controller/home-controller'

export default [
  {
    path: '/blog',
    method: 'get',
    action: NotionController.getPostList,
  },
  // {
  //   path: '/blog/:id',
  //   method: 'get',
  //   action: HomeController.getPageById,
  // },
  {
    path: '/blog/collection/name/:name',
    method: 'get',
    action: NotionController.getCollectionByName,
  },
]

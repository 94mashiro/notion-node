import NotionController from './controller/home-controller'

export default [
  {
    path: '/api/post',
    method: 'get',
    action: NotionController.getPostList,
  },
  {
    path: '/api/post/:id',
    method: 'get',
    action: NotionController.getPageById,
  },
  {
    path: '/api/collection/name/:name',
    method: 'get',
    action: NotionController.getCollectionByName,
  },
  {
    path: '/api/user',
    method: 'get',
    action: NotionController.getNotionUsers,
  },
  {
    path: `/api/file`,
    method: 'post',
    action: NotionController.getSignedFileByUrls,
  },
]

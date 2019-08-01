interface NotionConfig {
  token: string
  collectionName: string
  collectionId: string
  collectionViewId: string
  tagProperties: {
    title: string
    link: string
    tag: string
    publish: string
    createdTime: string
  }
}

const notionConfig: NotionConfig = {
  token:
    'bfaac19954b80edc7dccdf96783098398bed1fd7b06c2168e4ca6400d9df1a06b0341a6bf7e22b30b36a6a0b090737c3f464c661b692598b695a4f6d0ca64d0cd82b8b246e5926c6912a079e2e23',
  collectionName: 'Notion Blog Database',
  collectionId: '8a1cbd4f-c55a-49cc-94df-2a3dd0d9692c',
  collectionViewId: 'dcc6ece9-8334-4322-9d93-8d7e11cea637',
  tagProperties: {
    title: 'title',
    link: '',
    tag: '|Pvo',
    publish: 'RG39',
    createdTime: 'xGT<',
  },
}

export default notionConfig

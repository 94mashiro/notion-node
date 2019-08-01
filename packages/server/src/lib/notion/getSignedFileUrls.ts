export type GetSignedFileUrlsRequest = {
  urls: GetSignedFileURL[]
}

export type GetSignedFileURL = {
  url: string
}

export type GetSignedFileUrlsResponse = {
  signedUrls: string[]
}

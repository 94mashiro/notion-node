import * as React from 'react'
import { get } from 'lodash'
import { getSignedFileUrls } from '../../service/api'

type StaticFileProps = {
  url?: string
  loading?: boolean
}

type StaticFileState = {
  loading: boolean
  signedUrl?: string
}

const StaticFileHoc = <T extends StaticFileProps>(
  OriginialComponent: React.ComponentType<T>,
  url: string
) => {
  return class extends React.PureComponent<T, StaticFileState> {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
        signedUrl: undefined,
      }
    }
    async componentDidMount() {
      const signedUrlRes = await getSignedFileUrls(url)
      this.setState({
        signedUrl: get(signedUrlRes, ['data', 'urls', 0]),
        loading: false,
      })
    }
    render() {
      return (
        <OriginialComponent
          {...(this.props as T)}
          loading={this.state.loading}
          url={this.state.signedUrl}
        />
      )
    }
  }
}

export default StaticFileHoc

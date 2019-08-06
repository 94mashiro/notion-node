import React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import { get, last } from 'lodash'

type IComponentProps = {
  block: Block
}

type IComponentState = {
  id: string
  file?: string
}

class NotionGist extends React.PureComponent<IComponentProps, IComponentState> {
  iframeNode = React.createRef<HTMLIFrameElement>()

  constructor(props: IComponentProps) {
    super(props)
    const { block } = props
    const gistLink = get(block, ['properties', 'source', 0, 0]) as string
    const linkURL = new URL(gistLink)
    const { pathname, search } = linkURL
    const id = last(pathname.split('/'))
    const file = last(search.split('?file='))
    this.state = {
      id,
      file,
    }
  }

  componentDidMount() {
    this._updateIframeContent()
  }

  componentDidUpdate() {
    this._updateIframeContent()
  }

  _updateIframeContent() {
    const { block } = this.props
    const { file, id } = this.state
    const gistOrigin = get(block, ['properties', 'source', 0, 0]) as string
    const { origin, pathname } = new URL(gistOrigin)
    const doc = this.iframeNode.current.contentWindow.document
    const gistScript = `<script type="text/javascript" src="${origin}${pathname}.js"></script>`
    const styles = '<style>*{font-size:12px;}</style>'
    const elementId = file ? `gist-${id}-${file}` : `gist-${id}`
    const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`

    doc.open()
    doc.writeln(iframeHtml)
    doc.close()
  }

  render() {
    const { id, file } = this.state

    return (
      <iframe
        ref={this.iframeNode}
        width="100%"
        frameBorder={0}
        id={file ? `gist-${id}-${file}` : `gist-${id}`}
      />
    )
  }
}

export default NotionGist

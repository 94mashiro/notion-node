import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import { get } from 'lodash'
import SyntaxHighlighter from 'react-syntax-highlighter'

const style = {
  hljs: {
    display: 'block',
    overflowX: 'auto',
    padding: '0.5em',
    color: '#383a42',
    background: 'rgba(159,86,58,.07)',
  },
  'hljs-comment': {
    color: '#a0a1a7',
    fontStyle: 'italic',
  },
  'hljs-quote': {
    color: '#a0a1a7',
    fontStyle: 'italic',
  },
  'hljs-doctag': {
    color: '#a626a4',
  },
  'hljs-keyword': {
    color: '#a626a4',
  },
  'hljs-formula': {
    color: '#a626a4',
  },
  'hljs-section': {
    color: '#e45649',
  },
  'hljs-name': {
    color: '#e45649',
  },
  'hljs-selector-tag': {
    color: '#e45649',
  },
  'hljs-deletion': {
    color: '#e45649',
  },
  'hljs-subst': {
    color: '#e45649',
  },
  'hljs-literal': {
    color: '#0184bb',
  },
  'hljs-string': {
    color: '#50a14f',
  },
  'hljs-regexp': {
    color: '#50a14f',
  },
  'hljs-addition': {
    color: '#50a14f',
  },
  'hljs-attribute': {
    color: '#50a14f',
  },
  'hljs-meta-string': {
    color: '#50a14f',
  },
  'hljs-built_in': {
    color: '#c18401',
  },
  'hljs-class .hljs-title': {
    color: '#c18401',
  },
  'hljs-attr': {
    color: '#986801',
  },
  'hljs-variable': {
    color: '#986801',
  },
  'hljs-template-variable': {
    color: '#986801',
  },
  'hljs-type': {
    color: '#986801',
  },
  'hljs-selector-class': {
    color: '#986801',
  },
  'hljs-selector-attr': {
    color: '#986801',
  },
  'hljs-selector-pseudo': {
    color: '#986801',
  },
  'hljs-number': {
    color: '#986801',
  },
  'hljs-symbol': {
    color: '#4078f2',
  },
  'hljs-bullet': {
    color: '#4078f2',
  },
  'hljs-link': {
    color: '#4078f2',
    textDecoration: 'underline',
  },
  'hljs-meta': {
    color: '#4078f2',
  },
  'hljs-selector-id': {
    color: '#4078f2',
  },
  'hljs-title': {
    color: '#4078f2',
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
}

type IComponentProps = {
  block: Block
}

class NotionCode extends React.PureComponent<IComponentProps> {
  render() {
    const code = get(this.props.block, ['properties', 'title', 0, 0])
    const type = get(this.props.block, [
      'properties',
      'language',
      0,
      0,
    ]) as string
    return (
      <SyntaxHighlighter language={type} style={style}>
        {code}
      </SyntaxHighlighter>
    )
  }
}

export default NotionCode

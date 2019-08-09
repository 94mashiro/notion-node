import * as React from 'react'
import { Block } from '../../../../api/src/getRecordValues'
import { get } from 'lodash'

type IComponentProps = {
  block: Block
}

class NotionStyleText extends React.PureComponent<IComponentProps> {
  render() {
    const properties = get(this.props.block, ['properties'])
    const textFragments = get(properties, ['title']) || []
    const textNode = textFragments.map((fragment, index) => {
      if (fragment.length === 1) {
        return <React.Fragment key={index}>{fragment[0]}</React.Fragment>
      } else if (fragment.length === 2) {
        const text = fragment[0]
        const textAttrs = fragment[1] as string[][]
        return textAttrs.reduce((prev, curr) => {
          const currAttr = get(curr, [0])
          const attrExtra = get(curr, [1])
          if (currAttr === 'b') {
            return <b key={`b-${index}`}>{prev}</b>
          } else if (currAttr === 'i') {
            return <i key={`i-${index}`}>{prev}</i>
          } else if (currAttr === 'c') {
            return <code key={`c-${index}`}>{prev}</code>
          } else if (currAttr === 'a') {
            return (
              <a
                href={attrExtra}
                rel="nofollow noopener noreferrer"
                target="_blank"
                key={`a-${index}`}
              >
                {prev}
              </a>
            )
          } else if (currAttr === 's') {
            return <del key={`s-${index}`}>{prev}</del>
          } else if (currAttr === 'h') {
            const styles = attrExtra.split('_')
            const style: React.CSSProperties = {
              color: styles.length > 1 ? null : styles[0],
              backgroundColor: styles.length > 1 ? styles[0] : null,
            }
            return (
              <span key={`h-${index}`} style={style}>
                {prev}
              </span>
            )
          } else {
            return prev
          }
        }, text)
      }
    })
    return textNode
  }
}

export default NotionStyleText

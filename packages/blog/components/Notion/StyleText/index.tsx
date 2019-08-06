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
    const textNode = textFragments.map(fragment => {
      if (fragment.length === 1) {
        return fragment[0]
      } else if (fragment.length === 2) {
        const text = fragment[0]
        const textAttrs = fragment[1] as string[][]
        return textAttrs.reduce((prev, curr) => {
          const currAttr = get(curr, [0])
          const attrExtra = get(curr, [1])
          if (currAttr === 'b') {
            return <b>{prev}</b>
          } else if (currAttr === 'i') {
            return <i>{prev}</i>
          } else if (currAttr === 'c') {
            return <code>{prev}</code>
          } else if (currAttr === 'a') {
            return (
              <a
                href={attrExtra}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {prev}
              </a>
            )
          } else if (currAttr === 's') {
            return <del>{prev}</del>
          } else if (currAttr === 'h') {
            const styles = attrExtra.split('_')
            const style: React.CSSProperties = {
              color: styles.length > 1 ? null : styles[0],
              backgroundColor: styles.length > 1 ? styles[0] : null,
            }
            return <span style={style}>{prev}</span>
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

import * as React from 'react'
import styles from './index.scss'
import classNames from 'classnames/bind'
import Disqus from 'disqus-react'
import { PageChunkMeta } from '../../../api/src/loadPageChunk'
import { get, find } from 'lodash'

type IComponentProps = {
  meta: PageChunkMeta
}

class PostComment extends React.PureComponent<IComponentProps> {
  // disqusScript = React.createRef<HTMLScriptElement>()
  // componentDidMount() {
  //   const scriptContent = `/**
  //   *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  //   *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
  //   /*
  //   var disqus_config = function () {
  //   this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
  //   this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  //   };
  //   */
  //   (function() { // DON'T EDIT BELOW THIS LINE
  //   var d = document, s = d.createElement('script');
  //   s.src = 'https://mashiros-insider.disqus.com/embed.js';
  //   s.setAttribute('data-timestamp', +new Date());
  //   (d.head || d.body).appendChild(s);
  //   })();`
  //   const scriptDom = this.disqusScript.current
  //   scriptDom.innerHTML = scriptContent
  // }
  render() {
    const cx = classNames.bind(styles)
    const disqusShortname = 'mashiros-insider'
    const title = get(
      find(this.props.meta.property, property => property.type === 'title'),
      ['value', 0, 0]
    ) as string
    const disqusConfig = {
      url: window.location.href,
      identifier: this.props.meta.id || 'identifier',
      title: title,
    }
    return (
      <div className={cx('post-comment-wrapper')}>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
}

export default PostComment

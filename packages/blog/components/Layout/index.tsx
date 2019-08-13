import * as React from 'react'
import classNames from 'classnames/bind'
import Head from 'next/head'
import LayoutSider from '../LayoutSider'
import styles from './index.scss'
import 'modern-normalize/modern-normalize.css'

class Layout extends React.PureComponent {
  componentDidMount() {
    const headDOM = document.querySelector('head')
    const scriptDOM = document.createElement('script')
    scriptDOM.innerHTML = `
      (function(d) {
        var config = {
          kitId: 'wtt6dgv',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    `
    headDOM.appendChild(scriptDOM)
  }
  render() {
    const cx = classNames.bind(styles)
    return (
      <section className={cx('layout')}>
        <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="x-ua-compatible" content="ie=edge"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          ></meta>
          <title>Mashiro's Blog</title>
          <meta name="description" content="Personal blog by Mashiro." />
        </Head>
        <LayoutSider />
        <section className={cx('main-section')}>{this.props.children}</section>
        <section className={cx('extra-section')}></section>
      </section>
    )
  }
}

export default Layout

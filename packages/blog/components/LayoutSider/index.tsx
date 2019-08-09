import * as React from 'react'
import styles from './index.scss'
import classNames from 'classnames/bind'
import Link from 'next/link'

class LayoutSider extends React.PureComponent {
  render() {
    const cx = classNames.bind(styles)
    return (
      <aside className={cx('layout-sider')}>
        <Link prefetch={false} href="/">
          <a>
            <div className={cx('sider-header')}>
              <div className={cx('brand-title')}>
                Mashiro's
                <br />
                Insider
              </div>
              <div className={cx('brand-subscribe')}>生活觀察筆記</div>
            </div>
          </a>
        </Link>

        <div className={cx('sider-main')}></div>
        <div className={cx('sider-footer')}>
          <span>Proudly powered by Notion </span>
          <br />
          <span>Theme </span>
          <a href="https://github.com/SumiMakito/hexo-theme-journal/">
            Journal.
          </a>
          <span> by </span>
          <a href="https://mak1t0.cc/">Makito</a>
          <br />
          <span>© 2019 </span>
          <a href="https://blog.mashiro.wang">Mashiro's Insider</a>
        </div>
      </aside>
    )
  }
}

export default LayoutSider

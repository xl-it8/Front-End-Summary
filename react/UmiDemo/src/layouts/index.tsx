// 全局布局，默认会在所有路由下生效

import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/detail">detail</Link>
        </li>
        <li>
        <Link to="/personal">personal</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

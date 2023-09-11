import {Link,Outlet} from 'umi'

export default function PersonalPage() {
  return (
    <div>
         <ul>
        <li>
          <Link to="/personal/info">个人信息</Link>
        </li>
      </ul>
     <Outlet/>
    </div>
  )
}

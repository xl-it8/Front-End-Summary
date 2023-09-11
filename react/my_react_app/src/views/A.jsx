import {Link,Outlet} from 'react-router-dom'
import styled from 'styled-components'
let NavBox = styled.div`
  display: flex;
  margin-top:30px;
`
const A = function(){
    return <NavBox>
       <div>
         <Link to="/a/a1">去A页面的子页面a1</Link><br />
         <Link to="/a/a2">去A页面的子页面a2</Link>
       </div>
        <div className={'content'}>
              <Outlet/>
        </div>
    </NavBox>
}

export default A
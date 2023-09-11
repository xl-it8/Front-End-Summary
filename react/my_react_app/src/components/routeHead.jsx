import {Link} from 'react-router-dom'
import styled from 'styled-components'
const NavBox = styled.div`
   
`
const RouteHeader = function(){
   return <NavBox>
      <Link to='/a'>A页面</Link>&nbsp;&nbsp;
      <Link to='/b'>B页面</Link>&nbsp;&nbsp;
      <Link to='/c'>C页面</Link>
   </NavBox>
}


export default RouteHeader
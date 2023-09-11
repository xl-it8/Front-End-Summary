import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RouterView  from './router'
import { KeepAliveProvider } from "keepalive-react-component";
// import Home from '@/views/Home'
// import Login from '@/views/Login'
const App = function () {
  return <BrowserRouter>
  <KeepAliveProvider>
          <RouterView/>
          </KeepAliveProvider>
  {/* <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login  />} />
  </Routes> */}
</BrowserRouter> 
}

export default App

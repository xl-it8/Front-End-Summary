import RouteHeader from './components/routeHead'
import { HashRouter} from 'react-router-dom'
import RouterView from './router/index'
const App = function(){
    return <HashRouter>
      <RouteHeader/>

      <div className={'container'}>
        <RouterView/>
      </div>
    </HashRouter>
}

export default App
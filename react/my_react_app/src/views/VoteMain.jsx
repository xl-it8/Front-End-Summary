import React from 'react'
import themeContext from '../store/context'
class VoteMian extends React.Component {
    static contextType = themeContext
    render(){
        const {getState} = this.context
        const {oppNum,supNum  } = getState()

        return <div>
            <div>支持人数:{supNum}</div>
            <div>反对人数:{oppNum}</div>
        </div>
    }
  }

export default VoteMian
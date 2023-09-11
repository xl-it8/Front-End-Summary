import React from 'react'
export type XX = {
    menu: {
        a: number
    }
}
const Demo:React.FC<XX> =(props)=>{
    const {menu} = props
return <>
<div>{menu.a}</div>
</>
}

export default Demo
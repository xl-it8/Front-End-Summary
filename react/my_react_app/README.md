###
 1. jsx里不能有普通对象 除了数组和jsx编译后的虚拟dom
   //{React.createElement('span', null ,'虚拟dom')}
 2. jsx执行的过程  通过 babel-preset-react-app 对 babel-preset-env重写 对jsx编译并处理为虚拟dom(返回值就是虚拟dom) 
    {
      $$typeof: Symbol(react.element),
      key: null,
      ref: null,
      type: Symbol(react.fragment),
      props:{
        children: [
          {
             props:{
               className:'xxx',
               style:{
                fontSzie: "16px"
               },
               children: [] 或者 "xxx"
             }
            type: "h3",

          }
        ]
      }

    }

  再通过render处理虚拟dom转为真实的dom
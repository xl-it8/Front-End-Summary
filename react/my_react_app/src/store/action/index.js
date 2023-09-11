import voteAction from './voteAction'
import personAction from './personAction'
//这个就是action的模块化管理
const action = {
  vote: voteAction, //vote模块的action
  person: personAction //person模块的action
}

export default action

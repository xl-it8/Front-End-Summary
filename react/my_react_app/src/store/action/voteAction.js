import * as TYPES from '../action_types/index'
const voteAction = {
  suppose() {
    return {
      action: TYPES.VOTE_SUP,
    }
  },
  oppose() {
    return {
      action: TYPES.VOTE_OOP,
    }
  },
}
//在页面中可以通过 store.dispatch(action.vote.suppose())来实现派发

export default voteAction

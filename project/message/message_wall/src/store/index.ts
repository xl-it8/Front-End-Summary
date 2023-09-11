import useHomeStore from './modules/home'


export default function useStore(){
  return {
    home:useHomeStore()
  }
}

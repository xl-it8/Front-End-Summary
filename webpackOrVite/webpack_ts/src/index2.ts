import { Pet } from './pet'
const pet = new Pet()
// pet.walk('33') //会报错 因为接口不包含方法的实现，而只包含它们的声明

pet.walk('ee')
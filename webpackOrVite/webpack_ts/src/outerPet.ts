import  {Pet} from './pet'

  declare module "./pet" { //需要导入否则会有报错提示
    interface Pet {
      age: number;
      walk(location: string);
    }
  }

  Pet.prototype.walk = function(location) {
    console.log(location)
  }
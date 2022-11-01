import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator = require('password-generator');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  generarClave(){
    let clave  = generator(6,false);
    return clave;
  }
}

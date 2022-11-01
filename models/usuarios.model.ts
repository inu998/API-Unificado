import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Conjunto} from './conjunto.model';
import {DetalleFacturacion} from './detalle-facturacion.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id_usuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  Primer_nombre: string;

  @property({
    type: 'string',
  })
  Segundo_nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'string',
  })
  Segundo_apellido?: string;

  @property({
    type: 'number',
    required: true,
  })
  Documento: number;

  @property({
    type: 'string',
    required: true,
  })
  Correo_electronico: string;

  @property({
    type: 'number',
    required: true,
  })
  Celular: number;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_usuario: string;

  @hasMany(() => Conjunto, {keyTo: 'Id_usuario'})
  UsuariosConjunto: Conjunto[];

  @hasOne(() => Conjunto, {keyTo: 'Id_usuario'})
  hasOneUsuariosConjunto: Conjunto;

  @hasMany(() => DetalleFacturacion, {keyTo: 'Id_usuario'})
  hasManyUsuariosDetalleFacturacion: DetalleFacturacion[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;

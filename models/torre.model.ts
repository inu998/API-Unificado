import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {DetalleFacturacion} from './detalle-facturacion.model';
import {Conjunto} from './conjunto.model';
import {Propiedad} from './propiedad.model';

@model()
export class Torre extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id_torre?: string;

  @property({
    type: 'number',
    required: true,
  })
  Identificador: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @hasMany(() => DetalleFacturacion, {keyTo: 'Id_torre'})
  hasManyTorreDetalleFacturacion: DetalleFacturacion[];

  @hasOne(() => Conjunto, {keyTo: 'Id_torre'})
  hasOneTorreConjunto: Conjunto;

  @hasMany(() => Propiedad, {keyTo: 'Id_propiedad'})
  hasManyTorrePropiedad: Propiedad[];

  @property({
    type: 'string',
  })
  Id_propiedad?: string;

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;

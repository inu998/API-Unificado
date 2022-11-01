import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {DetalleFacturacion} from './detalle-facturacion.model';
import {Torre} from './torre.model';

@model()
export class Propiedad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id_propiedad?: string;

  @property({
    type: 'number',
    required: true,
  })
  Identificador: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
  })
  Id_detalle_facturacion?: string;

  @hasMany(() => DetalleFacturacion, {keyTo: 'Id_detalle_facturacion'})
  hasManyPropiedadDetalleFacturacion: DetalleFacturacion[];

  @hasOne(() => Torre, {keyTo: 'Id_propiedad'})
  hasOnePropiedadTorre: Torre;

  constructor(data?: Partial<Propiedad>) {
    super(data);
  }
}

export interface PropiedadRelations {
  // describe navigational properties here
}

export type PropiedadWithRelations = Propiedad & PropiedadRelations;

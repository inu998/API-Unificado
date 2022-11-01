import {Entity, model, property, hasOne} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Torre} from './torre.model';
import {Propiedad} from './propiedad.model';
import {Conjunto} from './conjunto.model';

@model()
export class DetalleFacturacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id_detalle_facturacion?: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  Saldo_favor: number;

  @property({
    type: 'number',
    required: true,
  })
  Saldo_pendiente: number;

  @property({
    type: 'string',
  })
  Id_usuario?: string;

  @hasOne(() => Usuarios, {keyTo: 'Id_usuario'})
  hasOneDetalleFacturacionUsuarios: Usuarios;

  @hasOne(() => Torre, {keyTo: 'Id_torre'})
  hasOneDetalleFacturacionTorre: Torre;

  @property({
    type: 'string',
  })
  Id_torre?: string;

  @hasOne(() => Propiedad, {keyTo: 'Id_detalle_facturacion'})
  hasOneDetalleFacturacionPropiedad: Propiedad;

  @hasOne(() => Conjunto, {keyTo: 'Id_conjunto'})
  hasOneDetalleFacturacion: Conjunto;

  @property({
    type: 'string',
  })
  Id_conjunto?: string;

  constructor(data?: Partial<DetalleFacturacion>) {
    super(data);
  }
}

export interface DetalleFacturacionRelations {
  // describe navigational properties here
}

export type DetalleFacturacionWithRelations = DetalleFacturacion & DetalleFacturacionRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Torre} from './torre.model';
import {DetalleFacturacion} from './detalle-facturacion.model';

@model()
export class Conjunto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id_conjunto?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_del_conjunto: string;

  @property({
    type: 'number',
    required: true,
  })
  Nit: number;

  @property({
    type: 'number',
    required: true,
  })
  Cuenta_banco: number;

  @property({
    type: 'number',
    required: true,
  })
  Intereses_mora: number;

  @property({
    type: 'number',
    required: true,
  })
  Inicio_numero_factura: number;

  @property({
    type: 'number',
    required: true,
  })
  Presupuesto: number;

  @property({
    type: 'string',
  })
  Id_usuario?: string;

  @hasMany(() => Usuarios, {keyTo: 'Id_usuario'})
  hasManyConjuntoUsuarios: Usuarios[];

  @hasMany(() => Torre, {keyTo: 'Id_torre'})
  hasManyConjuntoTorre: Torre[];

  @property({
    type: 'string',
  })
  Id_torre?: string;

  @hasMany(() => DetalleFacturacion, {keyTo: 'Id_conjunto'})
  hasManyConjuntoDetalleFacturacion: DetalleFacturacion[];

  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;

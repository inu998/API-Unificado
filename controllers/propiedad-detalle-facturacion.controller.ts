import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propiedad,
  DetalleFacturacion,
} from '../models';
import {PropiedadRepository} from '../repositories';

export class PropiedadDetalleFacturacionController {
  constructor(
    @repository(PropiedadRepository) protected propiedadRepository: PropiedadRepository,
  ) { }

  @get('/propiedads/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Array of Propiedad has many DetalleFacturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFacturacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleFacturacion>,
  ): Promise<DetalleFacturacion[]> {
    return this.propiedadRepository.hasManyPropiedadDetalleFacturacion(id).find(filter);
  }

  @post('/propiedads/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Propiedad model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFacturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propiedad.prototype.Id_propiedad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {
            title: 'NewDetalleFacturacionInPropiedad',
            exclude: ['Id_detalle_facturacion'],
            optional: ['Id_detalle_facturacion']
          }),
        },
      },
    }) detalleFacturacion: Omit<DetalleFacturacion, 'Id_detalle_facturacion'>,
  ): Promise<DetalleFacturacion> {
    return this.propiedadRepository.hasManyPropiedadDetalleFacturacion(id).create(detalleFacturacion);
  }

  @patch('/propiedads/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Propiedad.DetalleFacturacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {partial: true}),
        },
      },
    })
    detalleFacturacion: Partial<DetalleFacturacion>,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturacion)) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.propiedadRepository.hasManyPropiedadDetalleFacturacion(id).patch(detalleFacturacion, where);
  }

  @del('/propiedads/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Propiedad.DetalleFacturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturacion)) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.propiedadRepository.hasManyPropiedadDetalleFacturacion(id).delete(where);
  }
}

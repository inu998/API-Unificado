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
  Torre,
  DetalleFacturacion,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreDetalleFacturacionController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Array of Torre has many DetalleFacturacion',
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
    return this.torreRepository.hasManyTorreDetalleFacturacion(id).find(filter);
  }

  @post('/torres/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFacturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.Id_torre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {
            title: 'NewDetalleFacturacionInTorre',
            exclude: ['Id_detalle_facturacion'],
            optional: ['Id_torre']
          }),
        },
      },
    }) detalleFacturacion: Omit<DetalleFacturacion, 'Id_detalle_facturacion'>,
  ): Promise<DetalleFacturacion> {
    return this.torreRepository.hasManyTorreDetalleFacturacion(id).create(detalleFacturacion);
  }

  @patch('/torres/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Torre.DetalleFacturacion PATCH success count',
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
    return this.torreRepository.hasManyTorreDetalleFacturacion(id).patch(detalleFacturacion, where);
  }

  @del('/torres/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Torre.DetalleFacturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturacion)) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.torreRepository.hasManyTorreDetalleFacturacion(id).delete(where);
  }
}

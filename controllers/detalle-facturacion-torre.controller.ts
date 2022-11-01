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
  DetalleFacturacion,
  Torre,
} from '../models';
import {DetalleFacturacionRepository} from '../repositories';

export class DetalleFacturacionTorreController {
  constructor(
    @repository(DetalleFacturacionRepository) protected detalleFacturacionRepository: DetalleFacturacionRepository,
  ) { }

  @get('/detalle-facturacions/{id}/torre', {
    responses: {
      '200': {
        description: 'DetalleFacturacion has one Torre',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torre),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torre>,
  ): Promise<Torre> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionTorre(id).get(filter);
  }

  @post('/detalle-facturacions/{id}/torre', {
    responses: {
      '200': {
        description: 'DetalleFacturacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFacturacion.prototype.Id_detalle_facturacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorreInDetalleFacturacion',
            exclude: ['Id_torre'],
            optional: ['Id_torre']
          }),
        },
      },
    }) torre: Omit<Torre, 'Id_torre'>,
  ): Promise<Torre> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionTorre(id).create(torre);
  }

  @patch('/detalle-facturacions/{id}/torre', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Torre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Partial<Torre>,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionTorre(id).patch(torre, where);
  }

  @del('/detalle-facturacions/{id}/torre', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Torre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionTorre(id).delete(where);
  }
}

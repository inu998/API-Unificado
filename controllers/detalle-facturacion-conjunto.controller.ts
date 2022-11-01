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
  Conjunto,
} from '../models';
import {DetalleFacturacionRepository} from '../repositories';

export class DetalleFacturacionConjuntoController {
  constructor(
    @repository(DetalleFacturacionRepository) protected detalleFacturacionRepository: DetalleFacturacionRepository,
  ) { }

  @get('/detalle-facturacions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'DetalleFacturacion has one Conjunto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conjunto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Conjunto>,
  ): Promise<Conjunto> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacion(id).get(filter);
  }

  @post('/detalle-facturacions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'DetalleFacturacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFacturacion.prototype.Id_detalle_facturacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjuntoInDetalleFacturacion',
            exclude: ['Id_conjunto'],
            optional: ['Id_conjunto']
          }),
        },
      },
    }) conjunto: Omit<Conjunto, 'Id_conjunto'>,
  ): Promise<Conjunto> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacion(id).create(conjunto);
  }

  @patch('/detalle-facturacions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Conjunto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {partial: true}),
        },
      },
    })
    conjunto: Partial<Conjunto>,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacion(id).patch(conjunto, where);
  }

  @del('/detalle-facturacions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Conjunto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacion(id).delete(where);
  }
}

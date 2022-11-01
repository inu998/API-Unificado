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
  Conjunto,
  DetalleFacturacion,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoDetalleFacturacionController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many DetalleFacturacion',
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
    return this.conjuntoRepository.hasManyConjuntoDetalleFacturacion(id).find(filter);
  }

  @post('/conjuntos/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFacturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.Id_conjunto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {
            title: 'NewDetalleFacturacionInConjunto',
            exclude: ['Id_detalle_facturacion'],
            optional: ['Id_conjunto']
          }),
        },
      },
    }) detalleFacturacion: Omit<DetalleFacturacion, 'Id_detalle_facturacion'>,
  ): Promise<DetalleFacturacion> {
    return this.conjuntoRepository.hasManyConjuntoDetalleFacturacion(id).create(detalleFacturacion);
  }

  @patch('/conjuntos/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Conjunto.DetalleFacturacion PATCH success count',
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
    return this.conjuntoRepository.hasManyConjuntoDetalleFacturacion(id).patch(detalleFacturacion, where);
  }

  @del('/conjuntos/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Conjunto.DetalleFacturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturacion)) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.conjuntoRepository.hasManyConjuntoDetalleFacturacion(id).delete(where);
  }
}

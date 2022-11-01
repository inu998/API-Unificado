import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetalleFacturacion} from '../models';
import {DetalleFacturacionRepository} from '../repositories';

export class DetalleFacturacionController {
  constructor(
    @repository(DetalleFacturacionRepository)
    public detalleFacturacionRepository : DetalleFacturacionRepository,
  ) {}

  @post('/detalle-facturacions')
  @response(200, {
    description: 'DetalleFacturacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleFacturacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {
            title: 'NewDetalleFacturacion',
            exclude: ['Id_detalle_facturacion'],
          }),
        },
      },
    })
    detalleFacturacion: Omit<DetalleFacturacion, 'Id_detalle_facturacion'>,
  ): Promise<DetalleFacturacion> {
    return this.detalleFacturacionRepository.create(detalleFacturacion);
  }

  @get('/detalle-facturacions/count')
  @response(200, {
    description: 'DetalleFacturacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleFacturacion) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.count(where);
  }

  @get('/detalle-facturacions')
  @response(200, {
    description: 'Array of DetalleFacturacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleFacturacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleFacturacion) filter?: Filter<DetalleFacturacion>,
  ): Promise<DetalleFacturacion[]> {
    return this.detalleFacturacionRepository.find(filter);
  }

  @patch('/detalle-facturacions')
  @response(200, {
    description: 'DetalleFacturacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {partial: true}),
        },
      },
    })
    detalleFacturacion: DetalleFacturacion,
    @param.where(DetalleFacturacion) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.updateAll(detalleFacturacion, where);
  }

  @get('/detalle-facturacions/{id}')
  @response(200, {
    description: 'DetalleFacturacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleFacturacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleFacturacion, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleFacturacion>
  ): Promise<DetalleFacturacion> {
    return this.detalleFacturacionRepository.findById(id, filter);
  }

  @patch('/detalle-facturacions/{id}')
  @response(204, {
    description: 'DetalleFacturacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {partial: true}),
        },
      },
    })
    detalleFacturacion: DetalleFacturacion,
  ): Promise<void> {
    await this.detalleFacturacionRepository.updateById(id, detalleFacturacion);
  }

  @put('/detalle-facturacions/{id}')
  @response(204, {
    description: 'DetalleFacturacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detalleFacturacion: DetalleFacturacion,
  ): Promise<void> {
    await this.detalleFacturacionRepository.replaceById(id, detalleFacturacion);
  }

  @del('/detalle-facturacions/{id}')
  @response(204, {
    description: 'DetalleFacturacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleFacturacionRepository.deleteById(id);
  }
}

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
  Usuarios,
  DetalleFacturacion,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosDetalleFacturacionController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many DetalleFacturacion',
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
    return this.usuariosRepository.hasManyUsuariosDetalleFacturacion(id).find(filter);
  }

  @post('/usuarios/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFacturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.Id_usuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturacion, {
            title: 'NewDetalleFacturacionInUsuarios',
            exclude: ['Id_detalle_facturacion'],
            optional: ['Id_usuario']
          }),
        },
      },
    }) detalleFacturacion: Omit<DetalleFacturacion, 'Id_detalle_facturacion'>,
  ): Promise<DetalleFacturacion> {
    return this.usuariosRepository.hasManyUsuariosDetalleFacturacion(id).create(detalleFacturacion);
  }

  @patch('/usuarios/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Usuarios.DetalleFacturacion PATCH success count',
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
    return this.usuariosRepository.hasManyUsuariosDetalleFacturacion(id).patch(detalleFacturacion, where);
  }

  @del('/usuarios/{id}/detalle-facturacions', {
    responses: {
      '200': {
        description: 'Usuarios.DetalleFacturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturacion)) where?: Where<DetalleFacturacion>,
  ): Promise<Count> {
    return this.usuariosRepository.hasManyUsuariosDetalleFacturacion(id).delete(where);
  }
}

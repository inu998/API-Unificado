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
  Usuarios,
} from '../models';
import {DetalleFacturacionRepository} from '../repositories';

export class DetalleFacturacionUsuariosController {
  constructor(
    @repository(DetalleFacturacionRepository) protected detalleFacturacionRepository: DetalleFacturacionRepository,
  ) { }

  @get('/detalle-facturacions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'DetalleFacturacion has one Usuarios',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuarios),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionUsuarios(id).get(filter);
  }

  @post('/detalle-facturacions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'DetalleFacturacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFacturacion.prototype.Id_detalle_facturacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInDetalleFacturacion',
            exclude: ['Id_usuario'],
            optional: ['Id_usuario']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id_usuario'>,
  ): Promise<Usuarios> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionUsuarios(id).create(usuarios);
  }

  @patch('/detalle-facturacions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionUsuarios(id).patch(usuarios, where);
  }

  @del('/detalle-facturacions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionUsuarios(id).delete(where);
  }
}

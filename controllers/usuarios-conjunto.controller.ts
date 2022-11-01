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
  Conjunto,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosConjuntoController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Usuarios has one Conjunto',
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
    return this.usuariosRepository.hasOneUsuariosConjunto(id).get(filter);
  }

  @post('/usuarios/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.Id_usuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjuntoInUsuarios',
            exclude: ['Id_conjunto'],
            optional: ['Id_usuario']
          }),
        },
      },
    }) conjunto: Omit<Conjunto, 'Id_conjunto'>,
  ): Promise<Conjunto> {
    return this.usuariosRepository.hasOneUsuariosConjunto(id).create(conjunto);
  }

  @patch('/usuarios/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Usuarios.Conjunto PATCH success count',
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
    return this.usuariosRepository.hasOneUsuariosConjunto(id).patch(conjunto, where);
  }

  @del('/usuarios/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Usuarios.Conjunto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.usuariosRepository.hasOneUsuariosConjunto(id).delete(where);
  }
}

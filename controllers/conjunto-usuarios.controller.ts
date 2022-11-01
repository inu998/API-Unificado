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
  Usuarios,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoUsuariosController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.conjuntoRepository.hasManyConjuntoUsuarios(id).find(filter);
  }

  @post('/conjuntos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.Id_conjunto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInConjunto',
            exclude: ['Id_usuario'],
            optional: ['Id_usuario']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id_usuario'>,
  ): Promise<Usuarios> {
    return this.conjuntoRepository.hasManyConjuntoUsuarios(id).create(usuarios);
  }

  @patch('/conjuntos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Conjunto.Usuarios PATCH success count',
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
    return this.conjuntoRepository.hasManyConjuntoUsuarios(id).patch(usuarios, where);
  }

  @del('/conjuntos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Conjunto.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.conjuntoRepository.hasManyConjuntoUsuarios(id).delete(where);
  }
}

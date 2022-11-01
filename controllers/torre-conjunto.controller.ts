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
  Conjunto,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreConjuntoController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Torre has one Conjunto',
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
    return this.torreRepository.hasOneTorreConjunto(id).get(filter);
  }

  @post('/torres/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.Id_torre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjuntoInTorre',
            exclude: ['Id_conjunto'],
            optional: ['Id_torre']
          }),
        },
      },
    }) conjunto: Omit<Conjunto, 'Id_conjunto'>,
  ): Promise<Conjunto> {
    return this.torreRepository.hasOneTorreConjunto(id).create(conjunto);
  }

  @patch('/torres/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Torre.Conjunto PATCH success count',
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
    return this.torreRepository.hasOneTorreConjunto(id).patch(conjunto, where);
  }

  @del('/torres/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Torre.Conjunto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.torreRepository.hasOneTorreConjunto(id).delete(where);
  }
}

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
  Propiedad,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorrePropiedadController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/propiedads', {
    responses: {
      '200': {
        description: 'Array of Torre has many Propiedad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propiedad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Propiedad>,
  ): Promise<Propiedad[]> {
    return this.torreRepository.hasManyTorrePropiedad(id).find(filter);
  }

  @post('/torres/{id}/propiedads', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Propiedad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.Id_torre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {
            title: 'NewPropiedadInTorre',
            exclude: ['Id_propiedad'],
            optional: ['Id_propiedad']
          }),
        },
      },
    }) propiedad: Omit<Propiedad, 'Id_propiedad'>,
  ): Promise<Propiedad> {
    return this.torreRepository.hasManyTorrePropiedad(id).create(propiedad);
  }

  @patch('/torres/{id}/propiedads', {
    responses: {
      '200': {
        description: 'Torre.Propiedad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {partial: true}),
        },
      },
    })
    propiedad: Partial<Propiedad>,
    @param.query.object('where', getWhereSchemaFor(Propiedad)) where?: Where<Propiedad>,
  ): Promise<Count> {
    return this.torreRepository.hasManyTorrePropiedad(id).patch(propiedad, where);
  }

  @del('/torres/{id}/propiedads', {
    responses: {
      '200': {
        description: 'Torre.Propiedad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Propiedad)) where?: Where<Propiedad>,
  ): Promise<Count> {
    return this.torreRepository.hasManyTorrePropiedad(id).delete(where);
  }
}

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
  Propiedad,
  Torre,
} from '../models';
import {PropiedadRepository} from '../repositories';

export class PropiedadTorreController {
  constructor(
    @repository(PropiedadRepository) protected propiedadRepository: PropiedadRepository,
  ) { }

  @get('/propiedads/{id}/torre', {
    responses: {
      '200': {
        description: 'Propiedad has one Torre',
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
    return this.propiedadRepository.hasOnePropiedadTorre(id).get(filter);
  }

  @post('/propiedads/{id}/torre', {
    responses: {
      '200': {
        description: 'Propiedad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propiedad.prototype.Id_propiedad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorreInPropiedad',
            exclude: ['Id_torre'],
            optional: ['Id_propiedad']
          }),
        },
      },
    }) torre: Omit<Torre, 'Id_torre'>,
  ): Promise<Torre> {
    return this.propiedadRepository.hasOnePropiedadTorre(id).create(torre);
  }

  @patch('/propiedads/{id}/torre', {
    responses: {
      '200': {
        description: 'Propiedad.Torre PATCH success count',
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
    return this.propiedadRepository.hasOnePropiedadTorre(id).patch(torre, where);
  }

  @del('/propiedads/{id}/torre', {
    responses: {
      '200': {
        description: 'Propiedad.Torre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.propiedadRepository.hasOnePropiedadTorre(id).delete(where);
  }
}

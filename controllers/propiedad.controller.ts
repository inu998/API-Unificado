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
import {Propiedad} from '../models';
import {PropiedadRepository} from '../repositories';

export class PropiedadController {
  constructor(
    @repository(PropiedadRepository)
    public propiedadRepository : PropiedadRepository,
  ) {}

  @post('/propiedads')
  @response(200, {
    description: 'Propiedad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Propiedad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {
            title: 'NewPropiedad',
            exclude: ['Id_propiedad'],
          }),
        },
      },
    })
    propiedad: Omit<Propiedad, 'Id_propiedad'>,
  ): Promise<Propiedad> {
    return this.propiedadRepository.create(propiedad);
  }

  @get('/propiedads/count')
  @response(200, {
    description: 'Propiedad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Propiedad) where?: Where<Propiedad>,
  ): Promise<Count> {
    return this.propiedadRepository.count(where);
  }

  @get('/propiedads')
  @response(200, {
    description: 'Array of Propiedad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propiedad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Propiedad) filter?: Filter<Propiedad>,
  ): Promise<Propiedad[]> {
    return this.propiedadRepository.find(filter);
  }

  @patch('/propiedads')
  @response(200, {
    description: 'Propiedad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {partial: true}),
        },
      },
    })
    propiedad: Propiedad,
    @param.where(Propiedad) where?: Where<Propiedad>,
  ): Promise<Count> {
    return this.propiedadRepository.updateAll(propiedad, where);
  }

  @get('/propiedads/{id}')
  @response(200, {
    description: 'Propiedad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Propiedad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Propiedad, {exclude: 'where'}) filter?: FilterExcludingWhere<Propiedad>
  ): Promise<Propiedad> {
    return this.propiedadRepository.findById(id, filter);
  }

  @patch('/propiedads/{id}')
  @response(204, {
    description: 'Propiedad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {partial: true}),
        },
      },
    })
    propiedad: Propiedad,
  ): Promise<void> {
    await this.propiedadRepository.updateById(id, propiedad);
  }

  @put('/propiedads/{id}')
  @response(204, {
    description: 'Propiedad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propiedad: Propiedad,
  ): Promise<void> {
    await this.propiedadRepository.replaceById(id, propiedad);
  }

  @del('/propiedads/{id}')
  @response(204, {
    description: 'Propiedad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propiedadRepository.deleteById(id);
  }
}

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
  Propiedad,
} from '../models';
import {DetalleFacturacionRepository} from '../repositories';

export class DetalleFacturacionPropiedadController {
  constructor(
    @repository(DetalleFacturacionRepository) protected detalleFacturacionRepository: DetalleFacturacionRepository,
  ) { }

  @get('/detalle-facturacions/{id}/propiedad', {
    responses: {
      '200': {
        description: 'DetalleFacturacion has one Propiedad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Propiedad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Propiedad>,
  ): Promise<Propiedad> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionPropiedad(id).get(filter);
  }

  @post('/detalle-facturacions/{id}/propiedad', {
    responses: {
      '200': {
        description: 'DetalleFacturacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Propiedad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFacturacion.prototype.Id_detalle_facturacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propiedad, {
            title: 'NewPropiedadInDetalleFacturacion',
            exclude: ['Id_propiedad'],
            optional: ['Id_detalle_facturacion']
          }),
        },
      },
    }) propiedad: Omit<Propiedad, 'Id_propiedad'>,
  ): Promise<Propiedad> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionPropiedad(id).create(propiedad);
  }

  @patch('/detalle-facturacions/{id}/propiedad', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Propiedad PATCH success count',
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
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionPropiedad(id).patch(propiedad, where);
  }

  @del('/detalle-facturacions/{id}/propiedad', {
    responses: {
      '200': {
        description: 'DetalleFacturacion.Propiedad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Propiedad)) where?: Where<Propiedad>,
  ): Promise<Count> {
    return this.detalleFacturacionRepository.hasOneDetalleFacturacionPropiedad(id).delete(where);
  }
}

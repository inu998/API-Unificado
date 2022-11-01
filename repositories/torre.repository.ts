import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Torre, TorreRelations, DetalleFacturacion, Conjunto, Propiedad} from '../models';
import {DetalleFacturacionRepository} from './detalle-facturacion.repository';
import {ConjuntoRepository} from './conjunto.repository';
import {PropiedadRepository} from './propiedad.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.Id_torre,
  TorreRelations
> {

  public readonly hasManyTorreDetalleFacturacion: HasManyRepositoryFactory<DetalleFacturacion, typeof Torre.prototype.Id_torre>;

  public readonly hasOneTorreConjunto: HasOneRepositoryFactory<Conjunto, typeof Torre.prototype.Id_torre>;

  public readonly hasManyTorrePropiedad: HasManyRepositoryFactory<Propiedad, typeof Torre.prototype.Id_torre>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('DetalleFacturacionRepository') protected detalleFacturacionRepositoryGetter: Getter<DetalleFacturacionRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('PropiedadRepository') protected propiedadRepositoryGetter: Getter<PropiedadRepository>,
  ) {
    super(Torre, dataSource);
    this.hasManyTorrePropiedad = this.createHasManyRepositoryFactoryFor('hasManyTorrePropiedad', propiedadRepositoryGetter,);
    this.registerInclusionResolver('hasManyTorrePropiedad', this.hasManyTorrePropiedad.inclusionResolver);
    this.hasOneTorreConjunto = this.createHasOneRepositoryFactoryFor('hasOneTorreConjunto', conjuntoRepositoryGetter);
    this.registerInclusionResolver('hasOneTorreConjunto', this.hasOneTorreConjunto.inclusionResolver);
    this.hasManyTorreDetalleFacturacion = this.createHasManyRepositoryFactoryFor('hasManyTorreDetalleFacturacion', detalleFacturacionRepositoryGetter,);
    this.registerInclusionResolver('hasManyTorreDetalleFacturacion', this.hasManyTorreDetalleFacturacion.inclusionResolver);
  }
}

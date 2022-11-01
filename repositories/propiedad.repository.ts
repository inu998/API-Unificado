import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Propiedad, PropiedadRelations, DetalleFacturacion, Torre} from '../models';
import {DetalleFacturacionRepository} from './detalle-facturacion.repository';
import {TorreRepository} from './torre.repository';

export class PropiedadRepository extends DefaultCrudRepository<
  Propiedad,
  typeof Propiedad.prototype.Id_propiedad,
  PropiedadRelations
> {

  public readonly hasManyPropiedadDetalleFacturacion: HasManyRepositoryFactory<DetalleFacturacion, typeof Propiedad.prototype.Id_propiedad>;

  public readonly hasOnePropiedadTorre: HasOneRepositoryFactory<Torre, typeof Propiedad.prototype.Id_propiedad>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('DetalleFacturacionRepository') protected detalleFacturacionRepositoryGetter: Getter<DetalleFacturacionRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>,
  ) {
    super(Propiedad, dataSource);
    this.hasOnePropiedadTorre = this.createHasOneRepositoryFactoryFor('hasOnePropiedadTorre', torreRepositoryGetter);
    this.registerInclusionResolver('hasOnePropiedadTorre', this.hasOnePropiedadTorre.inclusionResolver);
    this.hasManyPropiedadDetalleFacturacion = this.createHasManyRepositoryFactoryFor('hasManyPropiedadDetalleFacturacion', detalleFacturacionRepositoryGetter,);
    this.registerInclusionResolver('hasManyPropiedadDetalleFacturacion', this.hasManyPropiedadDetalleFacturacion.inclusionResolver);
  }
}

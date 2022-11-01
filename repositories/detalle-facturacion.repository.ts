import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {DetalleFacturacion, DetalleFacturacionRelations, Usuarios, Torre, Propiedad, Conjunto} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {TorreRepository} from './torre.repository';
import {PropiedadRepository} from './propiedad.repository';
import {ConjuntoRepository} from './conjunto.repository';

export class DetalleFacturacionRepository extends DefaultCrudRepository<
  DetalleFacturacion,
  typeof DetalleFacturacion.prototype.Id_detalle_facturacion,
  DetalleFacturacionRelations
> {

  public readonly hasOneDetalleFacturacionUsuarios: HasOneRepositoryFactory<Usuarios, typeof DetalleFacturacion.prototype.Id_detalle_facturacion>;

  public readonly hasOneDetalleFacturacionTorre: HasOneRepositoryFactory<Torre, typeof DetalleFacturacion.prototype.Id_detalle_facturacion>;

  public readonly hasOneDetalleFacturacionPropiedad: HasOneRepositoryFactory<Propiedad, typeof DetalleFacturacion.prototype.Id_detalle_facturacion>;

  public readonly hasOneDetalleFacturacion: HasOneRepositoryFactory<Conjunto, typeof DetalleFacturacion.prototype.Id_detalle_facturacion>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('PropiedadRepository') protected propiedadRepositoryGetter: Getter<PropiedadRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(DetalleFacturacion, dataSource);
    this.hasOneDetalleFacturacion = this.createHasOneRepositoryFactoryFor('hasOneDetalleFacturacion', conjuntoRepositoryGetter);
    this.registerInclusionResolver('hasOneDetalleFacturacion', this.hasOneDetalleFacturacion.inclusionResolver);
    this.hasOneDetalleFacturacionPropiedad = this.createHasOneRepositoryFactoryFor('hasOneDetalleFacturacionPropiedad', propiedadRepositoryGetter);
    this.registerInclusionResolver('hasOneDetalleFacturacionPropiedad', this.hasOneDetalleFacturacionPropiedad.inclusionResolver);
    this.hasOneDetalleFacturacionTorre = this.createHasOneRepositoryFactoryFor('hasOneDetalleFacturacionTorre', torreRepositoryGetter);
    this.registerInclusionResolver('hasOneDetalleFacturacionTorre', this.hasOneDetalleFacturacionTorre.inclusionResolver);
    this.hasOneDetalleFacturacionUsuarios = this.createHasOneRepositoryFactoryFor('hasOneDetalleFacturacionUsuarios', usuariosRepositoryGetter);
    this.registerInclusionResolver('hasOneDetalleFacturacionUsuarios', this.hasOneDetalleFacturacionUsuarios.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations, Usuarios, Torre, DetalleFacturacion} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {TorreRepository} from './torre.repository';
import {DetalleFacturacionRepository} from './detalle-facturacion.repository';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.Id_conjunto,
  ConjuntoRelations
> {

  public readonly hasManyConjuntoUsuarios: HasManyRepositoryFactory<Usuarios, typeof Conjunto.prototype.Id_conjunto>;

  public readonly hasManyConjuntoTorre: HasManyRepositoryFactory<Torre, typeof Conjunto.prototype.Id_conjunto>;

  public readonly hasManyConjuntoDetalleFacturacion: HasManyRepositoryFactory<DetalleFacturacion, typeof Conjunto.prototype.Id_conjunto>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('DetalleFacturacionRepository') protected detalleFacturacionRepositoryGetter: Getter<DetalleFacturacionRepository>,
  ) {
    super(Conjunto, dataSource);
    this.hasManyConjuntoDetalleFacturacion = this.createHasManyRepositoryFactoryFor('hasManyConjuntoDetalleFacturacion', detalleFacturacionRepositoryGetter,);
    this.registerInclusionResolver('hasManyConjuntoDetalleFacturacion', this.hasManyConjuntoDetalleFacturacion.inclusionResolver);
    this.hasManyConjuntoTorre = this.createHasManyRepositoryFactoryFor('hasManyConjuntoTorre', torreRepositoryGetter,);
    this.registerInclusionResolver('hasManyConjuntoTorre', this.hasManyConjuntoTorre.inclusionResolver);
    this.hasManyConjuntoUsuarios = this.createHasManyRepositoryFactoryFor('hasManyConjuntoUsuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('hasManyConjuntoUsuarios', this.hasManyConjuntoUsuarios.inclusionResolver);
  }
}

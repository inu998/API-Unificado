import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Conjunto, DetalleFacturacion} from '../models';
import {ConjuntoRepository} from './conjunto.repository';
import {DetalleFacturacionRepository} from './detalle-facturacion.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id_usuario,
  UsuariosRelations
> {

  public readonly UsuariosConjunto: HasManyRepositoryFactory<Conjunto, typeof Usuarios.prototype.Id_usuario>;

  public readonly hasOneUsuariosConjunto: HasOneRepositoryFactory<Conjunto, typeof Usuarios.prototype.Id_usuario>;

  public readonly hasManyUsuariosDetalleFacturacion: HasManyRepositoryFactory<DetalleFacturacion, typeof Usuarios.prototype.Id_usuario>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('DetalleFacturacionRepository') protected detalleFacturacionRepositoryGetter: Getter<DetalleFacturacionRepository>,
  ) {
    super(Usuarios, dataSource);
    this.hasManyUsuariosDetalleFacturacion = this.createHasManyRepositoryFactoryFor('hasManyUsuariosDetalleFacturacion', detalleFacturacionRepositoryGetter,);
    this.registerInclusionResolver('hasManyUsuariosDetalleFacturacion', this.hasManyUsuariosDetalleFacturacion.inclusionResolver);
    this.hasOneUsuariosConjunto = this.createHasOneRepositoryFactoryFor('hasOneUsuariosConjunto', conjuntoRepositoryGetter);
    this.registerInclusionResolver('hasOneUsuariosConjunto', this.hasOneUsuariosConjunto.inclusionResolver);
    this.UsuariosConjunto = this.createHasManyRepositoryFactoryFor('UsuariosConjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('UsuariosConjunto', this.UsuariosConjunto.inclusionResolver);
  }
}

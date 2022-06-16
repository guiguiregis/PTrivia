import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PoopTriviaDbDataSource, MysqlDataSource} from '../datasources';
import {Fiow, FiowRelations} from '../models';

export class FiowRepository extends DefaultCrudRepository<
  Fiow,
  typeof Fiow.prototype.id,
  FiowRelations
> {
  constructor(
    // @inject('datasources.poop_trivia_db') dataSource: PoopTriviaDbDataSource,
    @inject('datasources.mysql') dataSource: MysqlDataSource,

  ) {
    super(Fiow, dataSource);
  }
}

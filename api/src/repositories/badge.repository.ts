import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PoopTriviaDbDataSource, MysqlDataSource} from '../datasources';
import {Badge, BadgeRelations} from '../models';

export class BadgeRepository extends DefaultCrudRepository<
  Badge,
  typeof Badge.prototype.id,
  BadgeRelations
> {
  constructor(
    // @inject('datasources.poop_trivia_db') dataSource: PoopTriviaDbDataSource,
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Badge, dataSource);
  }
}

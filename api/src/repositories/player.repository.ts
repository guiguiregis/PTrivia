import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PoopTriviaDbDataSource, MysqlDataSource} from '../datasources';
import {Player, PlayerRelations, Badge} from '../models';
// import {BadgeRepository} from './badge.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {

  // public readonly badges: HasManyRepositoryFactory<Badge, typeof Player.prototype.id>;

  constructor(
    // @inject('datasources.poop_trivia_db') dataSource: PoopTriviaDbDataSource
    @inject('datasources.mysql') dataSource: MysqlDataSource ) {
    super(Player, dataSource);
    // this.badges = this.createHasManyRepositoryFactoryFor('badges', badgeRepositoryGetter,);
    // this.registerInclusionResolver('badges', this.badges.inclusionResolver);
  }
}

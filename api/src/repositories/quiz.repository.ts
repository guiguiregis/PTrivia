import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PoopTriviaDbDataSource, MysqlDataSource} from '../datasources';
import {Quiz, QuizRelations} from '../models';

export class QuizRepository extends DefaultCrudRepository<
  Quiz,
  typeof Quiz.prototype.id,
  QuizRelations
> {
  constructor(
    // @inject('datasources.poop_trivia_db') dataSource: PoopTriviaDbDataSource,
    @inject('datasources.mysql') dataSource: MysqlDataSource,

  ) {
    super(Quiz, dataSource);
  }
}

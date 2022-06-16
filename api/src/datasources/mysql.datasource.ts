import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysql',
  connector: 'mysql',
  url: 'mysql://utpc3he7leonza0b:Rgv413fLqMeNw4Xz9p9h@btxs9j3aykg5mhcwlld0-mysql.services.clever-cloud.com:3306/btxs9j3aykg5mhcwlld0',
  host: 'btxs9j3aykg5mhcwlld0-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'utpc3he7leonza0b',
  password: 'Rgv413fLqMeNw4Xz9p9h',
  database: 'btxs9j3aykg5mhcwlld0'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

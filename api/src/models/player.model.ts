import {Entity, model, property, hasMany} from '@loopback/repository';
import {Badge} from './badge.model';

@model({settings: {strict: false}})
export class Player extends Entity {
  @property({
    type: 'number',
    id: true,
    generated:true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  mail: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  job: string;

  @property({
    type: 'string',
  })
  created_at?: string;

  @property({
    type: 'string',
  })
  updated_at?: string;
 
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;

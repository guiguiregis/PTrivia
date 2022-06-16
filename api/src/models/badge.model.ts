import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Badge extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
  })
  playerId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Badge>) {
    super(data);
  }
}

export interface BadgeRelations {
  // describe navigational properties here
}

export type BadgeWithRelations = Badge & BadgeRelations;

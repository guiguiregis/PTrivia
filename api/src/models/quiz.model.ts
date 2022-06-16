import { generateUniqueId, uuid } from '@loopback/context';
import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Quiz extends Entity {
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
  questions: string;


  @property({
    type: 'string',
    required: true,
  })
  answers: string;

  @property({
    type: 'number',
    default: 0,
  })
  level?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  active?: boolean;

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

  constructor(data?: Partial<Quiz>) {
    super(data);
  }
}

export interface QuizRelations {
  // describe navigational properties here
}

export type QuizWithRelations = Quiz & QuizRelations;

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Fiow} from '../models';
import {FiowRepository} from '../repositories';

export class FiowController {
  constructor(
    @repository(FiowRepository)
    public fiowRepository : FiowRepository,
  ) {}

  @post('/fiows')
  @response(200, {
    description: 'Fiow model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fiow)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fiow, {
            title: 'NewFiow',
            exclude: ['id'],
          }),
        },
      },
    })
    fiow: Omit<Fiow, 'id'>,
  ): Promise<Fiow> {
    return this.fiowRepository.create(fiow);
  }

  @get('/fiows/count')
  @response(200, {
    description: 'Fiow model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fiow) where?: Where<Fiow>,
  ): Promise<Count> {
    return this.fiowRepository.count(where);
  }

  @get('/fiows')
  @response(200, {
    description: 'Array of Fiow model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fiow, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fiow) filter?: Filter<Fiow>,
  ): Promise<Fiow[]> {
    return this.fiowRepository.find(filter);
  }

  @patch('/fiows')
  @response(200, {
    description: 'Fiow PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fiow, {partial: true}),
        },
      },
    })
    fiow: Fiow,
    @param.where(Fiow) where?: Where<Fiow>,
  ): Promise<Count> {
    return this.fiowRepository.updateAll(fiow, where);
  }

  @get('/fiows/{id}')
  @response(200, {
    description: 'Fiow model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fiow, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fiow, {exclude: 'where'}) filter?: FilterExcludingWhere<Fiow>
  ): Promise<Fiow> {
    return this.fiowRepository.findById(id, filter);
  }

  @patch('/fiows/{id}')
  @response(204, {
    description: 'Fiow PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fiow, {partial: true}),
        },
      },
    })
    fiow: Fiow,
  ): Promise<void> {
    await this.fiowRepository.updateById(id, fiow);
  }

  @put('/fiows/{id}')
  @response(204, {
    description: 'Fiow PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fiow: Fiow,
  ): Promise<void> {
    await this.fiowRepository.replaceById(id, fiow);
  }

  @del('/fiows/{id}')
  @response(204, {
    description: 'Fiow DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fiowRepository.deleteById(id);
  }
}

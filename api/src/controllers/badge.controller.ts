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
import {Badge} from '../models';
import {BadgeRepository} from '../repositories';

export class BadgeController {
  constructor(
    @repository(BadgeRepository)
    public badgeRepository : BadgeRepository,
  ) {}

  @post('/badges')
  @response(200, {
    description: 'Badge model instance',
    content: {'application/json': {schema: getModelSchemaRef(Badge)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Badge, {
            title: 'NewBadge',
            exclude: ['id'],
          }),
        },
      },
    })
    badge: Omit<Badge, 'id'>,
  ): Promise<Badge> {
    return this.badgeRepository.create(badge);
  }

  @get('/badges/count')
  @response(200, {
    description: 'Badge model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Badge) where?: Where<Badge>,
  ): Promise<Count> {
    return this.badgeRepository.count(where);
  }

  @get('/badges')
  @response(200, {
    description: 'Array of Badge model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Badge, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Badge) filter?: Filter<Badge>,
  ): Promise<Badge[]> {
    return this.badgeRepository.find(filter);
  }

  @patch('/badges')
  @response(200, {
    description: 'Badge PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Badge, {partial: true}),
        },
      },
    })
    badge: Badge,
    @param.where(Badge) where?: Where<Badge>,
  ): Promise<Count> {
    return this.badgeRepository.updateAll(badge, where);
  }

  @get('/badges/{id}')
  @response(200, {
    description: 'Badge model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Badge, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Badge, {exclude: 'where'}) filter?: FilterExcludingWhere<Badge>
  ): Promise<Badge> {
    return this.badgeRepository.findById(id, filter);
  }

  @patch('/badges/{id}')
  @response(204, {
    description: 'Badge PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Badge, {partial: true}),
        },
      },
    })
    badge: Badge,
  ): Promise<void> {
    await this.badgeRepository.updateById(id, badge);
  }

  @put('/badges/{id}')
  @response(204, {
    description: 'Badge PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() badge: Badge,
  ): Promise<void> {
    await this.badgeRepository.replaceById(id, badge);
  }

  @del('/badges/{id}')
  @response(204, {
    description: 'Badge DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.badgeRepository.deleteById(id);
  }
}

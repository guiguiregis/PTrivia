// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
//   Player,
//   Badge,
// } from '../models';
// import {PlayerRepository} from '../repositories';

// export class PlayerBadgeController {
//   constructor(
//     @repository(PlayerRepository) protected playerRepository: PlayerRepository,
//   ) { }

//   @get('/players/{id}/badges', {
//     responses: {
//       '200': {
//         description: 'Array of Player has many Badge',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Badge)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<Badge>,
//   ): Promise<Badge[]> {
//     return this.playerRepository.badges(id).find(filter);
//   }

//   @post('/players/{id}/badges', {
//     responses: {
//       '200': {
//         description: 'Player model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Badge)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof Player.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Badge, {
//             title: 'NewBadgeInPlayer',
//             exclude: ['id'],
//             optional: ['playerId']
//           }),
//         },
//       },
//     }) badge: Omit<Badge, 'id'>,
//   ): Promise<Badge> {
//     return this.playerRepository.badges(id).create(badge);
//   }

//   @patch('/players/{id}/badges', {
//     responses: {
//       '200': {
//         description: 'Player.Badge PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Badge, {partial: true}),
//         },
//       },
//     })
//     badge: Partial<Badge>,
//     @param.query.object('where', getWhereSchemaFor(Badge)) where?: Where<Badge>,
//   ): Promise<Count> {
//     return this.playerRepository.badges(id).patch(badge, where);
//   }

//   @del('/players/{id}/badges', {
//     responses: {
//       '200': {
//         description: 'Player.Badge DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(Badge)) where?: Where<Badge>,
//   ): Promise<Count> {
//     return this.playerRepository.badges(id).delete(where);
//   }
// }

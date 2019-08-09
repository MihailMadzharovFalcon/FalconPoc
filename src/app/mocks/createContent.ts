import faker from 'faker';
import createUser from './createUser';
import { Content, User } from './types';

export default function createContent(
  user?: User,
  message?: string,
  isNew: boolean = false
): Content {
  return {
    id: faker.random.uuid(),
    isRead: faker.random.boolean(),
    isDm: faker.random.boolean(),
    message: message || faker.lorem.sentences(),
    network: faker.helpers.randomize(['facebook', 'twitter', 'instagram']),
    channel: faker.lorem.word(),
    sender: user || createUser(true),
    changedAt: isNew ? new Date().toISOString() : faker.date.recent(10)
  };
}

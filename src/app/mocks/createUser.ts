import faker from 'faker';
import { User } from './types';

export default function createUser(isFalconChannel = true): User {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    thumb: faker.image.avatar(),
    isFalconChannel
  };
}

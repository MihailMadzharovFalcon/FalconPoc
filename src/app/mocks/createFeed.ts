import faker from 'faker';
import { Content, Feed } from './types';

export default function createFeed(contents?: Content[]): Feed {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.word(),
    thumb: faker.image.avatar(),
    contents
  };
}

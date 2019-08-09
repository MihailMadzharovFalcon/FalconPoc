import faker from 'faker';
import createUser from './createUser';
import { ContentItem } from './types';
import createContent from './createContent';

const users = [createUser(true), createUser(false)];

export default function createContentItem(isDm: boolean = false, messageCount: number = 20): ContentItem {

  const contentItem: ContentItem = {
    ...createContent(),
    subitems: Array(messageCount).fill(0).map(() => ({
      ...createContent(isDm && users[faker.random.number(1)]),
      subitems: !isDm && Array(faker.random.number(30)).fill(0).map(() => createContent())
    })).sort((a, b) => {
      return new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime();
    })
  };
  return contentItem;
}

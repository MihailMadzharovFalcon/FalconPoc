import createContent from './createContent';
import createContentItem from './createContentItem';
import createFeed from './createFeed';
import { Content, ContentItem, Feed, User } from './types';

function timeout(ms, res): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(res);
    }, ms)
  );
}

export async function getFeed(itemCount = 20): Promise<Feed> {
  const feed = createFeed();
  const contents = Array(itemCount)
    .fill(0)
    .map(() => createContent())
    .sort((a, b) => {
      return new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime();
    });

  return await timeout(500, {
    ...feed,
    contents
  });
}

export async function getContentItem(
  isDm: boolean = false,
  messageCount: number = 20
): Promise<ContentItem> {
  return await timeout(500, createContentItem(isDm, messageCount));
}

export async function getFeeds(feedCount = 5): Promise<Feed[]> {
  return await timeout(
    500,
    Array(feedCount)
      .fill(0)
      .map(createFeed)
  );
}

export async function reply(user: User, message: string): Promise<Content> {
  const contentItem = createContent(user, message, true);
  return await timeout(500, contentItem);
}

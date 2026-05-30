import state from './state.js';
import { getFeed } from './api.js';
import { parseRSS } from './parser.js';

const UPDATE_INTERVAL = 5000;

export const watchFeeds = () => {
  const existingLinks = new Set(state.posts.map((post) => post.link));

  const promises = state.feeds.map((feed) =>
    getFeed(feed.url)
      .then(parseRSS)
      .then(({ posts }) => {
        const newPosts = posts.filter((post) => !existingLinks.has(post.link));

        const preparedNewPosts = newPosts.map((post) => ({
          ...post,
          id: crypto.randomUUID(),
          feedId: feed.id,
        }));

        state.posts.push(...preparedNewPosts);
      })
      .catch((err) => console.error('Feed update failed:', err))
  );

  Promise.all(promises).finally(() => setTimeout(watchFeeds, UPDATE_INTERVAL));
};

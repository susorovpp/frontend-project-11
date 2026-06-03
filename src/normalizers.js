import uniqueId from 'lodash.uniqueid';

export const normalizeRSSData = ({ feed, posts, url }) => {
  const feedId = uniqueId();

  return {
    feed: {
      ...feed,
      id: feedId,
      url,
    },
    posts: posts.map((post) => ({
      ...post,
      id: uniqueId(),
      feedId,
    })),
  };
};

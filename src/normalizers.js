export const normalizeRSSData = ({ feed, posts, url }) => {
  const feedId = crypto.randomUUID();

  return {
    feed: {
      ...feed,
      id: feedId,
      url,
    },
    posts: posts.map((post) => ({
      ...post,
      id: crypto.randomUUID(),
      feedId,
    })),
  };
};

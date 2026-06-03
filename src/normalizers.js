export const normalizeRSSData = ({ feed, posts, url }) => {
  console.log('crypto', crypto);

  console.log('randomUUID', crypto.randomUUID);
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

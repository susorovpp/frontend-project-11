export const parseRSS = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  const parseError = doc.querySelector('parsererror');

  if (parseError) {
    throw new Error('errors.invalidRss');
  }

  const channel = doc.querySelector('channel');

  if (!channel) {
    throw new Error('errors.invalidRss');
  }

  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;

  if (!title || !description) {
    throw new Error('errors.invalidRss');
  }

  const items = Array.from(doc.querySelectorAll('item'));

  const posts = items.map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));

  return {
    feed: {
      title,
      description,
    },
    posts,
  };
};

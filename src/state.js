import { proxy } from 'valtio/vanilla';

const state = proxy({
  form: {
    status: 'idle',
    error: '',
  },
  urls: [],
  feeds: [],
  posts: [],
  ui: {
    viewedPostsIds: [],
  },
});

export default state;

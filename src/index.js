import 'bootstrap/dist/css/bootstrap.min.css';
import { formEl, initView, postsEl, resetForm } from './view/index.js';
import state from './state.js';
import initI18n from './i18n.js';
import { getFeed } from './api.js';
import { parseRSS } from './parser.js';
import { makeSchema } from './validation.js';
import { normalizeRSSData } from './normalizers.js';
import { watchFeeds } from './update.js';

initI18n().then((i18n) => {
  initView(i18n);

  watchFeeds();

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = data.get('url').trim();

    const schema = makeSchema(state.urls);

    schema
      .validate(url)
      .then(() => {
        state.form.status = 'sending';

        return getFeed(url);
      })
      .then(parseRSS)
      .then((rssData) => {
        const { feed, posts } = normalizeRSSData({ ...rssData, url });

        state.urls.push(url);
        state.feeds.push(feed);
        state.posts.push(...posts);

        state.form.error = '';
        state.form.status = 'valid';
        resetForm();
      })
      .catch((err) => {
        if (err.message.startsWith('errors.')) {
          state.form.error = err.message;
        } else {
          state.form.error = 'errors.network';
        }

        state.form.status = 'invalid';
      });
  });

  postsEl.addEventListener('click', (e) => {
    const button = e.target.closest('[data-post-id]');

    if (!button) {
      return;
    }

    const postId = button.dataset.postId;

    state.ui.currentPostId = postId;

    if (!state.ui.viewedPostsIds.includes(postId)) {
      state.ui.viewedPostsIds.push(postId);
    }
  });
});

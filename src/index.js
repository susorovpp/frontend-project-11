import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { formEl, initView, resetForm } from './view/index.js';
import state from './state.js';
import initI18n from './i18n.js';
import { getFeed } from './api.js';
import { parseRSS } from './parser.js';

initI18n().then((i18n) => {
  initView(i18n);

  yup.setLocale({
    mixed: {
      required: 'errors.required',
      notOneOf: 'errors.duplicate',
    },
    string: {
      url: 'errors.invalidUrl',
    },
  });

  const makeSchema = (existingUrls) =>
    yup.string().required().url().notOneOf(existingUrls);

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
      .then((rssData) => {
        const { feed, posts } = parseRSS(rssData);

        const feedId = crypto.randomUUID();
        const preparedFeed = {
          ...feed,
          id: feedId,
        };

        const preparedPosts = posts.map((post) => ({
          ...post,
          id: crypto.randomUUID(),
          feedId,
        }));

        state.urls.push(url);
        state.feeds.push(preparedFeed);
        state.posts.push(...preparedPosts);

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
});

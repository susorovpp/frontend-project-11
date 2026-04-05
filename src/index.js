import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { formEl, initView, resetForm } from './view.js';
import state from './state.js';
import initI18n from './i18n.js';

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
        state.urls.push(url);
        state.form.error = '';
        state.form.status = 'valid';
        resetForm();
      })
      .catch((err) => {
        state.form.error = err.message;
        state.form.status = 'invalid';
      });
  });
});

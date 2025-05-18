import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { formEl, watchedState } from './view.js';

const makeSchema = (existingUrls) =>
  yup
    .string()
    .required()
    .url()
    .notOneOf([...existingUrls]);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const url = data.get('url');

  const schema = makeSchema(watchedState);

  schema
    .validate(url)
    .then(() => {
      watchedState.urls.push(url);
      watchedState.form.status = 'valid';
    })
    .catch(() => {
      watchedState.form.status = 'invalid';
    });
});

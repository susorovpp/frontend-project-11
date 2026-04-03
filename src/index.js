import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { formEl, resetForm } from './view.js';
import state from './state.js';

const makeSchema = (existingUrls) =>
  yup
    .string()
    .required('Не должно быть пустым')
    .url('Ссылка должна быть валидным URL')
    .notOneOf(existingUrls, 'RSS уже существует');

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

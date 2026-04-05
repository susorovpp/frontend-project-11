import state from './state.js';
import { subscribe } from 'valtio/vanilla';

export const formEl = document.querySelector('form');
export const inputEl = document.querySelector('input');
export const feedbackEl = document.querySelector('.feedback');

let i18nInstance;

export const initView = (i18n) => {
  i18nInstance = i18n;
};

export const resetForm = () => {
  formEl.reset();
  inputEl.focus();
};

const render = () => {
  const { status, error } = state.form;

  if (status === 'idle') {
    inputEl.classList.remove('is-invalid', 'is-valid');
    feedbackEl.textContent = '';
    feedbackEl.classList.remove('text-danger', 'text-success');
    return;
  }

  if (status === 'invalid') {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');

    feedbackEl.textContent = i18nInstance.t(error);
    feedbackEl.classList.remove('text-success');
    feedbackEl.classList.add('text-danger');
    return;
  }

  if (status === 'valid') {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');

    feedbackEl.textContent = i18nInstance.t('success');
    feedbackEl.classList.remove('text-danger');
    feedbackEl.classList.add('text-success');

    formEl.reset();
    inputEl.focus();
  }
};

subscribe(state, render);

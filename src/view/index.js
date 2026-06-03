import state from '../state.js';
import { subscribe } from 'valtio/vanilla';
import { renderForm } from './renderForm.js';
import { renderFeeds } from './renderFeeds.js';
import { renderPosts } from './renderPosts.js';

export const formEl = document.querySelector('form');
export const inputEl = document.querySelector('input');
export const feedbackEl = document.querySelector('.feedback');
const submitButtonEl = document.querySelector('button[type="submit"]');
export const feedsEl = document.querySelector('.feeds');
export const postsEl = document.querySelector('.posts');

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

  renderForm({
    status,
    error,
    i18n: i18nInstance,
    inputEl,
    feedbackEl,
    submitButtonEl,
  });

  renderFeeds({ feeds: state.feeds, container: feedsEl });

  renderPosts({
    posts: state.posts,
    viewedPostsIds: state.ui.viewedPostsIds,
    container: postsEl,
  });
};

subscribe(state, render);

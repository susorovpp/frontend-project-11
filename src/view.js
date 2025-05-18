import onChange from 'on-change';

export const formEl = document.querySelector('form');
export const inputEl = document.querySelector('input');

export const showError = (inputEl) => {
  inputEl.classList.add('is-invalid');
};

export const clearError = (inputEl) => {
  inputEl.classList.remove('is-invalid');
  inputEl.classList.add('is-valid');
};

export const resetForm = (formEl, inputEl) => {
  formEl.reset();
  inputEl.classList.remove('is-valid', 'is-invalid');
  inputEl.focus();
};

const state = {
  form: { status: 'idle' },
  urls: [],
};

export const watchedState = onChange(state, (path, value) => {
  if (path === 'form.status') {
    if (value === 'valid') {
      clearError(inputEl);
      resetForm(formEl, inputEl);
    }

    if (value === 'invalid') {
      showError(inputEl);
    }
  }
});

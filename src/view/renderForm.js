export const renderForm = ({
  status,
  error,
  i18n,
  inputEl,
  feedbackEl,
  submitButtonEl,
}) => {
  const isSending = status === 'sending';

  submitButtonEl.disabled = isSending;
  inputEl.disabled = isSending;

  submitButtonEl.textContent = isSending ? 'Загрузка...' : 'Добавить';

  if (status === 'idle') {
    inputEl.classList.remove('is-invalid', 'is-valid');
    feedbackEl.textContent = '';
    feedbackEl.classList.remove('text-danger', 'text-success');
    return;
  }

  if (status === 'invalid') {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');

    feedbackEl.textContent = i18n.t(error);
    feedbackEl.classList.remove('text-success');
    feedbackEl.classList.add('text-danger');
    return;
  }

  if (status === 'valid') {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');

    feedbackEl.textContent = i18n.t('success');
    feedbackEl.classList.remove('text-danger');
    feedbackEl.classList.add('text-success');
  }
};

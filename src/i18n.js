import i18next from 'i18next';

const resources = {
  ru: {
    translation: {
      errors: {
        required: 'Не должно быть пустым',
        invalidUrl: 'Ссылка должна быть валидным URL',
        duplicate: 'RSS уже существует',
        invalidRss: 'Ресурс не содержит валидный RSS',
        network: 'Ошибка сети',
      },
      success: 'RSS успешно загружен',
    },
  },
  en: {
    translation: {
      errors: {
        required: 'Must not be empty',
        invalidUrl: 'Must be a valid URL',
        duplicate: 'RSS already exists',
        invalidRss: 'The resource does not contain a valid RSS feed',
        network: 'Network error',
      },
      success: 'RSS has been loaded',
    },
  },
};

const initI18n = () =>
  i18next
    .init({
      lng: 'ru',
      debug: false,
      resources,
    })
    .then(() => i18next);

export default initI18n;

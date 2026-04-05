import i18next from 'i18next';

const resources = {
  ru: {
    translation: {
      errors: {
        required: 'Не должно быть пустым',
        invalidUrl: 'Ссылка должна быть валидным URL',
        duplicate: 'RSS уже существует',
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

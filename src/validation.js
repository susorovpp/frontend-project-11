import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.duplicate',
  },
  string: {
    url: 'errors.invalidUrl',
  },
});

export const makeSchema = (existingUrls) =>
  yup.string().required().url().notOneOf(existingUrls);

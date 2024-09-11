import * as yup from 'yup';

import { ERROR_MESSAGES } from './error-messages';

export const basicSignupValidationSchema = yup.object({
  email: yup
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  password: yup
    .string()
    .max(30, ERROR_MESSAGES.PASSWORD_TOO_LONG)
    .min(10, ERROR_MESSAGES.PASSWORD_TOO_SHORT),
});
export const basicLoginValidationSchema = yup
  .object({
    email: yup.string().email(ERROR_MESSAGES.INVALID_EMAIL),
    password: yup.string(),
  })
  .required();
export const basicTokenValidationSchema = yup
  .object({
    id: yup.string(),
    githubToken: yup.string(),
  })
  .required();

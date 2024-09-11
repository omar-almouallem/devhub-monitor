import { ValidationError } from 'yup';

export const handelYupErrors = (
  error: Error | ValidationError,
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (error instanceof ValidationError) {
    error.inner.forEach((err) => {
      console.error(err.message);
      errors[err.path!] = err.message;
    });
  } else {
    console.error(error.message);
  }

  return errors;
};

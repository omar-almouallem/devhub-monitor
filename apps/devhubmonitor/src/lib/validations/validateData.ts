import {
  basicLoginValidationSchema,
  basicSignupValidationSchema,
  basicTokenValidationSchema,
} from '@dev-hub-monitor/validation';

export const validateSignupData = async (req, res, next) => {
  try {
    await basicSignupValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return res.status(400).json({ errors });
  }
};

export const validateLoginData = async (req, res, next) => {
  try {
    await basicLoginValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => err.message);
    return res.status(400).json({ errors });
  }
};
export const validateToken = async (req, res, next) => {
  try {
    await basicTokenValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => err.message);
    return res.status(400).json({ errors });
  }
};

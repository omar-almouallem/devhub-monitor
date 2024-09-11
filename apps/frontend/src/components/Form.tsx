import React from 'react';
import { useFormik } from 'formik';
import { Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { basicLoginValidationSchema, basicSignupValidationSchema } from '@dev-hub-monitor/validation';

import { useAuth } from '../context/AuthContext';
import { BasicLogin, BasicSignup } from '../services/auth.service';

import Button from './Button';
import CustomTypography from './Typography';

interface DynamicFormProps
{
  formType: 'signup' | 'login';
}

const AuthForm: React.FC<DynamicFormProps> = ({ formType }) =>
{

  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = formType === 'signup' ? basicSignupValidationSchema : basicLoginValidationSchema;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) =>
    {
      try {
        if (formType === 'signup') {
          const signupResponse = await BasicSignup(values);
          console.log(signupResponse);
          if (signupResponse.status === 200) {
            navigate('/auth/login');
            toast.success('Registration successful! You can now log in.');
          } else {
            toast.error('Registration failed. Please try again.');
          }

        } else {
          const loginResponse = await BasicLogin(values);
          const token = loginResponse.data.accessToken;
          if (token) {
            login();
            localStorage.setItem('AccessToken', token);
            toast.success('Login successful!');
            navigate('/dashboard');
          } else {
            toast.error('Login failed. Please try again.');
          }
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error);
          const errorMessage = error.response.data.message;
          formik.setErrors({ email: errorMessage });
        }
      }
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validate: (values) =>
    {
      const errors: Record<string, string> = {};
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        if (formType === 'signup' && values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      } catch (error: any) {
        return error;
      }
    },
  });



  return (
    <Form onFinish={formik.submitForm}>
      <Form.Item
        name="email"
        validateStatus={formik.errors.email ? 'error' : ''}
        help={<CustomTypography type="text" text={formik.errors.email || ''} />}
      >
        <Input type="email" placeholder="Email" size="large" required {...formik.getFieldProps('email')} />
      </Form.Item>
      <Form.Item
        name="password"
        validateStatus={formik.errors.password ? 'error' : ''}
        help={<CustomTypography type="text" text={formik.errors.password || ''} />}
      >
        <Input.Password
          type="password"
          placeholder="Password"
          size="large"
          required
          {...formik.getFieldProps('password')}
        />
      </Form.Item>
      {formType === 'signup' && (
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          validateStatus={formik.errors.confirmPassword ? 'error' : ''}
          help={<CustomTypography type="text" text={formik.errors.confirmPassword || ''} />}
        >
          <Input.Password
            type="password"
            required
            placeholder="Confirm Password"
            size="large"
            {...formik.getFieldProps('confirmPassword')}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button text={formType === 'signup' ? 'Sign Up' : 'Login'} />
      </Form.Item>
    </Form>
  );
};

export default AuthForm;

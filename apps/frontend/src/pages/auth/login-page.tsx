import { Col, Row } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';

import { CustomTypography, AuthForm } from '../../components';
import * as styles from '../../styles/login-page.style';
import AuthLayout from '../../layouts/auth-layout';

const Login = () =>
{

  return (
    <AuthLayout>
      <Row justify='center' align='middle' css={styles.rowStyles}>
        <Col css={styles.formStyles}>
          <CustomTypography type='title' text='Login' />
          <AuthForm formType='login' />
          <CustomTypography
            type='text'
            text='You don`t have an account? Create an account'
            link='/auth/signup'
            linkText='signup'
          />
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default () =>
{
  return (
    <ProConfigProvider dark>
      <Login />
    </ProConfigProvider>
  );
};

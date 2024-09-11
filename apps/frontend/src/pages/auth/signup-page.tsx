import { Row, Col } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';

import { AuthForm, CustomTypography } from '../../components';
import * as styles from '../../styles/signup-page.stye';
import AuthLayout from '../../layouts/auth-layout';

const Signup = () => {
  return (
    <AuthLayout>
      <Row justify='center' align='middle' css={styles.rowStyles}>
        <Col css={styles.formStyles}>
          <CustomTypography type='title' text='Sign Up' />
          <AuthForm formType='signup' />
          <CustomTypography
            type='text'
            text='Already have an Account?'
            link='/auth/login'
            linkText='Login'
          />
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Signup />
    </ProConfigProvider>
  );
};

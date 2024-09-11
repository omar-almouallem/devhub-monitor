import React from 'react';
import { Button, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import * as styles from '../styles/auth-layout.style';

interface AuthLayoutProps
{
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) =>
{
  return (
    <div>
      <div
        css={styles.backgroundStyle}
      >
        <div css={styles.container}>
          <Typography.Title css={styles.titleStyles} level={2}>
            Devhub Monitor{' '}
          </Typography.Title>
          {children}
          <div style={{ textAlign: 'center' }}>
            <Button
              type='primary'
              style={{ background: '#333', borderColor: '#333' }}
              icon={<GithubOutlined />}
            ></Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

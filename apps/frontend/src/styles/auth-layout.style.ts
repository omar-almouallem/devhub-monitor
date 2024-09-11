import { css } from '@emotion/react';

export const videoStyles = css`
  object-fit: cover;
  width: 100%;
  height: 100vh;
  position: fixed;
`;

export const backgroundStyle = css`
  height: 100vh;
  background-image: url('../../public/8-learn-continuous-integration-with-github-actions-social.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const container = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 50px;
  width: 40%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
`;

export const titleStyles = css`
  text-align: center;
  color: white;
  font-size: 25px;
`;

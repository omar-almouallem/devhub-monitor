/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const layoutStyle = css`
  background: #e0f2f1;
  min-height: 100vh;
`;

export const headerStyle = css`
  background: #001529;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const headerTitleStyle = css`
  color: #fff;
  text-align: center;
`;

export const contentStyle = css`
  padding: 50px 24px;
`;

export const containerStyle = css`
  background: #fff;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const inputStyle = css`
  border-radius: 8px;
  border-color: #001529;
  padding: 10px;
`;

export const buttonStyle = css`
  width: 100%;
  background-color: #001529;
  border-color: #001529;
  border-radius: 8px;
`;

export const cardStyle = css`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const carouselItemContainer = css`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export const carouselImage = css`
  max-width: 100%;
  max-height: 95%;
  border-radius: 12px;
  object-fit: cover;
`;

export const carouselText = css`
  display: block;
  text-align: center;
  margin-top: 12px;
  font-weight: bold;
`;

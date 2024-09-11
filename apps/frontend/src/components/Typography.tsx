import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

interface CustomTypographyProps {
  text: string;
  type: 'text' | 'title';
  link?: string;
  linkText?: string;
  css?: any;
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  type,
  text,
  link,
  linkText,
  css,
}) => {
  if (type === 'text') {
    return (
      <Typography.Text>
        {text} {link && <Link to={link}>{linkText}</Link>}
        {css}
      </Typography.Text>
    );
  } else if (type === 'title') {
    return (
      <Typography.Title level={3}>
        {text} {css}
      </Typography.Title>
    );
  }

  return;
};

export default CustomTypography;

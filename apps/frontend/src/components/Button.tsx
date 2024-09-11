import React from 'react';
import { Button as AntdButton } from 'antd';

interface CustomButtonProps
{
  text: string | any;
}

const Button: React.FC<CustomButtonProps> = ({ text }) =>
{
  return (
    <AntdButton block size='large' type='primary' htmlType='submit'>
      {text}
    </AntdButton>
  );
};

export default Button;

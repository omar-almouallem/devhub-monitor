import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Routes from './routes/routes';
import { AuthProvider } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';

export function App ()
{
  return (

    <StrictMode>
      <AuthProvider>
        <UserDataProvider>
          <ConfigProvider theme={{
            token: {
              fontFamily: "PT Serif, serif"
            }
          }}>
            <Routes />
            <ToastContainer
              position='top-center'
              theme='light'
            />

          </ConfigProvider>
        </UserDataProvider>
      </AuthProvider>
    </StrictMode >
  );
}

export default App;

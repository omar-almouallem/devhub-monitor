import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Routes from './routes/routes';
import { AuthProvider } from './context/AuthContext';
import { GitHubTokenProvider } from './context/GitHubTokenStatusContext';
import { ListOfReposNamesProvider } from './context/ReposNamesContext';

export function App ()
{
  return (

    <StrictMode>
      <AuthProvider>
        <GitHubTokenProvider>
          <ListOfReposNamesProvider>
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
          </ListOfReposNamesProvider>
        </GitHubTokenProvider>
      </AuthProvider>
    </StrictMode >
  );
}

export default App;

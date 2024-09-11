import { Col, Row } from 'antd';
import { Navigate } from 'react-router-dom';
import { ProConfigProvider } from '@ant-design/pro-components';


import HomeLayout from '../layouts/home-layout';
import AppView from "../components/DashboardContent";
import { useAuth } from '../context/AuthContext';

const Dashboard = () =>
{
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return (
        <HomeLayout>
            < AppView />
        </HomeLayout>
    );
};

export default () =>
{
    return (
        <ProConfigProvider >
            <Dashboard />
        </ProConfigProvider>
    );
};

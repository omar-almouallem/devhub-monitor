import React from 'react';
import { Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GitHubTokenPrompt from './GitHubTokenPrompt';

import { useRepositoriesData } from '../hooks/ui/useRepositoriesData';
const { Title } = Typography;

const Dashboard: React.FC = () =>
{
    const navigate = useNavigate();
    const { userData, loading } = useRepositoriesData();

    if (loading) {
        return <Spin size="large" />;
    }

    if (!userData) {
        return <Spin size="large" />;
    }

    if (!userData.githubToken) {
        return <GitHubTokenPrompt handleInsertTokenClick={() => navigate('/InsertToken')} />;
    }

    return (
        <div style={{ padding: '20px' }}>
            {userData.isVerified === false && (
                <div style={{ marginBottom: '20px', color: 'red' }}>
                    Invalid Token, You should insert a new token!
                </div>
            )}
            <Title level={3}>Repository Analysis</Title>
        </div>
    );
};

export default Dashboard;

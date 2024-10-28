import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GitHubTokenPrompt from './GitHubTokenPrompt';

import { useGitHubTokenStatus } from '../context/GitHubTokenStatusContext';

const { Title } = Typography;

const Dashboard: React.FC = () =>
{
    const { gitHubTokenStatus } = useGitHubTokenStatus();
    const navigate = useNavigate();

    if (!gitHubTokenStatus?.githubToken) {
        return <GitHubTokenPrompt handleInsertTokenClick={() => navigate('/InsertToken')} />;
    }

    return (
        <div style={{ padding: '20px' }}>
            {gitHubTokenStatus?.isVerified === false && (
                <div style={{ marginBottom: '20px', color: 'red' }}>
                    Invalid Token, You should insert a new token!
                </div>
            )}
            <Title level={3}>Repository Analysis</Title>
        </div>
    );
};

export default Dashboard;

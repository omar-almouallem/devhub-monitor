import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';

import { useGitHubTokenStatus } from '../context/GitHubTokenStatusContext';

const { Title, Text } = Typography;

const CustomCard = ({ title, gitHubToken, tokenStatus, titleColor }: { title: string; gitHubToken: string; tokenStatus: string; titleColor: string; }) =>
{
    return (
        <Row justify="center" align="middle" style={{ height: 'auto', paddingTop: "20px" }}>
            <Col xs={20} sm={8} md={16} lg={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card hoverable style={{ width: '100%' }}>
                        <Title level={4} style={{ color: titleColor }}>{title}</Title>
                        {gitHubToken && (
                            <Text style={{ color: 'gray' }}>Your GitHub token: {gitHubToken}</Text>
                        )}
                        <br />
                        <Text style={{ color: titleColor }}>{tokenStatus}</Text>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const TokenStatus = () =>
{

    const { gitHubTokenStatus } = useGitHubTokenStatus();
    if (gitHubTokenStatus?.githubToken && gitHubTokenStatus.isVerified === true) {
        return (
            <CustomCard
                title="✅ Token Verified"
                gitHubToken={gitHubTokenStatus.githubToken}
                tokenStatus="Your GitHub token is verified and active."
                titleColor="green"
            />
        );
    }

    if (gitHubTokenStatus?.githubToken && gitHubTokenStatus.isVerified === false) {
        return (
            <CustomCard
                title="⚠️ Token Not Verified"
                gitHubToken={gitHubTokenStatus?.githubToken}
                tokenStatus="Your GitHub token is added but not verified yet."
                titleColor="orange"
            />
        );
    }

    if (!gitHubTokenStatus?.githubToken) {
        return (
            <CustomCard
                title="❌ No Token Added"
                gitHubToken=""
                tokenStatus="You have not added a GitHub token yet."
                titleColor="#f03a17"
            />
        );
    }

    return null; // If no matching case, return null
};

export default TokenStatus;

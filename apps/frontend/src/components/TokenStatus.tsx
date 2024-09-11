import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { useUserData } from '../context/UserDataContext';
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
    const { userData } = useUserData();

    if (userData.githubToken && userData.isVerified === true) {
        return (
            <CustomCard
                title="✅ Token Verified"
                gitHubToken={userData.githubToken}
                tokenStatus="Your GitHub token is verified and active."
                titleColor="green"
            />
        );
    }

    if (userData.githubToken && userData.isVerified === false) {
        return (
            <CustomCard
                title="⚠️ Token Not Verified"
                gitHubToken={userData.githubToken}
                tokenStatus="Your GitHub token is added but not verified yet."
                titleColor="orange"
            />
        );
    }

    if (!userData.githubToken) {
        return (
            <CustomCard
                title="❌ No Token Added"
                gitHubToken=""
                tokenStatus="You have not added a GitHub token yet."
                titleColor="#f03a17"
            />
        );
    }

};

export default TokenStatus;

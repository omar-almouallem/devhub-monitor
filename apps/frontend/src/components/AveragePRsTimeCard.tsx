import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface AveragePullRequestTimeCardProps
{
    averageTime: number;
    titleText?: string;
}

const AveragePRsTimeCard: React.FC<AveragePullRequestTimeCardProps> = ({
    averageTime,
    titleText
}) =>
{
    return (
        <Card style={{ margin: '40px 0px', backgroundColor: '#f0f8f5', borderColor: '#a3d3bf' }}>
            <Title level={4} style={{ color: '#1d4e89' }}>{titleText}:</Title>
            <Text strong style={{ fontSize: '1.2em', color: '#28a745' }}>
                {averageTime} hours
            </Text>
        </Card>
    );
};

export default AveragePRsTimeCard;

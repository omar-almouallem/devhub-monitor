import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface AveragePullRequestTimeCardProps
{
    avgHours: number;
    avgMinutes: number;
    titleText?: string;
}

const AveragePRsTimeCard: React.FC<AveragePullRequestTimeCardProps> = ({
    avgHours,
    avgMinutes,
    titleText,
}) =>
{
    return (
        <Card style={{ margin: '40px 0px', backgroundColor: '#f0f8f5', borderColor: '#a3d3bf' }}>
            <Title level={4} style={{ color: '#1d4e89' }}>{titleText}:</Title>
            <Text strong style={{ fontSize: '1.2em', color: '#28a745' }}>
                {avgHours} hours /
                {avgMinutes} minutes
            </Text>
        </Card>
    );
};

export default AveragePRsTimeCard;

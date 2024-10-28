import React from 'react';
import { Card, Typography, Space, Tooltip } from 'antd';
import { StarOutlined, ClockCircleOutlined, CodeOutlined, BranchesOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface CardComponentProps
{
    dataItem: any;
    onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ dataItem, onClick }) =>
{
    return (
        <Card
            title={dataItem.name}
            style={{
                width: '100%',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #e0f7fa 30%, #e0ffe7 100%)',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            headStyle={{ backgroundColor: '#1890ff', color: 'white', borderRadius: '8px 8px 0 0' }}
            onClick={onClick}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#096dd9' }}>{dataItem.full_name}</Title>
                <Tooltip title="Number of stars">
                    <Text>
                        <StarOutlined style={{ color: '#ffbf00' }} /> {dataItem.stars} Stars
                    </Text>
                </Tooltip>
                <Tooltip title="Creation date">
                    <Text>
                        <ClockCircleOutlined style={{ color: '#52c41a' }} /> Created on: {new Date(dataItem.created_at).toLocaleDateString('en-GB')}
                    </Text>
                </Tooltip>
                <Tooltip title="Last updated date">
                    <Text>
                        <ClockCircleOutlined style={{ color: '#52c41a' }} /> Last Updated: {new Date(dataItem.updated_at).toLocaleDateString('en-GB')}
                    </Text>
                </Tooltip>
                <Tooltip title="Repository Language">
                    <Text>
                        <CodeOutlined style={{ color: '#13c2c2' }} /> Language: {dataItem.language || 'N/A'}
                    </Text>
                </Tooltip>
                <Tooltip title="View pull requests">
                    <Text>
                        <BranchesOutlined style={{ color: '#1890ff' }} /> Click to view pull requests
                    </Text>
                </Tooltip>
            </Space>
        </Card>
    );
};

export default CardComponent;

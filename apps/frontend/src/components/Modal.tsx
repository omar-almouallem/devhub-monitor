import React from 'react';
import { Modal, List, Tag, Typography, Button } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ModalComponentProps
{
    selectedRepo: any;
    isVisible: boolean;
    onClose: () => void;
    fetchMorePulls: () => void;
    hasMore: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ selectedRepo, isVisible, onClose, fetchMorePulls, hasMore }) =>
{
    return (
        <Modal
            title={selectedRepo?.full_name}
            visible={isVisible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            {selectedRepo && selectedRepo.pullRequests && selectedRepo.pullRequests.length > 0 ? (
                <>
                    <List
                        itemLayout="vertical"
                        dataSource={selectedRepo.pullRequests}
                        renderItem={(pr: any) => (
                            <List.Item key={pr.id}>
                                <List.Item.Meta
                                    title={pr.title}
                                    description={(
                                        <>
                                            <Tag color={pr.state === 'open' ? 'blue' : pr.state === 'closed' ? 'red' : 'green'}>
                                                {pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}
                                            </Tag>
                                            <br />
                                            <Text type="secondary">
                                                Created at: {new Date(pr.created_at).toLocaleDateString('en-GB')}
                                            </Text>
                                            <br />
                                            <Text type="secondary">
                                                Closed at: {new Date(pr.closed_at).toLocaleDateString('en-GB')}
                                            </Text>
                                            <br />
                                            <Text type="secondary">
                                                User: <UserOutlined /> {pr.user.login}
                                            </Text>
                                            {pr.state !== 'open' && (
                                                <>
                                                    <br />
                                                    <Text type="secondary">
                                                        Duration: {pr.duration.hours}h {pr.duration.minutes}m
                                                    </Text>
                                                </>
                                            )}
                                        </>
                                    )}
                                />
                            </List.Item>
                        )}
                    />
                    {/* زر تحميل المزيد */}
                    {hasMore && (
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Button
                                type="text"
                                onClick={fetchMorePulls}
                                icon={<DownOutlined />}
                            >
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <Text>No pull requests available</Text>
            )}
        </Modal>
    );
};

export default ModalComponent;

import React from 'react';
import { Card, Typography, Space, Input, Modal, List, Tag, Col, Row, Tooltip } from 'antd';
import { SearchOutlined, StarOutlined, ClockCircleOutlined, UserOutlined, CodeOutlined, BranchesOutlined } from '@ant-design/icons';

import { useUserData } from '../context/UserDataContext';
import useRepositoryTable from '../hooks/ui/useRepositoryTable';
import { Repository, PullRequest } from '../types/types';

const { Text, Title } = Typography;

const RepositoriesTable: React.FC = () =>
{
    const { userData } = useUserData();
    const {
        isModalVisible,
        selectedRepo,
        filteredData,
        handleSearch,
        handleCardClick,
        handleModalClose,
    } = useRepositoryTable(userData?.gitHubRepoData || []);

    return (
        <>
            <Input
                placeholder="Search Repositories"
                prefix={<SearchOutlined />}
                onChange={handleSearch}
                style={{ marginBottom: 20 }}
            />

            <Row gutter={[16, 16]}>
                {filteredData.map((repo: Repository) => (
                    <Col key={repo.id} xs={24} sm={12} md={8} lg={8}>
                        <Card
                            title={repo.name}
                            style={{
                                width: '100%',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, #e0f7fa 30%, #e0ffe7 100%)',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                            headStyle={{ backgroundColor: '#1890ff', color: 'white', borderRadius: '8px 8px 0 0' }}
                            onClick={() => handleCardClick(repo)}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Title level={5} style={{ color: '#096dd9' }}>{repo.name}</Title>
                                <Tooltip title="Number of stars">
                                    <Text>
                                        <StarOutlined style={{ color: '#ffbf00' }} /> {repo.stars} Stars
                                    </Text>
                                </Tooltip>
                                <Tooltip title="Creation date">
                                    <Text>
                                        <ClockCircleOutlined style={{ color: '#52c41a' }} /> Created on: {new Date(repo.created_at).toLocaleDateString()}
                                    </Text>
                                </Tooltip>
                                <Tooltip title="Last updated date">
                                    <Text>
                                        <ClockCircleOutlined style={{ color: '#52c41a' }} /> Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
                                    </Text>
                                </Tooltip>
                                <Tooltip title="Number of pull requests">
                                    <Text>
                                        <BranchesOutlined style={{ color: '#1890ff' }} /> Pull Requests: {repo.pull_requests.length}
                                    </Text>
                                </Tooltip>
                                <Tooltip title="Repository Language">
                                    <Text>
                                        <CodeOutlined style={{ color: '#13c2c2' }} /> Language: {repo.language || 'N/A'}
                                    </Text>
                                </Tooltip>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title={selectedRepo?.name}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={800}
            >
                {selectedRepo ? (
                    selectedRepo.pull_requests.length > 0 ? (
                        <List
                            itemLayout="vertical"
                            dataSource={selectedRepo.pull_requests}
                            renderItem={(pr: PullRequest) => (
                                <List.Item key={pr.id}>
                                    <List.Item.Meta
                                        title={pr.title}
                                        description={
                                            <>
                                                <Tag color={pr.state === 'open' ? 'blue' : pr.state === 'closed' ? 'red' : 'green'}>
                                                    {pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}
                                                </Tag>
                                                <Text type="secondary">
                                                    Created at: {new Date(pr.created_at).toLocaleDateString()}
                                                </Text>
                                                <br />
                                                <Text type="secondary">
                                                    User: <UserOutlined /> {pr.user.login}
                                                </Text>
                                                <br />
                                                <Text type="secondary">
                                                    Language: {selectedRepo.language || 'N/A'}
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
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Text>No pull requests available</Text>
                    )
                ) : null}
            </Modal>
        </>
    );
};

export default RepositoriesTable;

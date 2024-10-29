import React, { useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useRepositoriesAPI } from '../hooks/api/useFetchRepos';
import { useRepositoriesUI } from '../hooks/ui/useRepositoriesUI';
import CardComponent from '../components/Card';
import ModalComponent from '../components/Modal';

const RepositoriesTable: React.FC = () =>
{
    const { hasMorePulls, hasMore, fetchMorePulls, setCursor, fetchMoreRepos, repositories, selectedRepo, isModalVisible, fetchPullRequestsAndOpenModal, closeModal } = useRepositoriesAPI();
    const { filteredData, handleSearch } = useRepositoriesUI(repositories);
    const handleLoadMore = () =>
    {
        fetchMoreRepos();
    };
    return (
        <>
            <Input
                placeholder="Search Repositories"
                prefix={<SearchOutlined />}
                onChange={handleSearch}
                style={{ marginBottom: 20 }}
            />

            <Row gutter={[16, 16]}>
                {filteredData.map((dataItem: any) => (
                    <Col key={dataItem.id} xs={24} sm={12} md={8} lg={8}>
                        <CardComponent dataItem={dataItem} onClick={() => fetchPullRequestsAndOpenModal(dataItem, [], setCursor, undefined)} />
                    </Col>
                ))}
            </Row>
            {hasMore === true ?
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Button
                        type="text"
                        onClick={handleLoadMore}
                        icon={<DownOutlined />}
                    />
                </div> : ""
            }

            <ModalComponent
                selectedRepo={selectedRepo}
                isVisible={isModalVisible}
                onClose={closeModal}
                fetchMorePulls={fetchMorePulls}
                hasMore={hasMorePulls}

            />
        </>
    );
};

export default RepositoriesTable;

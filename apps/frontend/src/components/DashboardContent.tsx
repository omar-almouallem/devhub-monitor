import React, { useState } from 'react';
import { Typography, Tabs } from 'antd';


import Dashboard from './Dashboard';
import PullRequestFilter from '../pages/statistics/averagePRsByDate';
import FilterByRepo from '../pages/statistics/averagePRsByRepo';
import FilterByUser from '../pages/statistics/averagePRsByUser';
import RepositoriesTable from './RepositoryTable';
import { DashboardFilled } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;

const AppView = () =>
{
    const [activeTab, setActiveTab] = useState('repositories');


    const tabPaneStyle = {
        padding: '20px',
        background: '#f0f2f5',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Dashboard />
            <Tabs
                activeKey={activeTab}
                onChange={key => setActiveTab(key)}
                tabBarGutter={16}
                tabPosition="top"
                type="card"
                style={{ marginTop: '20px' }}
                centered
            >

                <TabPane tab="Repositories" key="repositories" style={tabPaneStyle}>
                    <RepositoriesTable />
                </TabPane>
                <TabPane tab="Filter by Date" key="pullRequests" style={tabPaneStyle}>
                    <PullRequestFilter />
                </TabPane>
                <TabPane tab="Filter by User" key="filterByName" style={tabPaneStyle}>
                    <FilterByUser />
                </TabPane>
                <TabPane tab="Filter by Repo" key="filterByRepo" style={tabPaneStyle}>
                    <FilterByRepo />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AppView;

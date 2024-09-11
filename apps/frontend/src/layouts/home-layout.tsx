import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import { PieChartOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface HomeLayoutProps
{
    children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) =>
{

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>('Dashboard');
    const navigate = useNavigate();

    const { logout } = useAuth();

    const onCollapse = (collapsed: boolean) =>
    {
        setCollapsed(collapsed);
    };
    const handleAddToken = (e: any) =>
    {
        navigate('/InsertToken');

    };

    return (
        <Layout style={{ minHeight: '100vh' }}>


            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ marginTop: "70px" }}>
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => setPageTitle('Dashboard')}>
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="2" icon={< UserAddOutlined />} onClick={handleAddToken}>
                        <span>Add Token</span>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
                        <span>Logout</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>

                <Header style={{ background: '#fff', padding: '0px 50px', fontSize: "30px" }}>
                    <span>{pageTitle}</span>
                </Header>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>

                    </Breadcrumb>
                    {children}

                </Content>

                <Footer style={{ textAlign: 'center' }}>Dev Hub Monitor</Footer>
            </Layout>
        </Layout >
    );
};

export default HomeLayout;

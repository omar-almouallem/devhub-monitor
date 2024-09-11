import React from 'react';
import { Row, Col, Layout, Input, Space, Typography, Button, Card, Carousel, Spin } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';
import { Header, Content } from 'antd/es/layout/layout';
import TokenStatus from '../../components/TokenStatus';
import * as styles from '../../styles/insert-token.style';
import { useInsertTokenApi } from '../../hooks/api/useInsertToken';
import { useGithubUi } from '../../hooks/ui/useInsertTokenActions';
import step1 from '../../../public/1.png';
import step2 from '../../../public/2.png';
import step3 from '../../../public/3.png';
import step4 from '../../../public/4.png';

const { Title, Text } = Typography;

const steps = [
    { src: step1, alt: 'Step 1', label: 'Step 1' },
    { src: step2, alt: 'Step 2', label: 'Step 2' },
    { src: step3, alt: 'Step 3', label: 'Step 3' },
    { src: step4, alt: 'Step 4', label: 'Step 4' }
];

const GithubTokenInput = () =>
{
    const { handleSaveGithubToken, loading } = useInsertTokenApi();
    const { githubToken, handleTokenChange, handleSubmit } = useGithubUi(handleSaveGithubToken);

    return (
        <Layout css={styles.layoutStyle}>
            <Header css={styles.headerStyle}>
                <Title level={3} css={styles.headerTitleStyle}>GitHub Token Input</Title>
            </Header>
            <TokenStatus />
            <Content css={styles.contentStyle}>
                <Row justify="center" align="middle" style={{ marginBottom: '40px' }}>
                    <Col xs={24} sm={20} md={16} lg={12}>
                        <div css={styles.containerStyle}>
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <Input
                                    required
                                    type="password"
                                    placeholder="Enter your GitHub Token"
                                    value={githubToken}
                                    onChange={handleTokenChange}
                                    css={styles.inputStyle}
                                />
                                <Button
                                    type="primary"
                                    css={styles.buttonStyle}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? <Spin /> : 'Submit'}
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={24} sm={24} md={22} lg={20}>
                        <Card
                            title={<Title style={{ color: `#001529` }} level={4}>How to Generate a GitHub Token</Title>}
                            bordered={false}
                            css={styles.cardStyle}
                        >
                            <Carousel dotPosition="bottom">
                                {steps.map(({ src, alt, label }) => (
                                    <div key={alt} css={styles.carouselItemContainer}>
                                        <img src={src} alt={alt} css={styles.carouselImage} />
                                        <Text css={styles.carouselText}>{label}</Text>
                                    </div>
                                ))}
                            </Carousel>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default () => (
    <ProConfigProvider dark>
        <GithubTokenInput />
    </ProConfigProvider>
);

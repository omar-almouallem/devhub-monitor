import React from 'react';
import { Select, Button, Typography, Divider, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import usePRsByRepoActions from '../../hooks/ui/usePRsByRepoActions';
import AveragePRsTimeCard from '../../components/AveragePRsTimeCard';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;



const AveragePRsByRepo: React.FC = () =>
{
    const {
        selectedRepositories,
        averagePRs,
        handleSelectChange,
        handleCalculateAverage,
        listOfReposNames,
        handleLoadMore
    } = usePRsByRepoActions();

    const chartData = averagePRs?.projectAverages?.map((project: { _id: string; avgHours: number; avgMinutes: number; }) => ({
        name: project._id,
        averageHours: project.avgHours,
        averageMinutes: project.avgMinutes,
    })) || [];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Filter by Repositories</Title>

            <Select
                mode="multiple"
                style={{ width: '100%', marginBottom: '10px' }}
                placeholder="Select repositories"
                onChange={handleSelectChange}
                value={selectedRepositories}
                dropdownRender={menu => (
                    <>
                        {menu}
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                            <Button
                                type="text"
                                onClick={handleLoadMore}
                                icon={<DownOutlined />}
                            />
                        </div>
                    </>
                )}
            >
                {listOfReposNames.map((repo: { unique_key: string; }) => (
                    <Select.Option key={repo.unique_key} value={repo.unique_key}>
                        {repo.unique_key}
                    </Select.Option>
                ))}
            </Select>
            <Button
                type="primary"
                disabled={selectedRepositories.length < 1}
                onClick={handleCalculateAverage}
                style={{ marginBottom: '10px' }}
            >
                Submit
            </Button>
            <Divider />

            {averagePRs && (
                <AveragePRsTimeCard
                    titleText={'Overall Average Pull Request Time'}
                    avgHours={averagePRs.overallAverage.avgHours}
                    avgMinutes={averagePRs.overallAverage.avgMinutes} />
            )}

            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="name" tick={{ fill: '#333' }} />
                        <YAxis
                            tickFormatter={(value: number) =>
                            {
                                const hours = Math.floor(value);
                                return `${ hours } hours`;
                            }}
                            tick={{ fill: '#333' }}
                            label={{ value: 'Average Time (hours)', angle: -90, position: 'insideLeft' }}
                            domain={[0, 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                            labelStyle={{ color: '#333' }}
                            formatter={(value: number, name: string, entry: any) =>
                            {
                                const hours = entry.payload.averageHours;
                                const minutes = entry.payload.averageMinutes;
                                return [`${ hours } hours ${ minutes } minutes`];
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="averageHours"
                            name="Average Hours"
                            fill="#FF6347"
                        />
                        <Bar
                            dataKey="averageMinutes"
                            name="Average Minutes"
                            fill="#8884d8"
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : ""}


        </div>
    );
};

export default AveragePRsByRepo;

import React from 'react';
import { Select, Button, Typography, Divider, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import usePRsByRepoActions from '../../hooks/ui/usePRsByRepoActions';
import { useUserData } from '../../context/UserDataContext';
import AveragePRsTimeCard from '../../components/AveragePRsTimeCard';

const { Option } = Select;
const { Title, Text } = Typography;

interface ProjectData
{
    name: string;
    averagePullRequestTime: number;
}

interface AveragePRsData
{
    projects: ProjectData[];
    overallAveragePullRequestTime: number;
}

const AveragePRsByRepo: React.FC = () =>
{
    const { userData } = useUserData();
    const {
        selectedRepositories,
        averagePRs,
        handleSelectChange,
        handleCalculateAverage,
        repositoriesWithPRs,
    } = usePRsByRepoActions(userData);
    const chartData = averagePRs?.projects.map((pr: ProjectData) => ({
        name: pr.name,
        averageTime: pr.averagePullRequestTime,
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
            >
                {repositoriesWithPRs.map((repo: { name: string; }) => (
                    <Option key={repo.name} value={repo.name}>
                        {repo.name}
                    </Option>
                ))}
            </Select>
            <Button
                type="primary"
                disabled={selectedRepositories.length < 1}
                onClick={handleCalculateAverage}
                style={{ marginBottom: '10px' }}
            >
                Submit            </Button>
            <Divider />

            {averagePRs && (
                <AveragePRsTimeCard titleText={'Overall Average Pull Request Time'} averageTime={averagePRs.overallAveragePullRequestTime} />

            )}
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="name" tick={{ fill: '#333' }} />
                        <YAxis
                            tickFormatter={(value: number) => `${ value } hours`}
                            tick={{ fill: '#333' }}
                            label={{ value: 'Average Time (hours)', angle: -90, position: 'insideLeft' }}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                            labelStyle={{ color: '#333' }}
                            formatter={(value: number) => `${ value } hours`}
                        />
                        <Legend />
                        <Bar dataKey="averageTime" fill="#FF6347" name="Average Time" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <Text>No data available for the selected repositories</Text>
            )}

        </div>
    );
};

export default AveragePRsByRepo;

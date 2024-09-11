import React from 'react';
import { Select, Button, Typography, ConfigProvider } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUserData } from '../../context/UserDataContext';
import usePRsByUserActions from '../../hooks/ui/usePRsByUserActions';
import AveragePRsTimeCard from '../../components/AveragePRsTimeCard';

const { Title } = Typography;
const { Option } = Select;

const AveragePRsByUser: React.FC = () =>
{
    const { userData } = useUserData();
    const {
        selectedUser,
        filteredPRs,
        usersWithPRs,
        handleSelectChange,
        handleFilterByUser,
    } = usePRsByUserActions(userData);

    const chartData = filteredPRs.repositories.flatMap((repo: any) =>
        repo.pullRequests.map((pr: any) =>
        {
            const { hours, minutes } = pr.duration;

            return {
                repoName: repo.repoName,
                title: pr.title,
                hours: hours,
                minutes: minutes,
            };
        })
    );

    const formatDuration = (hours: number, minutes: number) =>
    {
        return `${ hours }h ${ minutes }m`;
    };

    return (
        <ConfigProvider>
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <Title level={3} style={{ color: '#001529' }}>Filter by Username</Title>
                <Select
                    style={{ width: '100%', marginBottom: '10px' }}
                    placeholder="Select a user"
                    onChange={handleSelectChange}
                    value={selectedUser}
                >
                    {usersWithPRs.map((user: string) => (
                        <Option key={user} value={user}>
                            {user}
                        </Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={handleFilterByUser}
                    disabled={!selectedUser}
                >
                    Submit
                </Button>
                {filteredPRs.overallAveragePullRequestTime && (
                    <AveragePRsTimeCard titleText={'Average Pull Request Time'} averageTime={filteredPRs.overallAveragePullRequestTime} />

                )}
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis
                                dataKey="title"
                                tick={{ fill: '#333' }}
                                label={{ value: 'Pull Request Title', position: 'insideBottomRight', offset: 0 }}
                            />
                            <YAxis
                                tickFormatter={(value: any) => `${ value }h`}
                                tick={{ fill: '#333' }}
                                label={{ value: 'Duration (h)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value: any, name: any, props: any) => formatDuration(props.payload.hours, props.payload.minutes)}
                                contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                                labelStyle={{ color: '#333' }}
                            />
                            <Legend />
                            <Bar dataKey="hours" fill="#82ca9d" name="Duration (Hours)" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div>No pull requests found for the selected user.</div>
                )}
            </div>
        </ConfigProvider>
    );
};

export default AveragePRsByUser;

import React, { useState } from 'react';
import { Select, Button, Typography, ConfigProvider, Input } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AveragePRsTimeCard from '../../components/AveragePRsTimeCard';
import usePRsByUserActions from '../../hooks/ui/usePRsByUserActions';

const { Title } = Typography;

const AveragePRsByUser: React.FC = () =>
{
    const {
        selectedUser,
        filteredPRs,
        averageTime,
        listOfNames,
        handleSelectChange,
        handleFilterByUser,
    } = usePRsByUserActions();

    const chartData = filteredPRs.map((pr: any) => ({
        title: pr.title,
        hours: pr.duration.hours,
        minutes: pr.duration.minutes,
    }));

    return (
        <ConfigProvider>
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <Title level={3} style={{ color: '#001529' }}>Filter by Username</Title>

                <Select
                    style={{ width: '100%', marginBottom: '10px' }}
                    placeholder="Select a user" onChange={handleSelectChange}
                    value={selectedUser}
                >
                    {listOfNames?.map((user: string) => (
                        <Select.Option key={user} value={user}>
                            {user}
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={handleFilterByUser}
                    disabled={!selectedUser}
                >
                    Submit
                </Button>

                {averageTime && (
                    <AveragePRsTimeCard
                        titleText={'Average Pull Request Time'}
                        avgHours={averageTime.avgHours}
                        avgMinutes={averageTime.avgMinutes}
                    />
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
                                tick={{ fill: '#333' }}
                                label={{ value: 'Duration (hours/minutes)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value: any, name: any, props: any) =>
                                    `${ props.payload.hours }h ${ props.payload.minutes }m`
                                }
                                contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                                labelStyle={{ color: '#333' }}
                            />
                            <Legend />
                            <Bar dataKey="hours" fill="#82ca9d" name="Duration (Hours)" />
                            <Bar dataKey="minutes" fill="#8884d8" name="Duration (Minutes)" />
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

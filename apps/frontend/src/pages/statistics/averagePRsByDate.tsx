import React from 'react';
import { DatePicker, Button, Select, ConfigProvider } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import locale from 'antd/locale/en_US';


import { useUserData } from '../../context/UserDataContext';
import usePullRequestActions from '../../hooks/ui/usePRsByDateActions';
import { Typography } from 'antd';
import AveragePRsTimeCard from '../../components/AveragePRsTimeCard';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;


const averagePRsByDate: React.FC = () =>
{
  const { userData } = useUserData();
  const {
    projectName,
    pullRequestsData,
    handleSelectChange,
    handleFetchData,
    setDates,
  } = usePullRequestActions(userData);
  const chartData = pullRequestsData ? pullRequestsData.pullRequests.map((pr: any) =>
  {
    return {
      name: pr.title,
      CreatedAt: pr.created_at ? new Date(pr.created_at).getTime() : null,
      MergedAt: pr.merged_at ? new Date(pr.merged_at).getTime() : null,
    };
  }) : [];


  return (
    <ConfigProvider locale={locale}>
      <div style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
        <Select
          showSearch
          allowClear={true}
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={handleSelectChange}
          value={projectName || undefined}
          placeholder="Select repositories"
        >
          {userData.gitHubRepoData.map((repo: any) => (
            <Option key={repo.name} value={repo.name}>
              {repo.name}
            </Option>
          ))}
        </Select>

        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates: any) => setDates(dates)}
          style={{ marginBottom: 20, width: '100%' }}
        />

        <Button type="primary" onClick={handleFetchData} disabled={!projectName}
        >
          Submit
        </Button>
        {pullRequestsData && (
          <AveragePRsTimeCard titleText={'Average Pull Request Time'} averageTime={pullRequestsData.averagePullRequestTime} />

        )}
        <div style={{ marginTop: 20 }}>
          {chartData.length === 0 ? (
            <div>No pull requests found for the selected time range.</div>
          ) : (


            <ResponsiveContainer width="100%" height={600}>

              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#333' }}
                  label={{ value: 'Pull Request', position: 'insideBottomRight', offset: 0 }}
                />
                <YAxis
                  tickFormatter={(value) => moment(value).format('YYYY-MM-DD HH:mm:ss')}
                  tick={{ fill: '#333' }}
                  label={{ value: 'Date', angle: -90, position: 'insideLeft' }}
                  scale="time"
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                  labelStyle={{ color: '#333' }}
                  formatter={(value: any) => moment(value).format('YYYY-MM-DD HH:mm:ss')}
                />
                <Legend />
                <Bar dataKey="CreatedAt" fill="#FF6347" name="Created At" />
                <Bar dataKey="MergedAt" fill="#4682B4" name="Merged At" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default averagePRsByDate;

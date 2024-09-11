import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

interface ChartProps
{
    data: any[];
    xAxisKey: string;
    bars: { key: string; fill: string; name: string; }[];
    yAxisFormatter?: (value: any) => string;
    tooltipFormatter?: (value: any) => string;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

const CustomBarChart: React.FC<ChartProps> = ({
    data,
    xAxisKey,
    bars,
    yAxisFormatter = (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
    tooltipFormatter = (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
    xAxisLabel,
    yAxisLabel,
}) => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis
                dataKey={xAxisKey}
                tick={{ fill: '#333' }}
                label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottomRight', offset: 0 } : undefined}
            />
            <YAxis
                tickFormatter={yAxisFormatter}
                tick={{ fill: '#333' }}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                domain={['auto', 'auto']}
            />
            <Tooltip
                contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                labelStyle={{ color: '#333' }}
                formatter={tooltipFormatter}
            />
            <Legend />
            {bars.map((bar) => (
                <Bar key={bar.key} dataKey={bar.key} fill={bar.fill} name={bar.name} />
            ))}
        </BarChart>
    </ResponsiveContainer>
);

export default CustomBarChart;

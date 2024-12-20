import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
} from 'recharts'

// interface TrendChartProps {
//     title: string
//     data: { date: string; calories: number }[]
// }

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]

export default function TrendChart() {
    return (
        <div className="bg-white rounded p-3 md:p-8 lg:p-8">
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart data={data} margin={{ top: 20 }}>
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    >
                        <LabelList position="top" offset={10} />
                    </Line>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d">
                        <LabelList position="top" offset={10} />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

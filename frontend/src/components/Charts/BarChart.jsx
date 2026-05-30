import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GET_CHART_FIELD_LABEL } from './AreaChart';



const CustomBarChart = ({ data }) => {

    const label = GET_CHART_FIELD_LABEL(data[0], 'string')
    const values = GET_CHART_FIELD_LABEL(data[0], 'number')

    return (
        <div className="w-full h-[350px] bg-[#28282866] rounded-lg px-1">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={600}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={values[0]} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;

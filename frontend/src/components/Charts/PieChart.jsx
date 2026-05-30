import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import { GET_CHART_FIELD_LABEL } from './AreaChart';

const PIE_CHART_COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f", "#9b59b6"];

const CustomPieChart = ({ data }) => {
    return (
        <div className="w-full h-[300px] bg-[#28282866] rounded-lg px-1">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300} >
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        legendType="circle"
                        paddingAngle={2}
                        minAngle={5}
                        isAnimationActiveBoolean={false}

                    >
                        {data.map((entry, index) => (
                            <Cell fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                        ))}
                    </Pie>


                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomPieChart
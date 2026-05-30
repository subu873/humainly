import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CostChart = ({ data, stroke, stopColor }) => {

  // Data that matches the curve pattern in your image


  // Custom dot component for the active point
  const CustomDot = (props) => {
    const { cx, cy, payload, stroke } = props;
    if (payload.month === "JUL") {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="white"
          stroke={stroke}
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[150px] bg-transparent">

      <ResponsiveContainer width="100%" height="100%" className="bg-[#282828]/66">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -10,
            bottom: 10,
          }}
        >

          <defs>
            <linearGradient
              id="areaGradient"
              x1="1"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="8.1%" stopColor={`${stopColor}`} stopOpacity={0.2} />
              <stop offset="97.85%" stopColor={`${stopColor}`} stopOpacity={0.19} />
            </linearGradient>
          </defs>


          <XAxis
            hide
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            className="text-gray-400"
          />

          <YAxis
            hide
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            tickFormatter={(value) => `${value}%`}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={<CustomDot />}
            activeDot={{
              r: 4,
              fill: "white",
              stroke: { stroke },
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div >
  );
};

export default CostChart;

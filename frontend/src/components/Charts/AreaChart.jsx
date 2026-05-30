import React, { memo } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

export const GET_CHART_FIELD_LABEL = (obj, type) => {
  return Object.keys(obj)?.filter((key) => {
    if (typeof obj[key] === type) {
      return key;
    }
  });
};


const GradientAreaChart = ({ key, wrapperStyles, appendMessage = "", minHeight = 300, data, stroke = "#7238df", showXAxisLabel = true, showYAxisLabel = true }) => {
  const label = GET_CHART_FIELD_LABEL(data[0], 'string')
  const values = GET_CHART_FIELD_LABEL(data[0], 'number')

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 px-3 py-2 rounded-lg border border-gray-600 shadow-lg">
          <div className="flex gap-2 items-center">

            <p className={`font-medium text-sm`} style={{ color: stroke }}>
              {payload.map((item) => {
                const { value } = item;
                return (
                  <> {`${!!item?.payload?.name ? `${item?.payload?.name} :` : ""}  ${value} ${appendMessage}`} </>
                )
              })}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component for the active point
  const CustomDot = (props) => {
    const { cx, cy, payload, stroke } = props;
    if (payload.month === "Jan") {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="white"
          stroke={stroke}
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  const GENERATED_ID = Math.random().toString(36).substring(2, 15);

  return (

    <ResponsiveContainer key={key} style={wrapperStyles} width={"100%"} height={'100%'} minHeight={minHeight}>
      <AreaChart
        data={data}
      >
        {/* Define the gradient */}
        <defs>
          <linearGradient id={`areaGradient-${GENERATED_ID}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.2} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0.19} />
          </linearGradient>
        </defs>
        {showXAxisLabel &&
          <XAxis dataKey={label[0]} tick={showXAxisLabel} />
        }
        {showYAxisLabel &&
          <YAxis tick={showYAxisLabel} />
        }

        {console.log("isssn", label?.join(""))}

        <Tooltip content={<CustomTooltip label={label?.join("")} />} cursor={false} />
        {values.length > 0 && values.map((item, index) => {
          return (
            <Area
              type="monotone"
              dataKey={item}
              stroke={`${index == 0 ? stroke : '#7238df'}`}
              strokeWidth={2}
              fill={`url(#areaGradient-${GENERATED_ID})`}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: "white",
                stroke: `${index == 0 ? stroke : '#7238df'}`,
                strokeWidth: 2,
              }}
            />
          )
        })
        }
      </AreaChart>
    </ResponsiveContainer>

  );
};

export default GradientAreaChart



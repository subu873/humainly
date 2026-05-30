import CustomBarChart from "../Charts/BarChart";

// components/blocks/ChartBlock.jsx
export default function ChartBlock({ block }) {
    const data = block.labels.map((label, i) => ({
        name: label,
        value: block.values[i] ?? 0,
    }));

    return (
        <CustomBarChart data={data} />
    );
}
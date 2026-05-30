// components/blocks/BlockRenderer.jsx

import ChartBlock from "../Shared/ChartBlock";
import ListBlock from "../Shared/ListBlock";
import StatBlock from "../Shared/StatBlock";
import TableBlock from "../Shared/TableBlock";
import TextBlock from "../Shared/TextBlock";
import TimelineBlock from "../Shared/TimelineBlock";


export default function BlockRenderer({ block }) {
    switch (block.type) {
        case 'text': return <TextBlock block={block} />;
        case 'stat': return <StatBlock block={block} />;
        case 'table': return <TableBlock block={block} />;
        case 'list': return <ListBlock block={block} />;
        case 'chart': return <ChartBlock block={block} />;
        case 'timeline': return <TimelineBlock block={block} />;
        default: return null;
    }
}
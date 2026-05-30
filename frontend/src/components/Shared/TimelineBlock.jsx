// components/blocks/TimelineBlock.jsx
export default function TimelineBlock({ block }) {
    return (
        <div className="space-y-1 pl-2">
            {block.events.map((event, i) => (
                <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1" />
                        {i < block.events.length - 1 && (
                            <div className="w-px h-8 bg-gray-700 mt-1" />
                        )}
                    </div>
                    <div className="pb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider block">
                            {event.when}
                        </span>
                        <span className="text-sm text-gray-300">{event.what}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
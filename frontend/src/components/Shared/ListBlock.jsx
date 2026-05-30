// components/blocks/ListBlock.jsx
const ICON = {
    call: '📞', email: '✉️', meeting: '🤝', document: '📄',
};

export default function ListBlock({ block }) {
    return (
        <div className="space-y-3">
            {block.items.map((item, i) => (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:border-gray-500 transition-colors">
                    <div className="flex items-start gap-3">
                        {item.fields?.Type && (
                            <span className="text-base mt-0.5 shrink-0">
                                {ICON[item.fields.Type.toLowerCase()] ?? '•'}
                            </span>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            {item.subtitle && (
                                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                            )}
                            {item.fields && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 pt-2 border-t border-gray-700">
                                    {Object.entries(item.fields)
                                        .filter(([k]) => k !== 'Type')
                                        .map(([k, v]) => (
                                            <div key={k} className="text-xs">
                                                <span className="text-gray-500">{k}: </span>
                                                <span className="text-gray-300 font-medium">{v}</span>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
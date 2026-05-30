// components/blocks/StatBlock.jsx
export default function StatBlock({ block }) {
    const isPositive = block.delta?.startsWith('+');
    const isNegative = block.delta?.startsWith('-');

    return (
        <div className="inline-flex flex-col bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mr-3 mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
                {block.label}
            </span>
            <span className="text-2xl font-semibold text-white">
                {block.value}
            </span>
            {block.delta && (
                <span className={`text-xs mt-1 ${isPositive ? 'text-green-400' :
                    isNegative ? 'text-red-400' :
                        'text-gray-400'
                    }`}>
                    {block.delta}
                </span>
            )}
        </div>
    );
}
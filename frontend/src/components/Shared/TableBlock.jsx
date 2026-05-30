// components/blocks/TableBlock.jsx
import { useState } from 'react';

function formatCell(value, type) {
    if (value === null || value === undefined) return '—';
    switch (type) {
        case 'currency':
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(value);
        case 'percent':
            return `${value}%`;
        case 'date':
            return new Date(value).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
            });
        case 'badge':
            return <Badge value={String(value)} />;
        case 'number':
            return Number(value).toLocaleString();
        default:
            return String(value);
    }
}

function Badge({ value }) {
    const colorMap = {
        lead: 'bg-purple-900 text-purple-300 border-purple-700',
        qualified: 'bg-blue-900 text-blue-300 border-blue-700',
        proposal: 'bg-amber-900 text-amber-300 border-amber-700',
        negotiation: 'bg-indigo-900 text-indigo-300 border-indigo-700',
        won: 'bg-green-900 text-green-300 border-green-700',
        lost: 'bg-red-900 text-red-300 border-red-700',
        call: 'bg-teal-900 text-teal-300 border-teal-700',
        email: 'bg-blue-900 text-blue-300 border-blue-700',
        meeting: 'bg-indigo-900 text-indigo-300 border-indigo-700',
        document: 'bg-amber-900 text-amber-300 border-amber-700',
        inbound: 'bg-green-900 text-green-300 border-green-700',
        outbound: 'bg-purple-900 text-purple-300 border-purple-700',
    };
    const cls = colorMap[value.toLowerCase()] || 'bg-gray-700 text-gray-300 border-gray-600';
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs border ${cls}`}>
            {value}
        </span>
    );
}

export default function TableBlock({ block }) {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [hiddenCols, setHiddenCols] = useState(new Set());
    const [showColMenu, setShowColMenu] = useState(false);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const toggleCol = (key) => {
        setHiddenCols(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const visibleCols = block.columns.filter(c => !hiddenCols.has(c.key));

    const sortedRows = [...block.rows].sort((a, b) => {
        if (!sortKey) return 0;
        const av = a[sortKey], bv = b[sortKey];
        const an = Number(av), bn = Number(bv);
        let cmp = !isNaN(an) && !isNaN(bn)
            ? an - bn
            : String(av ?? '').localeCompare(String(bv ?? ''));
        return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
        <div className="rounded-lg border border-gray-700 overflow-hidden">
            {/* Header */}
            {block.title && (
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <span className="text-sm font-medium text-gray-300">{block.title}</span>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{block.rows.length} rows</span>
                        {/* Column toggle */}
                        <div className="relative">
                            <button
                                onClick={() => setShowColMenu(v => !v)}
                                className="text-xs text-gray-400 hover:text-white border border-gray-600 rounded px-2 py-1"
                            >
                                Columns
                            </button>
                            {showColMenu && (
                                <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-600 rounded-lg p-2 z-50 min-w-40 shadow-xl">
                                    {block.columns.map(col => (
                                        <label
                                            key={col.key}
                                            className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-400 hover:text-white cursor-pointer rounded hover:bg-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={!hiddenCols.has(col.key)}
                                                onChange={() => toggleCol(col.key)}
                                                className="accent-indigo-500"
                                            />
                                            {col.label}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-800 border-b border-gray-700">
                            {visibleCols.map(col => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    className={`px-4 py-2 text-left text-xs uppercase tracking-wider cursor-pointer select-none whitespace-nowrap
                    ${sortKey === col.key ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {col.label}
                                    <span className="ml-1">
                                        {sortKey === col.key
                                            ? (sortDir === 'asc' ? '↑' : '↓')
                                            : <span className="opacity-30">↕</span>
                                        }
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRows.map((row, i) => (
                            <tr key={i} className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                                {visibleCols.map((col, ci) => (
                                    <td key={col.key} className={`px-4 py-2 whitespace-nowrap
                    ${ci === 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                                        {formatCell(row[col.key], col.type)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
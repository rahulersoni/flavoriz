import { ChevronDown, ChevronUp } from "lucide-react";
import TableCheckbox from "./TableCheckbox";

function SortIcon({ column, sort }) {
    if (!sort || sort.key !== column) {
        return (
            <span className="ml-1 opacity-30">
                <ChevronDown size={12} />
            </span>
        );
    }

    return sort.direction === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

export default function TableHeader({ columns, selectable, allSelected, onToggleAll, sort, onSort }) {
    return (
        <thead>
            <tr className="border-b border-admin-border bg-admin-surface dark:border-gray-800 dark:bg-gray-800/60">
                {selectable && (
                    <th className="w-[50px] px-5 py-4 text-left">
                        <TableCheckbox checked={allSelected} onChange={onToggleAll} label="Select all rows" />
                    </th>
                )}

                {columns.map((column) => (
                    <th key={column.key} className={`${column.headerClassName || "px-3 py-4"} text-left`}>
                        {column.sortable && onSort ? (
                            <button
                                type="button"
                                onClick={() => onSort(column.key)}
                                className="flex items-center text-admin-xs font-admin-bold uppercase tracking-[0.08em] text-admin-text-muted transition hover:text-admin-text dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                {column.label}
                                <SortIcon column={column.key} sort={sort} />
                            </button>
                        ) : (
                            <span className="text-admin-xs font-admin-bold uppercase tracking-[0.08em] text-admin-text-muted dark:text-gray-400">
                                {column.label}
                            </span>
                        )}
                    </th>
                ))}

                <th className="w-[50px] px-3 py-4" />
            </tr>
        </thead>
    );
}
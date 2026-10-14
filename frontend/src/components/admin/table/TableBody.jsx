import { AnimatePresence } from "motion/react";
import TableRow from "./TableRow";

export default function TableBody({ data, columns, rowKey, selectable, selectedIds, onToggleRow, actions }) {
    return (
        <tbody className="divide-y divide-admin-border dark:divide-gray-800">
            <AnimatePresence initial={false} mode="popLayout">
                {data.map((item) => (
                    <TableRow
                        key={item[rowKey]}
                        item={item}
                        columns={columns}
                        rowKey={rowKey}
                        selectable={selectable}
                        selected={selectedIds?.includes(item[rowKey])}
                        onToggle={() => onToggleRow?.(item[rowKey])}
                        actions={actions}
                    />
                ))}
            </AnimatePresence>
        </tbody>
    );
}
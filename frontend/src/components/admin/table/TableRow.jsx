import { motion } from "motion/react";
import TableCheckbox from "./TableCheckbox";
import TableActions from "./TableActions";

export default function TableRow({ item, columns, rowKey, selectable, selected, onToggle, actions }) {
    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                opacity: { duration: 0.2 },
                layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            className="group border-b border-admin-border last:border-0 hover:bg-admin-surface dark:border-gray-800 dark:hover:bg-gray-800/50"
        >
            {selectable && (
                <td className="px-5 py-4">
                    <TableCheckbox checked={selected} onChange={onToggle} label={`Select ${item[rowKey]}`} />
                </td>
            )}

            {columns.map((column) => (
                <td key={column.key} className={column.cellClassName || "px-3 py-4"}>
                    {column.render ? column.render(item) : item[column.key]}
                </td>
            ))}

            <td className="px-3 py-4">
                {typeof actions === "function" ? actions(item) : <TableActions actions={actions} item={item} />}
            </td>
        </motion.tr>
    );
}
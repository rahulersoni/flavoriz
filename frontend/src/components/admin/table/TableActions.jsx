import { MoreHorizontal } from "lucide-react";

export default function TableActions({ actions = [], item }) {
    if (!actions.length) {
        return (
            <button
                type="button"
                className="grid size-8 place-items-center rounded-admin-md text-admin-text-muted opacity-60 transition hover:bg-admin-card hover:text-admin-text group-hover:opacity-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                aria-label="More options"
            >
                <MoreHorizontal size={17} />
            </button>
        );
    }

    return (
        <div className="flex items-center gap-1">
            {actions.map((action) => (
                <button
                    key={action.key}
                    type="button"
                    onClick={() => action.onClick?.(item)}
                    className={action.className || "grid size-8 place-items-center rounded-admin-md text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}
                    aria-label={action.label}
                    title={action.label}
                >
                    {action.icon}
                </button>
            ))}
        </div>
    );
}
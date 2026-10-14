export default function TablePagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="grid size-9 place-items-center rounded-admin-md border border-admin-border bg-admin-card text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
            >
                ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`grid size-9 place-items-center rounded-admin-md text-admin-xs font-admin-bold transition ${currentPage === page ? "bg-admin-primary text-white dark:bg-amber-400 dark:text-gray-950" : "border border-admin-border bg-admin-card text-admin-text-muted hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className="grid size-9 place-items-center rounded-admin-md border border-admin-border bg-admin-card text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
            >
                →
            </button>
        </div>
    );
}
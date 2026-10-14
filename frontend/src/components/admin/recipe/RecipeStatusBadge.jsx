export default function RecipeStatusBadge({ status }) {
    const styles = {
        published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/10",
        draft: "bg-slate-500/10 text-admin-text-muted border-admin-border dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
        pending: "bg-admin-primary-soft text-admin-primary-hover border-admin-primary/10 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/10",
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-admin-bold capitalize ${styles[status] || styles.draft}`}>
            <span className="mr-1.5 size-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
}
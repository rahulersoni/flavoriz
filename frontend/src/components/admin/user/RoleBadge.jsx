export default function UserRoleBadge({ role }) {
    const styles = {
        admin: "bg-purple-500/10 text-purple-500 border-purple-500/10 dark:bg-purple-400/10 dark:text-purple-400 dark:border-purple-400/10",
        author: "bg-admin-primary-soft text-admin-primary-hover border-admin-primary/10 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/10",
        subscriber: "bg-blue-500/10 text-blue-500 border-blue-500/10 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/10",
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-admin-bold capitalize ${styles[role] || styles.subscriber}`}>
            {role}
        </span>
    );
}
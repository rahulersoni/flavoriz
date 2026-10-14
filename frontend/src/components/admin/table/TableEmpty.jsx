import { SearchX } from "lucide-react";

export default function TableEmpty({ title = "No results found", description = "Try changing your search or filter criteria." }) {
    return (
        <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
            <div className="grid size-12 place-items-center rounded-admin-lg bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400">
                <SearchX size={20} />
            </div>

            <h3 className="mt-4 text-admin-base font-admin-bold text-admin-text dark:text-gray-100">
                {title}
            </h3>

            <p className="mt-1 max-w-[350px] text-admin-xs text-admin-text-muted dark:text-gray-400">
                {description}
            </p>
        </div>
    );
}
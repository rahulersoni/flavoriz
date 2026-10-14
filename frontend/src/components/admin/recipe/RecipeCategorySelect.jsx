import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { categories } from "../../../data/recipe";

export default function RecipeCategorySelect({ value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);

    const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (category) => {
        onChange(category);
        setOpen(false);
        setSearch("");
    };

    return (
        <div ref={containerRef} className="relative">
            <label className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                Category
            </label>

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={`flex h-12 w-full items-center justify-between rounded-admin-md border bg-admin-surface px-4 text-left text-admin-sm outline-none transition dark:bg-gray-900 ${error ? "border-red-500 dark:border-red-400" : "border-admin-border hover:border-admin-text-soft dark:border-gray-700 dark:hover:border-gray-500"}`}
            >
                <span className={value ? "text-admin-text dark:text-gray-100" : "text-admin-text-soft dark:text-gray-500"}>
                    {value || "Select a category"}
                </span>

                <ChevronDown size={17} className={`text-admin-text-muted transition-transform dark:text-gray-400 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-admin-lg border border-admin-border bg-admin-card shadow-admin-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-none">
                    <div className="border-b border-admin-border p-2 dark:border-gray-700">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                onClick={(event) => event.stopPropagation()}
                                placeholder="Search category..."
                                autoFocus
                                className="admin-input h-10 pl-9 pr-3 text-admin-sm dark:border-gray-700 dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto p-1">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => {
                                const selected = category === value;

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => handleSelect(category)}
                                        className="flex w-full items-center justify-between rounded-admin-md px-3 py-2.5 text-left text-admin-sm text-admin-text transition hover:bg-admin-surface dark:text-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <span>{category}</span>
                                        {selected && <Check size={16} className="text-admin-primary dark:text-amber-400" />}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="px-3 py-6 text-center text-admin-sm text-admin-text-muted dark:text-gray-400">
                                No categories found.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {error && <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">{error}</p>}
        </div>
    );
}
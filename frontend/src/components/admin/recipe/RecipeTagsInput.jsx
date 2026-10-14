import { useState } from "react";
import { X } from "lucide-react";

export default function RecipeTagsInput({ value = [], onChange, error }) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const tag = input.trim();

        if (!tag) {
            return;
        }

        const exists = value.some((item) => item.toLowerCase() === tag.toLowerCase());

        if (exists) {
            setInput("");
            return;
        }

        onChange([...value, tag]);
        setInput("");
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag();
        }

        if (event.key === "Backspace" && !input && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div>
            <label className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                Tags
            </label>

            <div className={`min-h-12 rounded-admin-lg border bg-admin-surface p-2 transition dark:bg-gray-900 ${error ? "border-red-500 dark:border-red-400" : "border-admin-border focus-within:border-admin-primary dark:border-gray-700 dark:focus-within:border-amber-400"}`}>
                <div className="flex flex-wrap items-center gap-2">
                    {value.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 rounded-admin-md bg-admin-primary-soft px-2.5 py-1.5 text-admin-xs font-admin-semibold text-admin-text dark:bg-amber-400/10 dark:text-amber-400">
                            {tag}

                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-admin-text-muted transition hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                                aria-label={`Remove ${tag}`}
                            >
                                <X size={13} />
                            </button>
                        </span>
                    ))}

                    <input
                        type="text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={value.length === 0 ? "Add tags..." : "Add another tag..."}
                        className="min-w-[150px] flex-1 bg-transparent px-2 py-1.5 text-admin-sm text-admin-text outline-none placeholder:text-admin-text-soft dark:text-gray-100 dark:placeholder:text-gray-500"
                    />
                </div>
            </div>

            <p className="mt-2 text-admin-xs text-admin-text-muted dark:text-gray-400">
                Press Enter to add a tag.
            </p>

            {error && (
                <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
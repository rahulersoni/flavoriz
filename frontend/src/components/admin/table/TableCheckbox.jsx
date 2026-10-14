import { Check } from "lucide-react";

export default function TableCheckbox({ checked, onChange, label }) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-label={label}
            aria-pressed={checked}
            className={`grid size-4 place-items-center rounded border transition ${checked ? "border-admin-primary bg-admin-primary text-white dark:border-amber-400 dark:bg-amber-400 dark:text-gray-950" : "border-admin-border bg-admin-card dark:border-gray-700 dark:bg-gray-900"}`}
        >
            {checked && <Check size={11} strokeWidth={3} />}
        </button>
    );
}
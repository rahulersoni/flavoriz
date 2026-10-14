import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export default function RecipeRepeater({ control, register, name, title, description, placeholder, addLabel }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <section className="mt-6 border-t border-admin-border pt-6 dark:border-gray-800">
            <div className="mb-5">
                <h4 className="text-admin-base font-admin-bold text-admin-text dark:text-gray-100">
                    {title}
                </h4>

                {description && (
                    <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder={`${placeholder} ${index + 1}`}
                            {...register(`${name}.${index}`)}
                            className="admin-input w-full"
                        />

                        <button
                            type="button"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-admin-md border border-admin-border text-admin-text-muted transition hover:border-red-300 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:border-red-500 dark:hover:text-red-400"
                            aria-label={`Remove ${title.toLowerCase()} ${index + 1}`}
                        >
                            <Trash2 size={17} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => append("")}
                className="mt-4 inline-flex items-center gap-2 rounded-admin-md border border-dashed border-admin-border px-4 py-2.5 text-admin-sm font-admin-semibold text-admin-text transition hover:border-admin-primary hover:text-admin-primary dark:border-gray-700 dark:text-gray-100 dark:hover:border-amber-400 dark:hover:text-amber-400"
            >
                <Plus size={17} />
                {addLabel}
            </button>
        </section>
    );
}
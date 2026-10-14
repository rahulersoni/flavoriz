import { FileText, Upload, X } from "lucide-react";

export default function RecipePdfField({ value, onChange }) {
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {
            alert("Please select a PDF file.");
            event.target.value = "";
            return;
        }

        onChange(file);
    };

    const removeFile = () => {
        onChange(null);
    };

    return (
        <section className="mt-6 border-t border-admin-border pt-6 dark:border-gray-800">
            <div className="mb-5">
                <h4 className="text-admin-base font-admin-bold text-admin-text dark:text-gray-100">
                    Recipe PDF
                </h4>
                <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                    Upload a downloadable PDF version of this recipe.
                </p>
            </div>

            {!value ? (
                <label
                    htmlFor="recipe-pdf"
                    className="group flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-admin-lg border-2 border-dashed border-admin-border bg-admin-surface px-6 py-8 text-center transition hover:border-admin-primary hover:bg-admin-primary-soft dark:border-gray-700 dark:bg-gray-900 dark:hover:border-amber-400 dark:hover:bg-amber-400/10"
                >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-admin-lg bg-admin-card text-admin-text-muted shadow-sm transition group-hover:text-admin-primary dark:bg-gray-800 dark:text-gray-400 dark:group-hover:text-amber-400">
                        <Upload size={20} />
                    </div>

                    <p className="text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                        Click to upload PDF
                    </p>

                    <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">
                        PDF files only
                    </p>

                    <input
                        id="recipe-pdf"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            ) : (
                <div className="flex items-center justify-between gap-4 rounded-admin-lg border border-admin-border bg-admin-surface p-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-admin-md bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400">
                            <FileText size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                                {value.name}
                            </p>

                            <p className="mt-0.5 text-admin-xs text-admin-text-muted dark:text-gray-400">
                                {(value.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={removeFile}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-admin-md text-admin-text-muted transition hover:bg-red-50 hover:text-red-500 dark:text-gray-400 dark:hover:bg-red-400/10 dark:hover:text-red-400"
                        aria-label="Remove PDF"
                    >
                        <X size={17} />
                    </button>
                </div>
            )}
        </section>
    );
}
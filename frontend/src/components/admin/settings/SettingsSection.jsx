import { ArrowLeft, ArrowRight, Save } from "lucide-react";

export default function SettingsSection({
    title,
    description,
    children,
    onSubmit,
    saving = false,
    isFirst = false,
    isLast = false,
    onPrevious,
    onNext,
}) {
    return (
        <form onSubmit={onSubmit} className="admin-card overflow-hidden">
            <div className="border-b border-admin-border p-5 sm:p-6 dark:border-gray-800">
                <h2 className="text-admin-lg font-admin-bold text-admin-text dark:text-gray-100">{title}</h2>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">{description}</p>
            </div>

            <div className="space-y-7 p-5 sm:p-6">
                {children}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-admin-border bg-admin-surface/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <div>
                    {!isFirst && (
                        <button type="button" onClick={onPrevious} className="admin-btn-secondary cursor-pointer gap-2">
                            <ArrowLeft size={16} />
                            Previous
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {!isLast && (
                        <button type="button" onClick={onNext} className="admin-btn-secondary cursor-pointer gap-2">
                            Next
                            <ArrowRight size={16} />
                        </button>
                    )}

                    <button type="submit" disabled={saving} className="admin-btn-primary cursor-pointer gap-2 disabled:pointer-events-none disabled:opacity-50">
                        <Save size={16} />
                        {saving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </div>
        </form>
    );
}
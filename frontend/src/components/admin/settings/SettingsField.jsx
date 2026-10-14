export default function SettingsField({ label, htmlFor, description, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                {label}
            </label>

            {children}

            {description && (
                <p className="mt-2 text-admin-xs text-admin-text-muted dark:text-gray-500">
                    {description}
                </p>
            )}
        </div>
    );
}
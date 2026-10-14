export default function SettingsToggle({ name, checked, onChange, title, description }) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-admin-md border border-admin-border p-4 dark:border-gray-700">
            <div>
                <p className="text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">{title}</p>
                <p className="mt-1 text-[10px] text-admin-text-muted dark:text-gray-500">{description}</p>
            </div>

            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="size-4 accent-admin-primary"
            />
        </label>
    );
}
import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";

const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

const layouts = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
];

export default function AppearanceSettings({ settings, onChange, onSave, saving, isFirst, isLast, onNext, onPrevious }) {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const nextValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;
        onChange({ ...settings, [name]: nextValue });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(settings);
    };

    return (
        <SettingsSection
            title="Appearance"
            description="Customize how your website looks and displays content."
            onSubmit={onSave}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <SettingsField label="Theme" description="Choose the default website theme.">
                <div className="grid gap-3 sm:grid-cols-3">
                    {themes.map((theme) => (
                        <button
                            key={theme.value}
                            type="button"
                            onClick={() => onChange({ ...settings, theme: theme.value })}
                            className={`rounded-admin-md border p-4 text-left transition ${settings.theme === theme.value ? "border-admin-primary bg-admin-primary-soft dark:border-admin-primary dark:bg-gray-800" : "border-admin-border hover:bg-admin-surface dark:border-gray-700 dark:hover:bg-gray-800"}`}
                        >
                            <span className="text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">{theme.label}</span>
                        </button>
                    ))}
                </div>
            </SettingsField>

            <div className="grid gap-6 md:grid-cols-2">
                <SettingsField label="Primary color" htmlFor="primaryColor">
                    <input id="primaryColor" name="primaryColor" type="color" value={settings.primaryColor} onChange={handleChange} className="h-10 w-full cursor-pointer rounded-admin-md border border-admin-border bg-admin-card p-1 dark:border-gray-700 dark:bg-gray-900" />
                </SettingsField>

                <SettingsField label="Posts per page" htmlFor="postsPerPage">
                    <input id="postsPerPage" name="postsPerPage" type="number" min="1" value={settings.postsPerPage} onChange={handleChange} className="admin-input" />
                </SettingsField>

                <SettingsField label="Blog layout" htmlFor="blogLayout">
                    <select id="blogLayout" name="blogLayout" value={settings.blogLayout} onChange={handleChange} className="admin-input grid-cols-2">
                        {layouts.map((layout) => <option key={layout.value} value={layout.value}>{layout.label}</option>)}
                    </select>
                </SettingsField>
            </div>

            <div className="space-y-3">
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-admin-md border border-admin-border p-4 dark:border-gray-700">
                    <span className="text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Show featured image</span>
                    <input type="checkbox" name="showFeaturedImage" checked={settings.showFeaturedImage} onChange={handleChange} className="size-4 accent-admin-primary" />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-admin-md border border-admin-border p-4 dark:border-gray-700">
                    <span className="text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Show author</span>
                    <input type="checkbox" name="showAuthor" checked={settings.showAuthor} onChange={handleChange} className="size-4 accent-admin-primary" />
                </label>
            </div>
        </SettingsSection>
    );
}
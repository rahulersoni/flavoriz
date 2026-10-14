import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

export default function RecipeSettings({
    settings,
    onChange,
    onSave,
    saving,
    isFirst,
    isLast,
    onNext,
    onPrevious,
}) {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const nextValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;

        onChange({
            ...settings,
            [name]: nextValue,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(event);
    };

    return (
        <SettingsSection
            title="Recipe settings"
            description="Configure recipe-related preferences."
            onSubmit={handleSubmit}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <div>
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Defaults</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">These values are used when creating a new recipe.</p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <SettingsField label="Default servings" htmlFor="default-servings">
                        <input id="default-servings" name="defaultServings" type="number" min="1" max="100" value={settings.defaultServings} onChange={handleChange} className="admin-input " />
                    </SettingsField>

                    <SettingsField label="Default difficulty" htmlFor="default-difficulty">
                        <select id="default-difficulty" name="defaultDifficulty" value={settings.defaultDifficulty} onChange={handleChange} className="admin-input">
                            {difficulties.map((difficulty) => (
                                <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                            ))}
                        </select>
                    </SettingsField>
                </div>
            </div>

            <div className="border-t border-admin-border pt-7 dark:border-gray-800">
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Recipe features</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Enable or disable features available on recipe pages.</p>

                <div className="mt-5 space-y-3">
                    <SettingsToggle name="enableRecipePdf" checked={settings.enableRecipePdf} onChange={handleChange} title="Recipe PDF" description="Allow recipes to include a downloadable PDF." />
                    <SettingsToggle name="enableCopyRecipe" checked={settings.enableCopyRecipe} onChange={handleChange} title="Copy recipe" description="Show a button allowing visitors to copy recipe details." />
                    <SettingsToggle name="enableRatings" checked={settings.enableRatings} onChange={handleChange} title="Recipe ratings" description="Allow visitors to rate recipes." />
                    <SettingsToggle name="enableNutrition" checked={settings.enableNutrition} onChange={handleChange} title="Nutrition information" description="Enable nutrition information on recipes." />
                    <SettingsToggle name="calculateReadingTime" checked={settings.calculateReadingTime} onChange={handleChange} title="Automatic reading time" description="Automatically calculate reading time from recipe content." />
                </div>
            </div>
        </SettingsSection>
    );
}
import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";

export default function GeneralSettings({ settings, onChange, onSave, saving, isFirst, isLast, onNext, onPrevious }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange({ ...settings, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(settings);
    };

    return (
        <SettingsSection
            title="General settings"
            description="Configure your website's basic information."
            onSubmit={onSave}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <SettingsField label="Site name" htmlFor="siteName">
                    <input id="siteName" name="siteName" value={settings.siteName} onChange={handleChange} className="admin-input" />
                </SettingsField>

                <SettingsField label="Tagline" htmlFor="tagline">
                    <input id="tagline" name="tagline" value={settings.tagline} onChange={handleChange} className="admin-input" />
                </SettingsField>

                <SettingsField label="Admin email" htmlFor="adminEmail">
                    <input id="adminEmail" name="adminEmail" type="email" value={settings.adminEmail} onChange={handleChange} className="admin-input" />
                </SettingsField>

                <SettingsField label="Contact email" htmlFor="contactEmail">
                    <input id="contactEmail" name="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange} className="admin-input" />
                </SettingsField>

                <SettingsField label="Timezone" htmlFor="timezone">
                    <select id="timezone" name="timezone" value={settings.timezone} onChange={handleChange} className="admin-input">
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="America/Los_Angeles">America/Los_Angeles</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="UTC">UTC</option>
                    </select>
                </SettingsField>

                <SettingsField label="Date format" htmlFor="dateFormat">
                    <select id="dateFormat" name="dateFormat" value={settings.dateFormat} onChange={handleChange} className="admin-input">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                </SettingsField>
            </div>
        </SettingsSection>
    );
}
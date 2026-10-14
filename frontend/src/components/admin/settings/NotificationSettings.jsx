import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

export default function NotificationSettings({ settings, onChange, onSave, saving, isFirst, isLast, onNext, onPrevious }) {
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
            title="Notifications"
            description="Configure email notification preferences."
            onSubmit={onSave}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <SettingsField label="Notification email" htmlFor="notification-email" description="Notifications will be sent to this email address.">
                <input id="notification-email" name="notificationEmail" type="email" value={settings.notificationEmail} onChange={handleChange} className="admin-input max-w-[520px]" placeholder="admin@example.com" />
            </SettingsField>

            <div className="border-t border-admin-border pt-7 dark:border-gray-800">
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Email notifications</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Select the events you want to be notified about.</p>

                <div className="mt-5 space-y-3">
                    <SettingsToggle name="newComment" checked={settings.newComment} onChange={handleChange} title="New comments" description="Get notified when a visitor submits a new comment." />
                    <SettingsToggle name="newUser" checked={settings.newUser} onChange={handleChange} title="New users" description="Get notified when a new user creates an account." />
                    <SettingsToggle name="newRecipe" checked={settings.newRecipe} onChange={handleChange} title="New recipes" description="Get notified when a new recipe is submitted or published." />
                    <SettingsToggle name="newsletter" checked={settings.newsletter} onChange={handleChange} title="Newsletter activity" description="Get notified about important newsletter activity." />
                </div>
            </div>
        </SettingsSection>
    );
}
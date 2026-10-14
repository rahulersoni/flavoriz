import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

export default function SecuritySettings({ settings, onChange, onSave, saving, isFirst, isLast, onNext, onPrevious }) {
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
            title="Security"
            description="Configure security and account preferences."
            onSubmit={onSave}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <div>
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Login protection</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Control how login attempts and failed authentication are handled.</p>

                <div className="mt-5 space-y-5">
                    <SettingsField label="Maximum login attempts" htmlFor="login-attempt-limit" description="Number of failed attempts allowed before temporary protection is triggered.">
                        <input id="login-attempt-limit" name="loginAttemptLimit" type="number" min="3" max="20" value={settings.loginAttemptLimit} onChange={handleChange} className="admin-input" />
                    </SettingsField>

                    <SettingsToggle name="requireStrongPasswords" checked={settings.requireStrongPasswords} onChange={handleChange} title="Strong passwords" description="Require users to choose stronger passwords." />
                    <SettingsToggle name="notifyFailedLogins" checked={settings.notifyFailedLogins} onChange={handleChange} title="Failed login notifications" description="Receive an alert when repeated failed login attempts are detected." />
                </div>
            </div>

            <div className="border-t border-admin-border pt-7 dark:border-gray-800">
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Sessions</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Control how long authenticated sessions remain active.</p>

                <div className="mt-5 space-y-5">
                    <SettingsField label="Session timeout" htmlFor="session-timeout" description="Users will be required to authenticate again after this period of inactivity.">
                        <select id="session-timeout" name="sessionTimeout" value={settings.sessionTimeout} onChange={handleChange} className="admin-input">
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="480">8 hours</option>
                        </select>
                    </SettingsField>

                    <SettingsToggle name="allowMultipleSessions" checked={settings.allowMultipleSessions} onChange={handleChange} title="Allow multiple sessions" description="Allow the same account to remain signed in on multiple devices." />
                </div>
            </div>

            <div className="rounded-admin-md border border-admin-primary/20 bg-admin-primary-soft p-4 dark:border-amber-400/20 dark:bg-amber-400/10">
                <p className="text-admin-xs font-admin-semibold text-admin-text dark:text-gray-100">Security reminder</p>
                <p className="mt-1 text-[10px] leading-relaxed text-admin-text-muted dark:text-gray-400">
                    Authentication, session handling and login protection will ultimately be enforced by the Express backend. These settings currently only represent the admin configuration UI.
                </p>
            </div>
        </SettingsSection>
    );
}
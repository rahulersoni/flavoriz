import SettingsField from "./SettingsField";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

export default function CommentSettings({ settings, onChange, onSave, saving, isFirst, isLast, onNext, onPrevious }) {
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
            title="Comment settings"
            description="Configure comment and moderation preferences."
            onSubmit={onSave}
            saving={saving}
            isFirst={isFirst}
            isLast={isLast}
            onNext={onNext}
            onPrevious={onPrevious}
        >
            <div>
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Comment behavior</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Choose how visitors can interact with your recipes and articles.</p>

                <div className="mt-5 space-y-3">
                    <SettingsToggle name="enableComments" checked={settings.enableComments} onChange={handleChange} title="Enable comments" description="Allow visitors to leave comments on your content." />
                    <SettingsToggle name="requireApproval" checked={settings.requireApproval} onChange={handleChange} title="Require approval" description="New comments must be approved before appearing publicly." />
                    <SettingsToggle name="allowReplies" checked={settings.allowReplies} onChange={handleChange} title="Allow replies" description="Allow users to reply to existing comments." />
                    <SettingsToggle name="allowLikes" checked={settings.allowLikes} onChange={handleChange} title="Allow likes" description="Allow users to like comments." />
                </div>
            </div>

            <div className="border-t border-admin-border pt-7 dark:border-gray-800">
                <h3 className="text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Moderation</h3>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-500">Configure basic comment moderation behavior.</p>

                <div className="mt-5 space-y-5">
                    <SettingsField label="Maximum comment length" htmlFor="max-comment-length" description="Maximum number of characters allowed in a comment.">
                        <input id="max-comment-length" name="maxCommentLength" type="number" min="10" max="5000" value={settings.maxCommentLength} onChange={handleChange} className="admin-input" />
                    </SettingsField>

                    <SettingsToggle name="autoMarkSpam" checked={settings.autoMarkSpam} onChange={handleChange} title="Automatically flag spam" description="Automatically flag comments that appear to be spam." />
                </div>
            </div>
        </SettingsSection>
    );
}
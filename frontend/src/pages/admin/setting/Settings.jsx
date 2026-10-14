import { useEffect, useState } from "react";
import { Bell, ChefHat, MessageSquare, Palette, Settings as SettingsIcon, Shield } from "lucide-react";
import { toast } from "sonner";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import GeneralSettings from "../../../components/admin/settings/GeneralSettings";
import AppearanceSettings from "../../../components/admin/settings/AppearanceSettings";
import RecipeSettings from "../../../components/admin/settings/RecipeSettings";
import CommentSettings from "../../../components/admin/settings/CommentSettings";
import NotificationSettings from "../../../components/admin/settings/NotificationSettings";
import SecuritySettings from "../../../components/admin/settings/SecuritySettings";
import { defaultSettings } from "../../../config/settings";
import Reveal from "../../../components/Reveal";

const settingsSections = [
    { key: "general", label: "General", description: "Basic website settings", icon: SettingsIcon },
    { key: "appearance", label: "Appearance", description: "Customize your website", icon: Palette },
    { key: "recipes", label: "Recipes", description: "Recipe preferences", icon: ChefHat },
    { key: "comments", label: "Comments", description: "Comment moderation", icon: MessageSquare },
    { key: "notifications", label: "Notifications", description: "Email notifications", icon: Bell },
    { key: "security", label: "Security", description: "Security preferences", icon: Shield },
];

export default function Settings() {
    const [activeSection, setActiveSection] = useState(0);
    const [savedSettings, setSavedSettings] = useState(defaultSettings);
    const [draftSettings, setDraftSettings] = useState(defaultSettings);
    const [saving, setSaving] = useState(false);

    const hasUnsavedChanges = JSON.stringify(savedSettings) !== JSON.stringify(draftSettings);

    const currentSection = settingsSections[activeSection];
    const isFirst = activeSection === 0;
    const isLast = activeSection === settingsSections.length - 1;

    const updateSection = (section, values) => {
        setDraftSettings((current) => ({
            ...current,
            [section]: values,
        }));
    };

    const handleNext = () => {
        if (!isLast) {
            setActiveSection((current) => current + 1);
        }
    };

    const handlePrevious = () => {
        if (!isFirst) {
            setActiveSection((current) => current - 1);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        setSaving(true);

        try {
            // Temporary until API is implemented.
            await new Promise((resolve) => setTimeout(resolve, 500));

            setSavedSettings(draftSettings);

            toast.success("Settings saved successfully.");
        } catch (error) {
            console.error("Failed to save settings:", error);
            toast.error("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!hasUnsavedChanges) {
                return;
            }

            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const renderActiveSection = () => {
        const sectionProps = {
            settings: draftSettings[currentSection.key],
            saving,
            isFirst,
            isLast,
            onNext: handleNext,
            onPrevious: handlePrevious,
            onChange: (values) => updateSection(currentSection.key, values),
            onSave: handleSave,
        };

        switch (currentSection.key) {
            case "general":
                return <GeneralSettings {...sectionProps} />;

            case "appearance":
                return <AppearanceSettings {...sectionProps} />;

            case "recipes":
                return <RecipeSettings {...sectionProps} />;

            case "comments":
                return <CommentSettings {...sectionProps} />;

            case "notifications":
                return <NotificationSettings {...sectionProps} />;

            case "security":
                return <SecuritySettings {...sectionProps} />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-admin-bg font-admin-sans dark:bg-gray-950">
            <AdminSidebar />

            <div className="lg:pl-admin-sidebar">
                <AdminHeader />

                <main className="p-4 sm:p-6">
                    <Reveal>
                        <div className="mb-6">
                            <h1 className="text-admin-2xl font-admin-bold text-admin-text dark:text-gray-100">
                                Settings
                            </h1>

                            <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                                Manage your website and application preferences.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                            {settingsSections.map((section, index) => {
                                const Icon = section.icon;
                                const isActive = index === activeSection;

                                return (
                                    <button
                                        key={section.key}
                                        type="button"
                                        onClick={() => setActiveSection(index)}
                                        className={`flex shrink-0 items-center gap-2 rounded-admin-md px-3 py-2 text-admin-sm font-admin-semibold transition ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "bg-admin-card text-admin-text-muted hover:bg-admin-surface dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                                    >
                                        <Icon size={16} />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>

                    <Reveal delay={0.14}>
                        <div className="mb-5 flex items-center gap-2">
                            <div className={`size-2 rounded-full ${hasUnsavedChanges ? "bg-admin-warning" : "bg-admin-success"}`} />
                            <span className="text-admin-xs text-admin-text-muted dark:text-gray-400">
                                {hasUnsavedChanges ? "You have unsaved changes" : "All changes saved"}
                            </span>
                        </div>
                    </Reveal>

                    <Reveal key={currentSection.key} delay={0.2}>
                        {renderActiveSection()}
                    </Reveal>
                </main>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";

export default function UserAvatarField({ value, onChange }) {
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!value) {
            setPreview("");
            return;
        }

        const url = URL.createObjectURL(value);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [value]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            event.target.value = "";
            return;
        }

        onChange(file);
    };

    const removeImage = () => {
        onChange(null);
    };

    return (
        <div>
            <label className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Profile photo</label>

            <div className="flex items-center gap-4">
                <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full border border-admin-border bg-admin-surface dark:border-gray-700 dark:bg-gray-800">
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="size-full object-cover" />
                            <button type="button" onClick={removeImage} className="absolute inset-0 grid place-items-center bg-black/50 text-white opacity-0 transition hover:opacity-100" aria-label="Remove profile photo">
                                <X size={18} />
                            </button>
                        </>
                    ) : (
                        <ImagePlus size={22} className="text-admin-text-soft dark:text-gray-500" />
                    )}
                </div>

                <div>
                    <label htmlFor="user-avatar" className="inline-flex cursor-pointer rounded-admin-md border border-admin-border bg-admin-card px-4 py-2.5 text-admin-xs font-admin-semibold text-admin-text transition hover:bg-admin-surface dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800">
                        Upload photo
                        <input id="user-avatar" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>

                    <p className="mt-2 text-admin-xs text-admin-text-muted dark:text-gray-500">JPG, PNG or WebP. Recommended 400 × 400px.</p>
                </div>
            </div>
        </div>
    );
}
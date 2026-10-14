import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function RecipeShareButton({
    title,
    description = "",
    className = "",
    iconSize = 17,
}) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;

        const shareData = {
            title,
            text: description || `Check out ${title} on Flavoriz!`,
            url,
        };

        // Use native sharing on supported devices.
        if (
            typeof navigator.share === "function" &&
            (!navigator.canShare || navigator.canShare(shareData))
        ) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                // A user cancelling the share dialog is normal.
                if (error.name === "AbortError") return;
            }
        }

        // Try the modern clipboard API.
        try {
            if (navigator.clipboard?.writeText && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
                return;
            }
        } catch {
            // Continue to the fallback.
        }

        // Fallback for browsers without clipboard access.
        try {
            const textarea = document.createElement("textarea");
            textarea.value = url;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();

            const success = document.execCommand("copy");
            textarea.remove();

            if (success) {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
                return;
            }
        } catch {
            // Continue to the final fallback.
        }

        window.prompt("Copy this recipe link:", url);
    };

    return (
        <button
            type="button"
            onClick={handleShare}
            className={className}
            aria-label={copied ? "Recipe link copied" : "Share recipe"}
            title={copied ? "Link copied!" : "Share recipe"}
        >
            {copied ? (
                <Check size={iconSize} />
            ) : (
                <Share2 size={iconSize} />
            )}
        </button>
    );
}
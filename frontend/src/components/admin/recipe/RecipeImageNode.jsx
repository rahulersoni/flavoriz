import { NodeViewWrapper } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Maximize2 } from "lucide-react";

const widthOptions = [
    { label: "25%", value: "25%" },
    { label: "50%", value: "50%" },
    { label: "75%", value: "75%" },
    { label: "Full", value: "100%" },
];

export default function RecipeImageNode({ node, updateAttributes, selected }) {
    const { src, alt, width = "100%", align = "center" } = node.attrs;

    const alignmentStyles = {
        left: {
            marginLeft: "0",
            marginRight: "auto",
        },
        center: {
            marginLeft: "auto",
            marginRight: "auto",
        },
        right: {
            marginLeft: "auto",
            marginRight: "0",
        },
    };

    return (
        <NodeViewWrapper className="my-5" style={{ width: "100%" }}>
            <div className="relative max-w-full" style={{ width, ...alignmentStyles[align] }}>
                <img
                    src={src}
                    alt={alt || ""}
                    style={{ display: "block", width: "100%", height: "auto" }}
                    className={`rounded-admin-lg object-cover ${selected ? "ring-2 ring-admin-primary ring-offset-2 dark:ring-amber-400" : ""}`}
                />

                {selected && (
                    <div className="absolute left-1/2 top-2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-admin-lg border border-admin-border bg-admin-card p-1 shadow-admin-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-none">
                        <button
                            type="button"
                            title="Align left"
                            onClick={() => updateAttributes({ align: "left" })}
                            className={`flex h-8 w-8 items-center justify-center rounded-admin-md transition ${align === "left" ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}
                        >
                            <AlignLeft size={15} />
                        </button>

                        <button
                            type="button"
                            title="Align center"
                            onClick={() => updateAttributes({ align: "center" })}
                            className={`flex h-8 w-8 items-center justify-center rounded-admin-md transition ${align === "center" ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}
                        >
                            <AlignCenter size={15} />
                        </button>

                        <button
                            type="button"
                            title="Align right"
                            onClick={() => updateAttributes({ align: "right" })}
                            className={`flex h-8 w-8 items-center justify-center rounded-admin-md transition ${align === "right" ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}
                        >
                            <AlignRight size={15} />
                        </button>

                        <div className="mx-1 h-5 w-px bg-admin-border dark:bg-gray-700" />

                        <Maximize2 size={14} className="mx-1 text-admin-text-soft dark:text-gray-500" />

                        {widthOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                title={`Image width ${option.label}`}
                                onClick={() => updateAttributes({ width: option.value })}
                                className={`rounded-admin-sm px-2 py-1.5 text-[10px] font-admin-bold transition ${width === option.value ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}
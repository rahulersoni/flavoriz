import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { RecipeImage } from "./RecipeImageExtension";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Minus, Quote, Redo2, Strikethrough, Undo2 } from "lucide-react";

function ToolbarButton({ onClick, active = false, disabled = false, title, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-admin-md transition ${active ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"} disabled:cursor-not-allowed disabled:opacity-40`}
        >
            {children}
        </button>
    );
}

export default function RecipeEditor({ value = "", onChange }) {
    const imageInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            RecipeImage.configure({
                inline: false,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph", "listItem", "blockquote"],
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[350px] px-5 py-5 outline-none text-admin-text dark:text-gray-100",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl || "");

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;

            editor.chain().focus().setImage({
                src: imageUrl,
                alt: file.name,
                width: "100%",
                align: "center",
            }).run();
        };

        reader.readAsDataURL(file);
        event.target.value = "";
    };

    return (
        <section className="mt-6 border-t border-admin-border pt-6 dark:border-gray-800">
            <div className="mb-5">
                <h4 className="text-admin-base font-admin-bold text-admin-text dark:text-gray-100">
                    Recipe Content
                </h4>

                <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                    Write the main content and description of your recipe.
                </p>
            </div>

            <div className="overflow-hidden rounded-admin-lg border border-admin-border bg-admin-card dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-wrap items-center gap-1 border-b border-admin-border bg-admin-surface p-2 dark:border-gray-800 dark:bg-gray-800/60">

                    <button type="button" title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`h-9 rounded-admin-md px-2.5 text-admin-xs font-admin-bold transition ${editor.isActive("heading", { level: 2 }) ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-card hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"}`}>
                        H2
                    </button>

                    <button type="button" title="Heading 3"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`h-9 rounded-admin-md px-2.5 text-admin-xs font-admin-bold transition ${editor.isActive("heading", { level: 3 }) ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-card hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"}`}
                    >
                        H3
                    </button>

                    <div className="mx-1 h-6 w-px bg-admin-border dark:bg-gray-700" />

                    <ToolbarButton
                        title="Bold"
                        active={editor.isActive("bold")}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Italic"
                        active={editor.isActive("italic")}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Strikethrough"
                        active={editor.isActive("strike")}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                    >
                        <Strikethrough size={16} />
                    </ToolbarButton>

                    <div className="mx-1 h-6 w-px bg-admin-border dark:bg-gray-700" />

                    <ToolbarButton
                        title="Align left"
                        active={editor.isActive({ textAlign: "left" })}
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    >
                        <AlignLeft size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Align center"
                        active={editor.isActive({ textAlign: "center" })}
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    >
                        <AlignCenter size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Align right"
                        active={editor.isActive({ textAlign: "right" })}
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    >
                        <AlignRight size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Justify"
                        active={editor.isActive({ textAlign: "justify" })}
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    >
                        <AlignJustify size={16} />
                    </ToolbarButton>

                    <div className="mx-1 h-6 w-px bg-admin-border dark:bg-gray-700" />

                    <ToolbarButton
                        title="Bullet List"
                        active={editor.isActive("bulletList")}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <List size={18} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Numbered List"
                        active={editor.isActive("orderedList")}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOrdered size={18} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Blockquote"
                        active={editor.isActive("blockquote")}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <Quote size={17} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Horizontal Rule"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    >
                        <Minus size={18} />
                    </ToolbarButton>

                    <div className="mx-1 h-6 w-px bg-admin-border dark:bg-gray-700" />

                    <ToolbarButton
                        title="Add Link"
                        active={editor.isActive("link")}
                        onClick={addLink}
                    >
                        <LinkIcon size={17} />
                    </ToolbarButton>

                    <ToolbarButton title="Upload Image" onClick={handleImageClick}>
                        <ImageIcon size={17} />
                    </ToolbarButton>

                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <div className="mx-1 h-6 w-px bg-admin-border dark:bg-gray-700" />

                    <ToolbarButton
                        title="Undo"
                        disabled={!editor.can().undo()}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo2 size={17} />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Redo"
                        disabled={!editor.can().redo()}
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo2 size={17} />
                    </ToolbarButton>
                </div>

                <EditorContent editor={editor} />
            </div>
        </section>
    );
}
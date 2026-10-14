import { useEffect, useRef, useState } from "react";
import { Edit3, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CommentActions({ comment, onDelete }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeMenu = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        closeMenu();
        onDelete?.(comment);
    };

    const postUrl = `/recipes/${comment.postSlug}`;

    return (
        <div ref={containerRef} className="relative">
            <button type="button" onClick={() => setOpen((current) => !current)} className={`grid size-8 place-items-center rounded-admin-md text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 ${open ? "bg-admin-surface text-admin-text dark:bg-gray-800 dark:text-gray-100" : ""}`} aria-label={`Actions for comment by ${comment.author}`} aria-expanded={open}>
                <MoreHorizontal size={17} />
            </button>

            <div className={`absolute right-0 top-full z-30 w-40 pt-2 transition-all duration-200 ease-out ${open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}>
                <div className={`overflow-hidden rounded-admin-lg border border-admin-border bg-admin-card p-1.5 shadow-admin-lg transition-transform duration-200 ease-out dark:border-gray-800 dark:bg-gray-900 dark:shadow-none ${open ? "translate-y-0" : "translate-y-2"}`}>
                    <Link to={postUrl} onClick={closeMenu} className="flex items-center gap-2.5 rounded-admin-md px-3 py-2 text-admin-xs font-admin-semibold text-admin-text transition hover:bg-admin-surface dark:text-gray-200 dark:hover:bg-gray-800">
                        <Eye size={14} />
                        View post
                    </Link>

                    <Link to={`/admin/comments/edit/${comment.id}`} onClick={closeMenu} className="flex items-center gap-2.5 rounded-admin-md px-3 py-2 text-admin-xs font-admin-semibold text-admin-text transition hover:bg-admin-surface dark:text-gray-200 dark:hover:bg-gray-800">
                        <Edit3 size={14} />
                        Edit
                    </Link>

                    <div className="my-1 border-t border-admin-border dark:border-gray-800" />

                    <button type="button" onClick={handleDelete} className="flex w-full items-center gap-2.5 rounded-admin-md px-3 py-2 text-left text-admin-xs font-admin-semibold text-red-500 transition hover:bg-red-500/10 dark:text-red-400">
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
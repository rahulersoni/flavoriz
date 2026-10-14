import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    MessageCircle,
    Search,
    UtensilsCrossed,
    Trash2,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export default function AccountComments() {

    const {
        user,
        isAuthenticated,
        comments,
        deleteComment,
    } = useAuth();

    const [search, setSearch] = useState("");

    const userComments = useMemo(() => {
        return comments.filter(
            (comment) => Number(comment.userId) === Number(user?.id)
        );
    }, [comments, user?.id]);

    const filteredComments = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return userComments;

        return userComments.filter((comment) =>
            [
                comment.recipeTitle,
                comment.content,
                comment.date,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [userComments, search]);

    if (!isAuthenticated) {
        return <Navigate to="/account" replace />;
    }


    const handleDeleteComment = (commentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmed) return;

        const result = deleteComment(commentId);

        if (!result?.success) {
            toast.error(result?.message || "Could not delete comment.");
        }
    };


    return (
        <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* Breadcrumb */}
                <Link
                    to="/account"
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                {/* Page Header */}
                <section className="flex flex-col justify-between gap-5 rounded-3xl bg-white p-6 shadow-sm dark:bg-stone-900 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                <MessageCircle size={23} />
                            </div>

                            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                                YOUR CONVERSATIONS
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            My Comments
                        </h1>

                        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                            View and manage your recipe discussions.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl bg-stone-50 px-5 py-4 dark:bg-stone-800 sm:self-center">
                        <MessageCircle
                            size={21}
                            className="text-sky-600 dark:text-sky-400"
                        />

                        <div>
                            <p className="text-2xl font-bold">
                                {userComments.length}
                            </p>

                            <p className="text-xs text-stone-500 dark:text-stone-400">
                                {userComments.length === 1
                                    ? "Comment"
                                    : "Comments"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search */}
                <section className="space-y-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                Your Activity
                            </h2>

                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                                {search.trim()
                                    ? `${filteredComments.length} ${filteredComments.length === 1
                                        ? "comment"
                                        : "comments"
                                    } found`
                                    : "Comments you've shared on recipes."}
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search comments..."
                                aria-label="Search comments"
                                className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-stone-700 dark:bg-stone-900"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Comments List */}
                    {filteredComments.length > 0 ? (
                        <div className="space-y-4">
                            {filteredComments.map((comment) => (
                                <article
                                    key={comment.id}
                                    className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                            <MessageCircle size={20} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                                                        Comment on
                                                    </p>

                                                    <h3 className="mt-1 font-bold">
                                                        {comment.recipeTitle ||
                                                            "Recipe"}
                                                    </h3>
                                                </div>

                                                <span className="shrink-0 text-xs text-stone-500 dark:text-stone-400">
                                                    {comment.date || "Date unavailable"}
                                                </span>
                                            </div>

                                            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-stone-600 dark:text-stone-300">
                                                {comment.content}
                                            </p>

                                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 dark:border-stone-800">
                                                <Link
                                                    to={`/recipe/${comment.recipeSlug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-800 dark:text-amber-400"
                                                >
                                                    <UtensilsCrossed size={16} />
                                                    View Recipe
                                                    <ArrowRight size={15} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteComment(comment.id)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-5 py-16 text-center dark:border-stone-700 dark:bg-stone-900">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                <MessageCircle size={28} />
                            </div>

                            <h3 className="mt-5 text-xl font-bold">
                                {search
                                    ? "No comments found"
                                    : "No comments yet"}
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
                                {search
                                    ? "Try searching for another recipe or comment."
                                    : "Share your thoughts on a recipe, and your comments will appear here."}
                            </p>

                            {search ? (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold transition hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                                >
                                    <X size={16} />
                                    Clear Search
                                </button>
                            ) : (
                                <Link
                                    to="/recipes"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                                >
                                    Explore Recipes
                                    <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
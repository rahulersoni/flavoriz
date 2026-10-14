import { useState } from 'react';
import { motion } from "motion/react";
import Reveal from '../../Reveal';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner';

const RecipeComments = ({ recipe, recipeComments }) => {

    const [submitted, setSubmitted] = useState(false);

    const { user, isAuthenticated, addComment, deleteComment } = useAuth();

    function handleComment(event) {
        event.preventDefault();

        if (!isAuthenticated || !recipe) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        const content = String(formData.get("comment") || "").trim();

        if (content.length < 2 || content.length > 2000) {
            toast.error('Comments error');
            return;
        };

        const result = addComment(recipe.id, content);

        if (result?.success) {
            form.reset();
            setSubmitted(true);
        }
    }

    return (
        <Reveal delay={0.18}>
            <section id="comments" className="mt-14">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                            Join the conversation
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">
                            Cooking <span className="text-primary">Comments</span>
                        </h2>
                    </div>

                    <span className="text-sm text-muted">
                        {recipeComments.length} comments
                    </span>
                </div>

                {recipeComments.length > 0 ? (
                    <div className="mt-7 space-y-4">
                        {recipeComments.map((comment) => {
                            const canDelete =
                                user &&
                                (user.role === "admin" ||
                                    Number(comment.userId) === Number(user.id));

                            return (
                                <article
                                    key={comment.id}
                                    className="rounded-lg border border-border bg-surface p-6 md:p-8"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-muted font-bold text-primary">
                                                {(comment.userName || "User")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">
                                                <h4 className="font-bold">
                                                    {comment.userName || "User"}
                                                </h4>
                                                <p className="mt-1 text-xs text-soft">
                                                    {comment.date ||
                                                        (comment.createdAt
                                                            ? new Date(
                                                                comment.createdAt
                                                            ).toLocaleDateString()
                                                            : "")}
                                                </p>
                                            </div>
                                        </div>

                                        {canDelete && (
                                            <button
                                                type="button"
                                                onClick={() => deleteComment(comment.id)}
                                                className="shrink-0 text-sm font-semibold text-red-500 hover:text-red-600"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>

                                    <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted">
                                        {comment.content}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-7 rounded-lg border border-border bg-surface p-6 text-sm text-muted md:p-8">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}

                <div className="mt-6 rounded-lg bg-muted p-6 md:p-8">
                    {isAuthenticated ? (
                        <form onSubmit={handleComment}>
                            <h3 className="text-xl font-bold">Leave a comment</h3>

                            <p className="mt-1 text-sm text-muted">
                                Commenting as {user?.name || user?.displayName || "member"}.
                            </p>

                            <label className="mt-6 block">
                                <span className="mb-2 block text-sm font-semibold">
                                    Comment
                                </span>

                                <textarea
                                    name="comment"
                                    required
                                    minLength={2}
                                    maxLength={2000}
                                    rows={5}
                                    onChange={() => setSubmitted(false)}
                                    placeholder="Tell us what you think..."
                                    className="w-full resize-y rounded-2xl border border-border bg-bg px-4 py-3 text-text outline-none transition placeholder:text-soft focus:border-primary focus:ring-4 focus:ring-primary/10"
                                />
                            </label>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-soft">
                                    Please keep your comments respectful and relevant.
                                </p>

                                <button type="submit" className="btn-dark">
                                    Post Comment <MessageCircle size={16} />
                                </button>
                            </div>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 text-sm font-semibold"
                                >
                                    <Check size={17} className="text-primary" />
                                    Your comment was added successfully.
                                </motion.div>
                            )}
                        </form>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold">Join the conversation</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                Please log in to leave a comment on this recipe.
                            </p>
                            <Link to="/login" className="btn-dark mt-5 inline-flex">
                                Log in to comment <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </Reveal>
    )
}

export default RecipeComments
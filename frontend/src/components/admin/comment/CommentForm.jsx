import { Controller } from "react-hook-form";
import { usersData } from "../../../data/users";
import { recipesData } from "../../../data/recipe";

export default function CommentForm({
    control,
    register,
    errors,
    content,
    heading = "Comment information",
    description = "Choose the user and post, then enter the comment content.",
}) {
    return (
        <section className="admin-card p-5 sm:p-6">
            <div className="mb-6">
                <h2 className="text-admin-lg font-admin-bold text-admin-text dark:text-gray-100">{heading}</h2>
                <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">{description}</p>
            </div>

            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label htmlFor="comment-user" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">User</label>
                        <select id="comment-user" {...register("userId", { required: "Please select a user" })} className={`admin-input ${errors.userId ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}>
                            <option value="">Select user</option>
                            {usersData.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} — {user.email}
                                </option>
                            ))}
                        </select>
                        {errors.userId && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.userId.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="comment-post" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Post</label>
                        <select id="comment-post" {...register("postId", { required: "Please select a post" })} className={`admin-input ${errors.postId ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}>
                            <option value="">Select post</option>
                            {recipesData.map((recipe) => (
                                <option key={recipe.id} value={recipe.id}>
                                    {recipe.title}
                                </option>
                            ))}
                        </select>
                        {errors.postId && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.postId.message}</p>}
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <label htmlFor="comment-content" className="block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Comment</label>
                        <span className="text-[10px] font-admin-medium text-admin-text-soft dark:text-gray-500">{content.length}/1000</span>
                    </div>

                    <textarea
                        id="comment-content"
                        rows={7}
                        maxLength={1000}
                        {...register("content", {
                            required: "Comment content is required",
                            minLength: { value: 3, message: "Comment must be at least 3 characters" },
                        })}
                        placeholder="Write the comment..."
                        className={`w-full resize-y rounded-admin-md border border-admin-border bg-admin-card px-3 py-3 text-admin-sm leading-admin-relaxed text-admin-text outline-none transition placeholder:text-admin-text-soft focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 ${errors.content ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    />

                    {errors.content && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.content.message}</p>}
                </div>

                <div>
                    <label htmlFor="comment-status" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Status</label>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Please select a status" }}
                        render={({ field }) => (
                            <select {...field} id="comment-status" className={`admin-input ${errors.status ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="spam">Spam</option>
                            </select>
                        )}
                    />
                    {errors.status ? (
                        <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.status.message}</p>
                    ) : (
                        <p className="mt-2 text-admin-xs text-admin-text-muted dark:text-gray-500">Approved comments are visible on the selected post.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
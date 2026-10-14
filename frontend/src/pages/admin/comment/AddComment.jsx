import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import CommentForm from "../../../components/admin/comment/CommentForm";

const defaultValues = {
    userId: "",
    postId: "",
    content: "",
    status: "approved",
};

export default function AddComment() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onBlur",
    });

    const content = watch("content", "");

    const onSubmit = async (data) => {
        console.log("New comment:", data);
        toast.success("New Comment is added.");
        // Backend/API submission will be added later.
        navigate("/admin/comments");
    };

    return (
        <div className="admin-shell min-h-screen">
            <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0 lg:pl-[270px]">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                            <Link to="/admin/comments" className="mb-5 inline-flex items-center gap-2 text-admin-xs font-admin-semibold text-admin-text-muted transition hover:text-admin-text dark:text-gray-400 dark:hover:text-gray-100">
                                <ArrowLeft size={15} />
                                Back to comments
                            </Link>

                            <div className="mb-7">
                                <h1 className="text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">Add new comment</h1>
                                <p className="mt-2 max-w-[620px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">Create a comment and associate it with a Flavoriz user and post.</p>
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}>
                                <CommentForm control={control} register={register} errors={errors} content={content} heading="Create comment" description="Fill in the details for the new comment." />
                            </motion.div>

                            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                                <Link to="/admin/comments" className="admin-btn-secondary">Cancel</Link>

                                <button type="submit" disabled={isSubmitting} className="admin-btn-primary gap-2 disabled:pointer-events-none disabled:opacity-50">
                                    <Save size={16} />
                                    {isSubmitting ? "Creating..." : "Create comment"}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
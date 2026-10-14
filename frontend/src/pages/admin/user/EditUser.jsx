import { motion } from "motion/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Save } from "lucide-react";

import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import UserAvatarField from "../../../components/admin/user/UserAvatarField";
import UserRoleSelect from "../../../components/admin/user/UserRoleSelect";

import { usersData } from "../../../data/users";

const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "active",
    bio: "",
    avatar: null,
    bio: "Food enthusiast and home cook.",
};

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const password = watch("password");

    useEffect(() => {
        const user = usersData.find((item) => String(item.id) === String(id));

        if (!user) {
            setUserNotFound(true);
            return;
        }

        reset({
            name: user.name,
            email: user.email,
            password: "",
            confirmPassword: "",
            role: user.role,
            status: user.status,
            bio: user.bio || "",
            avatar: null,
        });
    }, [id, reset]);

    const onSubmit = async (data) => {
        console.log("Updated user:", {
            id,
            ...data,
        });
        toast.success("User is updated.");

        // Backend/API update will be added later.
        navigate("/admin/users");
    };

    if (userNotFound) {
        return (
            <div className="admin-shell min-h-screen">
                <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                    <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                    <div className="min-w-0 lg:pl-[270px]">
                        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                        <main className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
                            <div className="admin-card p-8 text-center">
                                <h1 className="text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">User not found</h1>
                                <p className="mt-2 text-admin-sm text-admin-text-muted dark:text-gray-400">The user you are trying to edit does not exist.</p>
                                <Link to="/admin/users" className="admin-btn-primary mt-5">Back to users</Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-shell min-h-screen">
            <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0 lg:pl-[270px]">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                            <Link to="/admin/users" className="mb-5 inline-flex items-center gap-2 text-admin-xs font-admin-semibold text-admin-text-muted transition hover:text-admin-text dark:text-gray-400 dark:hover:text-gray-100">
                                <ArrowLeft size={15} />
                                Back to users
                            </Link>

                            <div className="mb-7">
                                <h1 className="text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">Edit user</h1>
                                <p className="mt-2 max-w-[620px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">Update the user's account information, role and profile details.</p>
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="admin-card p-5 sm:p-6">
                                <div className="mb-6">
                                    <h2 className="text-admin-lg font-admin-bold text-admin-text dark:text-gray-100">Account information</h2>
                                    <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">Update the user's basic account information.</p>
                                </div>

                                <div className="space-y-6">
                                    <Controller
                                        name="avatar"
                                        control={control}
                                        render={({ field }) => <UserAvatarField value={field.value} onChange={field.onChange} />}
                                    />

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="user-name" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Full name</label>
                                            <input id="user-name" type="text" {...register("name", { required: "Name is required" })} className={`admin-input ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                                            {errors.name && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="user-email" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Email address</label>
                                            <input id="user-email" type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} className={`admin-input ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                                            {errors.email && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="rounded-admin-lg border border-admin-border bg-admin-surface p-4 dark:border-gray-800 dark:bg-gray-900">
                                        <p className="text-admin-xs font-admin-semibold text-admin-text dark:text-gray-100">Change password</p>
                                        <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">Leave both password fields empty if you don't want to change the current password.</p>

                                        <div className="mt-4 grid gap-5 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="user-password" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">New password</label>
                                                <div className="relative">
                                                    <input id="user-password" type={showPassword ? "text" : "password"} {...register("password", { minLength: { value: 8, message: "Password must be at least 8 characters" } })} placeholder="Enter new password" className={`admin-input pr-11 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                                                    <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-muted transition hover:text-admin-text dark:text-gray-500 dark:hover:text-gray-200" aria-label={showPassword ? "Hide password" : "Show password"}>
                                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.password.message}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="user-confirm-password" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Confirm new password</label>
                                                <div className="relative">
                                                    <input id="user-confirm-password" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword", { validate: (value) => !password || value === password || "Passwords do not match" })} placeholder="Confirm new password" className={`admin-input pr-11 ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                                                    <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-muted transition hover:text-admin-text dark:text-gray-500 dark:hover:text-gray-200" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.confirmPassword.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <Controller
                                            name="role"
                                            control={control}
                                            rules={{ required: "Please select a role" }}
                                            render={({ field }) => <UserRoleSelect value={field.value} onChange={field.onChange} error={errors.role?.message} />}
                                        />

                                        <div>
                                            <label htmlFor="user-status" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Account status</label>
                                            <select id="user-status" {...register("status")} className="admin-input">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="admin-card p-5 sm:p-6">
                                <div className="mb-5">
                                    <h2 className="text-admin-lg font-admin-bold text-admin-text dark:text-gray-100">Profile information</h2>
                                    <p className="mt-1 text-admin-xs text-admin-text-muted dark:text-gray-400">Update the user's public profile information.</p>
                                </div>

                                <div>
                                    <label htmlFor="user-bio" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Bio</label>
                                    <textarea id="user-bio" rows={5} {...register("bio", { maxLength: { value: 500, message: "Bio cannot exceed 500 characters" } })} placeholder="Write a short bio..." className={`w-full resize-y rounded-admin-md border border-admin-border bg-admin-card px-3 py-3 text-admin-sm text-admin-text outline-none transition placeholder:text-admin-text-soft focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 ${errors.bio ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                                    {errors.bio && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{errors.bio.message}</p>}
                                </div>
                            </motion.section>

                            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                                <Link to="/admin/users" className="admin-btn-secondary">Cancel</Link>
                                <button type="submit" disabled={isSubmitting} className="admin-btn-primary gap-2 disabled:pointer-events-none disabled:opacity-50">
                                    <Save size={16} />
                                    {isSubmitting ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    Mail,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AccountSettings() {
    const {
        user,
        isAuthenticated,
        daysAsMember,
        updateProfile,
    } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(user?.name || "");
        setEmail(user?.email || "");
    }, [user]);

    if (!isAuthenticated) {
        return <Navigate to="/account" replace />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = {};
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName) {
            nextErrors.name = "Please enter your name.";
        }

        if (
            !trimmedEmail ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ) {
            nextErrors.email = "Please enter a valid email address.";
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        const result = updateProfile({
            name: trimmedName,
            email: trimmedEmail,
        });

        if (result?.success) {
            setErrors({});
        }
    };

    const registeredDate = user?.createdAt
        ? new Date(user.createdAt)
        : null;

    const validRegisteredDate =
        registeredDate && !Number.isNaN(registeredDate.getTime());

    const formattedDate = validRegisteredDate
        ? registeredDate.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Not available";

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

                {/* Page Heading */}
                <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-stone-900 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                            <UserRound size={27} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-amber-600">
                                ACCOUNT SETTINGS
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight">
                                My Profile
                            </h1>

                            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                                Manage your personal information and account details.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.75fr]">

                    {/* Edit Profile */}
                    <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
                        <h2 className="text-xl font-bold">
                            Personal Information
                        </h2>

                        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                            Update the name and email associated with your account.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="profile-name"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                                    />

                                    <input
                                        id="profile-name"
                                        type="text"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(event) => {
                                            setName(event.target.value);
                                            setErrors((current) => ({
                                                ...current,
                                                name: "",
                                            }));
                                        }}
                                        className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-stone-700 dark:bg-stone-950"
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={
                                            errors.name ? "profile-name-error" : undefined
                                        }
                                    />
                                </div>

                                {errors.name && (
                                    <p
                                        id="profile-name-error"
                                        className="mt-2 text-sm text-red-600"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="profile-email"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                                    />

                                    <input
                                        id="profile-email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setErrors((current) => ({
                                                ...current,
                                                email: "",
                                            }));
                                        }}
                                        className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-stone-700 dark:bg-stone-950"
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={
                                            errors.email ? "profile-email-error" : undefined
                                        }
                                    />
                                </div>

                                {errors.email && (
                                    <p
                                        id="profile-email-error"
                                        className="mt-2 text-sm text-red-600"
                                    >
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-stone-100 pt-5 dark:border-stone-800">
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600 sm:w-auto"
                                >
                                    <Save size={17} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Account Details */}
                    <section className="space-y-6">
                        <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                            <h2 className="text-xl font-bold">
                                Account Details
                            </h2>

                            <div className="mt-5 space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                                        <CalendarDays size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">
                                            Member Since
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                        <Check size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">
                                            Membership Duration
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {daysAsMember}{" "}
                                            {daysAsMember === 1 ? "day" : "days"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
                                        <ShieldCheck size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">
                                            Account Role
                                        </p>
                                        <p className="mt-1 font-semibold capitalize">
                                            {user?.role || "subscriber"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                            <h3 className="font-bold">
                                Need to manage your activity?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                                Access your saved recipes, liked recipes, and comments from your account dashboard.
                            </p>

                            <Link
                                to="/account"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-800 dark:text-amber-400"
                            >
                                Go to Dashboard
                                <ArrowLeft size={16} className="rotate-180" />
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import Container from "../components/frontend/Container";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {

    const navigate = useNavigate();
    const { login, registerUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [mode, setMode] = useState(() => searchParams.get("mode") === "register" ? "register" : "login");

    const isRegister = mode === "register";

    useEffect(() => {
        setSearchParams(isRegister ? { mode: "register" } : {}, { replace: true });
    }, [isRegister, setSearchParams]);

    const switchMode = (nextMode) => {
        setMode(nextMode);
        reset();
    };

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: "",
            email: "demo@flavoriz.com",
            password: "password123",
            confirmPassword: "",
            remember: false,
        },
    });

    const password = watch("password");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {

        const result = isRegister ? registerUser(data) : login(data);

        if (!result.success) {
            console.log(result.message);
            return;
        }

        navigate("/");
    };

    return (
        <main className="min-h-[calc(100vh-76px)] bg-bg py-12 md:py-20">
            <Container>
                <div className="mx-auto grid max-w-[1080px] overflow-hidden rounded-[36px] border border-border bg-surface shadow-[var(--shadow-lg)] lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative hidden overflow-hidden bg-secondary p-10 text-bg lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative z-10">
                            <Link to="/" className="text-[22px] font-extrabold tracking-[-0.05em]">
                                FLAV<span className="text-primary">O</span>RIZ
                            </Link>
                        </div>

                        <div className="relative z-10 max-w-[390px]">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                Welcome to Flavoriz
                            </p>

                            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-[-0.045em] text-bg">
                                Good food starts with a good idea.
                            </h1>

                            <p className="mt-5 text-sm leading-7 text-bg/65">
                                Save your favorite recipes, discover new flavors and keep
                                everything you love in one place.
                            </p>
                        </div>

                        <p className="relative z-10 text-xs text-bg/45">
                            Cook. Discover. Share.
                        </p>
                    </div>

                    <div className="p-6 sm:p-10 md:p-12">
                        <div className="mx-auto max-w-[440px]">
                            <Reveal>
                                <div className="text-center">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                                        {isRegister ? "Create Account" : "Welcome Back"}
                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] md:text-4xl">
                                        {isRegister ? "Join Flavoriz." : "Sign in to Flavoriz."}
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-muted">
                                        {isRegister
                                            ? "Create an account and start building your personal recipe collection."
                                            : "Welcome back. Let's get you back to your favorite recipes."}
                                    </p>
                                </div>
                            </Reveal>

                            <div className="mt-8 grid grid-cols-2 rounded-full bg-muted p-1">
                                <button
                                    type="button"
                                    onClick={() => switchMode("login")}
                                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition-all ${!isRegister
                                        ? "bg-surface text-text shadow-sm"
                                        : "text-muted hover:text-text"
                                        }`}
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    onClick={() => switchMode("register")}
                                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition-all ${isRegister
                                        ? "bg-surface text-text shadow-sm"
                                        : "text-muted hover:text-text"
                                        }`}
                                >
                                    Register
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                <AnimatePresence mode="wait">
                                    {isRegister && (
                                        <motion.div
                                            key="register-name"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-semibold text-text">
                                                    Full Name
                                                </span>

                                                <div className="relative">
                                                    <UserRound
                                                        size={17}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Your name"
                                                        {...register("name", {
                                                            required: "Name is required",
                                                        })}
                                                        className="w-full rounded-2xl border border-border bg-bg py-3.5 pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                                    />
                                                </div>

                                                {errors.name && (
                                                    <p className="mt-1.5 text-xs text-red-500">
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </label>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <label className={`${isRegister ? "mt-5" : ""} block`}>
                                    <span className="mb-2 block text-sm font-semibold text-text">
                                        Email Address
                                    </span>

                                    <div className="relative">
                                        <Mail
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                                        />

                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^\S+@\S+\.\S+$/,
                                                    message: "Enter a valid email address",
                                                },
                                            })}
                                            className="w-full rounded-2xl border border-border bg-bg py-3.5 pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        />
                                    </div>

                                    {errors.email && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </label>

                                <label className="mt-5 block">
                                    <span className="mb-2 block text-sm font-semibold text-text">
                                        Password
                                    </span>

                                    <div className="relative">
                                        <LockKeyhole
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                                        />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: isRegister
                                                    ? {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters",
                                                    }
                                                    : undefined,
                                            })}
                                            className="w-full rounded-2xl border border-border bg-bg py-3.5 pl-11 pr-12 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((value) => !value)}
                                            className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-muted hover:text-text"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </label>

                                <AnimatePresence mode="wait">
                                    {isRegister && (
                                        <motion.label
                                            key="confirm-password"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-5 block overflow-hidden"
                                        >
                                            <span className="mb-2 block text-sm font-semibold text-text">
                                                Confirm Password
                                            </span>

                                            <div className="relative">
                                                <LockKeyhole
                                                    size={17}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                                                />

                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm your password"
                                                    {...register("confirmPassword", {
                                                        required: "Please confirm your password",
                                                        validate: (value) =>
                                                            value === password || "Passwords do not match",
                                                    })}
                                                    className="w-full rounded-2xl border border-border bg-bg py-3.5 pl-11 pr-12 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((value) => !value)}
                                                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-muted hover:text-text"
                                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff size={17} />
                                                    ) : (
                                                        <Eye size={17} />
                                                    )}
                                                </button>
                                            </div>

                                            {errors.confirmPassword && (
                                                <p className="mt-1.5 text-xs text-red-500">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </motion.label>
                                    )}
                                </AnimatePresence>

                                {!isRegister && (
                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <label className="flex items-center gap-2 text-xs font-medium text-muted">
                                            <input
                                                type="checkbox"
                                                {...register("remember")}
                                                className="size-4 accent-[var(--color-primary)]"
                                            />
                                            Remember me
                                        </label>

                                        <Link
                                            to="/forgot-password"
                                            className="text-xs font-bold text-text transition-colors hover:text-primary"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting
                                        ? "Please wait..."
                                        : isRegister
                                            ? "Create Account"
                                            : "Sign In"}
                                </button>
                            </form>

                            <p className="mt-7 text-center text-xs leading-5 text-muted">
                                {isRegister
                                    ? "Already have an account?"
                                    : "Don't have an account?"}{" "}
                                <button
                                    type="button"
                                    onClick={() => switchMode(isRegister ? "login" : "register")}
                                    className="font-bold text-text transition-colors hover:text-primary"
                                >
                                    {isRegister ? "Sign in" : "Create one"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
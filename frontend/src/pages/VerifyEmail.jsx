
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, AlertCircle, MailCheck, LoaderCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { verifyUser } = useAuth();

    const token = searchParams.get("token");

    const email = location.state?.email;

    const [status, setStatus] = useState(
        token ? "verifying" : "waiting"
    );

    const [message, setMessage] = useState("");

    const verificationStarted = useRef(false);

    useEffect(() => {
        if (!token || verificationStarted.current) return;

        verificationStarted.current = true;

        const verify = async () => {
            try {
                const response = await verifyUser({ token });

                setStatus("success");
                setMessage(
                    response.message ||
                    "Your email has been verified successfully."
                );
            } catch (error) {
                setStatus("error");

                setMessage(
                    error.response?.data?.message ||
                    "This verification link is invalid or has expired."
                );
            }
        };

        verify();
    }, [token]);

    const content = {
        waiting: {
            icon: MailCheck,
            title: "Check your inbox",
            description: email
                ? `We've sent a verification email to ${email}. Please check your inbox and click the verification link to activate your account.`
                : "We've sent you a verification email. Please check your inbox and click the verification link to activate your account.",
        },
        verifying: {
            icon: LoaderCircle,
            title: "Verifying your email",
            description:
                "Please wait while we verify your email address and activate your account.",
        },
        success: {
            icon: CheckCircle2,
            title: "Email verified!",
            description:
                message || "Your email address has been verified successfully. Your Flavoriz account is now active.",
        },
        error: {
            icon: AlertCircle,
            title: "Verification unsuccessful",
            description:
                message || "This verification link is invalid or has expired.",
        },
    };

    const current = content[status];
    const Icon = current.icon;

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12">

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Brand */}
                <Link
                    to="/"
                    className="block text-center mb-8"
                >
                    <span className="text-3xl font-extrabold tracking-tight">
                        Flavoriz<span className="text-[#f5a10b]">.</span>
                    </span>

                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        A little taste of inspiration
                    </p>
                </Link>

                {/* Card */}
                <div className="rounded-2xl border border-border p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] bg-surface">

                    {/* Icon */}
                    <div className="flex justify-center mb-7">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full ${status === "success"
                            ? "bg-green-50 text-green-600"
                            : status === "error"
                                ? "bg-red-50 text-red-500"
                                : "bg-[#fff3d8] text-[#d88b00]"
                            }`}>
                            <Icon
                                size={36}
                                strokeWidth={1.8}
                                className={status === "verifying" ? "animate-spin" : ""}
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">

                        <span className="inline-block rounded-full bg-[#fff3d8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#b87500]">
                            Account verification
                        </span>

                        <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight">
                            {current.title}
                        </h1>

                        <p className="mt-4 text-sm leading-7 text-gray-500">
                            {current.description}
                        </p>

                    </div>

                    {/* Waiting state */}
                    {status === "waiting" && (
                        <div className="mt-8 rounded-xl border border-[#f5e8cd] bg-[#fffaf0] p-4">
                            <p className="text-center text-sm leading-6 text-gray-600">
                                Didn't receive the email? Check your spam
                                folder as well.
                            </p>
                        </div>
                    )}

                    {/* Success state */}
                    {status === "success" && (
                        <Link
                            to="/account"
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f5a10b] px-6 py-4 text-sm font-bold text-[#17191c] transition hover:bg-[#d88b00]"
                        >
                            Continue to Login
                            <ArrowLeft className="rotate-180" size={17} />
                        </Link>
                    )}

                    {/* Error state */}
                    {status === "error" && (
                        <Link
                            to="/account?mode=register"
                            className="mt-8 flex w-full items-center justify-center rounded-lg bg-[#f5a10b] px-6 py-4 text-sm font-bold text-[#17191c] transition hover:bg-[#d88b00]"
                        >
                            Create a New Account
                        </Link>
                    )}

                    {/* Waiting / verifying state */}
                    {(status === "waiting" || status === "verifying") && (
                        <div className="mt-8 text-center">
                            {status === "verifying" && (
                                <span className="text-xs font-medium text-gray-400">
                                    This will only take a moment...
                                </span>
                            )}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#b87500]"
                    >
                        <ArrowLeft size={15} />
                        Back to Home
                    </Link>

                    <p className="mt-6 text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Flavoriz.
                        All rights reserved.
                    </p>
                </div>

            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;

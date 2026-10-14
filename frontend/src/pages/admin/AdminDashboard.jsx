import { useState } from "react";
import { BookOpen, Eye, Heart, MessageCircle, Plus, Users } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "../../components/Reveal";
import StatCard from "../../components/admin/StatCard";
import TopRecipes from "../../components/admin/TopRecipes";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ActivityFeed from "../../components/admin/ActivityFeed";
import ContentChart from "../../components/admin/ContentChart";
import TrafficChart from "../../components/admin/TrafficChart";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-shell">
            <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0 lg:pl-[270px]">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="mx-auto max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                        <Reveal className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end" y={15} duration={0.5}>
                            <div>
                                <p className="text-admin-xs font-admin-semibold uppercase tracking-[0.15em] text-admin-primary">
                                    Saturday · 3 October 2026
                                </p>

                                <h2 className="mt-2 text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">
                                    Good afternoon, Maria.
                                </h2>

                                <p className="mt-2 max-w-[650px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">
                                    Here’s what’s happening across Flavoriz today. Track your audience, content and community from one place.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button type="button" className="admin-btn-secondary">
                                    Export report
                                </button>
                                <Link to="/admin/recipes/add" className="admin-btn-primary">
                                    <Plus size={16} />
                                    Create recipe
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard label="Total visitors" value="87.4K" change="+12.8%" icon={Eye} />
                                <StatCard label="Registered users" value="24.8K" change="+8.4%" icon={Users} />
                                <StatCard label="Recipe engagement" value="18.6K" change="+14.2%" icon={Heart} />
                                <StatCard label="Comments" value="3,284" change="+5.7%" icon={MessageCircle} />
                            </section>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
                                <TrafficChart />
                                <ContentChart />
                            </section>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <section className="mt-5 flex flex-col gap-5 md:grid xl:grid-cols-[1fr_0.8fr]">
                                <TopRecipes />
                                <ActivityFeed />
                            </section>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <section className="mt-5">
                                <div className="admin-card rounded-[26px] p-5 sm:p-6">
                                    <p className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
                                        Quick actions
                                    </p>

                                    <h3 className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
                                        Keep Flavoriz moving
                                    </h3>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        {[
                                            [BookOpen, "New recipe", "Publish a recipe"],
                                            [MessageCircle, "Review comments", "Moderate community"],
                                            [Users, "Manage users", "View members"],
                                            [Eye, "Analytics", "Explore performance"],
                                        ].map(([Icon, title, text]) => (
                                            <motion.button
                                                key={title}
                                                type="button"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex items-center gap-3 rounded-admin-lg border border-admin-border p-4 text-left text-admin-text transition hover:border-admin-primary hover:bg-admin-primary-soft dark:border-gray-800 dark:bg-gray-900 dark:hover:border-admin-primary dark:hover:bg-amber-400/10"
                                            >
                                                <span className="grid size-10 shrink-0 place-items-center rounded-admin-md bg-admin-surface text-admin-primary dark:bg-gray-800">
                                                    <Icon size={17} />
                                                </span>

                                                <span>
                                                    <span className="block text-admin-xs font-admin-bold text-admin-text dark:text-gray-100">
                                                        {title}
                                                    </span>

                                                    <span className="mt-1 block text-[10px] text-admin-text-muted dark:text-gray-400">
                                                        {text}
                                                    </span>
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </Reveal>
                    </main>
                </div>
            </div>
        </div>
    );
}
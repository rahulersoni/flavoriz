import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Bookmark, Heart, MessageCircle, CalendarDays, ArrowRight, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AccountProfile() {
    const { user, daysAsMember, savedRecipes, likedRecipes, comments } = useAuth();

    const isAdmin = user?.role === "admin";
    const isAuthor = user?.role === "author";
    const userComments = comments.filter(
        (comment) => Number(comment.userId) === Number(user?.id)
    );

    const stats = [
        {
            label: "Saved Recipes",
            value: savedRecipes.length,
            icon: Bookmark,
            color: "text-amber-600 bg-amber-100",
            link: "/account/saved-recipes",
        },
        {
            label: "Liked Recipes",
            value: likedRecipes.length,
            icon: Heart,
            color: "text-rose-600 bg-rose-100",
            link: "/account/liked-recipes",
        },
        {
            label: "Comments",
            value: userComments.length,
            icon: MessageCircle,
            color: "text-sky-600 bg-sky-100",
            link: "/account/comments",
        },
        {
            label: "Days as Member",
            value: daysAsMember,
            icon: CalendarDays,
            color: "text-emerald-600 bg-emerald-100",
            link: "/account/profile",
        },
    ];

    const recentRecipes = [...savedRecipes].slice(-3).reverse();

    return (
        <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Welcome */}
                <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-stretch">


                    <div className="min-w-0 space-y-2">
                        <p className="text-sm font-medium text-amber-600">
                            YOUR FLAVORIZ ACCOUNT
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Welcome back, {user?.name?.split(" ")[0] || "Food Lover"}!
                        </h1>

                        <p className="text-sm text-stone-500 dark:text-stone-400">
                            Keep track of your favorite recipes and activity.
                        </p>
                    </div>

                    {(isAdmin || isAuthor) && (
                        <Link
                            to="/admin"
                            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 sm:self-center"
                        >
                            <LayoutDashboard size={18} />
                            {isAdmin ? "Admin Dashboard" : "Author Dashboard"}
                        </Link>
                    )}
                </section>


                {/* Statistics */}
                <section>
                    <div className="mb-5">
                        <h2 className="text-xl font-bold">Your Activity</h2>
                        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                            A snapshot of your Flavoriz journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <Link
                                    key={stat.label}
                                    to={stat.link}
                                    className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-stone-500 dark:text-stone-400">
                                                {stat.label}
                                            </p>

                                            <p className="mt-3 text-3xl font-bold">
                                                {stat.value}
                                            </p>
                                        </div>

                                        <div className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}>
                                            <Icon size={21} />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
                                        <span>View details</span>
                                        <ArrowRight
                                            size={15}
                                            className="transition group-hover:translate-x-1"
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Recently Saved Recipes */}
                <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:p-6">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold">
                                Recently Saved
                            </h2>
                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                                Recipes you've bookmarked for later.
                            </p>
                        </div>

                        <Link
                            to="/account/saved-recipes"
                            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400"
                        >
                            View all
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {recentRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {recentRecipes.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    to={`/recipe/${recipe.slug}`}
                                    className="group flex items-center gap-4 rounded-xl border border-stone-100 p-3 transition hover:border-amber-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800"
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="size-20 shrink-0 rounded-lg object-cover"
                                        loading="lazy"
                                    />

                                    <div className="min-w-0">
                                        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                            {recipe.category}
                                        </span>

                                        <h4 className="mt-1 line-clamp-2 font-semibold transition group-hover:text-amber-700 dark:group-hover:text-amber-400">
                                            {recipe.title}
                                        </h4>

                                        <span className="mt-2 inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                                            <Clock size={13} />
                                            Saved recipe
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl bg-stone-50 px-5 py-10 text-center dark:bg-stone-800">
                            <Bookmark size={30} className="mx-auto text-stone-400" />
                            <h3 className="mt-3 font-semibold">
                                No saved recipes yet
                            </h3>
                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                                Save recipes you love and find them here.
                            </p>
                            <Link
                                to="/recipes"
                                className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
                            >
                                Browse Recipes
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Heart, HeartOff, Search, UtensilsCrossed, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LikedRecipes() {

    const { isAuthenticated, likedRecipes, likeRecipe } = useAuth();
    const [search, setSearch] = useState("");

    const filteredRecipes = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return likedRecipes;

        return likedRecipes.filter((recipe) =>
            [recipe.title, recipe.category]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [likedRecipes, search]);

    if (!isAuthenticated) {
        return <Navigate to="/account" replace />;
    }

    return (
        <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">

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
                            <div className="flex size-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                                <Heart size={23} />
                            </div>

                            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                                YOUR FAVORITES
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Liked Recipes
                        </h1>

                        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                            All the recipes you've enjoyed, gathered in one place.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl bg-stone-50 px-5 py-4 dark:bg-stone-800 sm:self-center">
                        <Heart
                            size={21}
                            className="text-rose-500"
                        />

                        <div>
                            <p className="text-2xl font-bold">
                                {likedRecipes.length}
                            </p>

                            <p className="text-xs text-stone-500 dark:text-stone-400">
                                {likedRecipes.length === 1
                                    ? "Liked recipe"
                                    : "Liked recipes"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search and Results */}
                <section className="space-y-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                Your Favorites
                            </h2>

                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                                {search.trim()
                                    ? `${filteredRecipes.length} ${filteredRecipes.length === 1
                                        ? "recipe"
                                        : "recipes"
                                    } found`
                                    : "Recipes you've liked."}
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
                                placeholder="Search liked recipes..."
                                aria-label="Search liked recipes"
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

                    {/* Recipe Grid */}
                    {filteredRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredRecipes.map((recipe) => (
                                <article
                                    key={recipe.id}
                                    className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
                                >
                                    {/* Recipe Image */}
                                    <Link
                                        to={`/recipes/${recipe.slug} `}
                                        className="relative block aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800"
                                    >
                                        {recipe.image ? (
                                            <img
                                                src={recipe.image}
                                                alt={recipe.title}
                                                loading="lazy"
                                                className="size-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center text-stone-400">
                                                <UtensilsCrossed size={36} />
                                            </div>
                                        )}

                                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm dark:bg-stone-950/90 dark:text-stone-200">
                                            {recipe.category || "Recipe"}
                                        </span>
                                    </Link>

                                    {/* Recipe Details */}
                                    <div className="space-y-4 p-4">
                                        <Link
                                            to={`/recipe/${recipe.slug}`}
                                            className="block"
                                        >
                                            <h4 className="line-clamp-2 min-h-12 font-bold leading-6 transition group-hover:text-rose-600 dark:group-hover:text-rose-400">
                                                {recipe.title}
                                            </h4>
                                        </Link>

                                        <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3 dark:border-stone-800">
                                            <Link
                                                to={`/ recipes / ${recipe.slug} `}
                                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 transition hover:text-amber-800 dark:text-amber-400"
                                            >
                                                View Recipe
                                                <ArrowRight size={15} />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => likeRecipe(recipe)}
                                                aria-label={`Unlike ${recipe.title} `}
                                                title="Remove like"
                                                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-rose-500 transition hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                                            >
                                                <HeartOff size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-5 py-16 text-center dark:border-stone-700 dark:bg-stone-900">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                                <Heart size={28} />
                            </div>

                            <h4 className="mt-5 text-xl font-bold">
                                {search
                                    ? "No recipes found"
                                    : "No liked recipes yet"}
                            </h4>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
                                {search
                                    ? "Try a different recipe title or category."
                                    : "Explore our recipes and tap the heart on the ones you love to find them here."}
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

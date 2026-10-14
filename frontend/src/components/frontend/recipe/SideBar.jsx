import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../Reveal";
import RecipeGlance from "./RecipeGlance";

const SideBar = ({ recipe, recipeComments, relatedRecipes }) => {

    return (
        <aside className="min-w-0 self-start">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-112px)] lg:pr-1 lg:[scrollbar-none] [&::-webkit-scrollbar]:hidden">
                <RecipeGlance recipe={recipe} recipeComments={recipeComments} />

                <Reveal delay={0.18}>
                    <div className="mt-6 rounded-lg border border-border bg-surface p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                Related <span className="text-primary">Recipes</span>
                            </h3>

                            <Link to={'/recipes'} ><ArrowRight size={18} /></Link>
                        </div>

                        <div className="mt-5 space-y-4">
                            {relatedRecipes?.length > 0 ? (
                                relatedRecipes.map((item) => (
                                    <Link
                                        to={`/recipe/${item.slug}`}
                                        key={item.id}
                                        className="group flex gap-3"
                                    >
                                        <div className="w-24 shrink-0 overflow-hidden rounded-2xl">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="min-w-0 py-1">
                                            <h4 className="text-sm font-bold leading-5 transition-colors group-hover:text-primary-hover">
                                                {item.title}
                                            </h4>

                                            <p className="mt-2 flex items-center gap-1 text-[11px] text-soft">
                                                <Eye size={12} />
                                                {item.views ?? 0} views
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-muted">No related recipes available yet.</p>
                            )}
                        </div>

                    </div>
                </Reveal>

                <Reveal delay={0.22}>
                    <div className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                            Join Flavoriz
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-text">
                            Discover your next favorite recipe.
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-muted">
                            Get fresh recipes, cooking tips and stories delivered to your inbox.
                        </p>

                        <Link to={'/recipes'} aria-label="View all recipes" className="btn-primary mt-5 w-full">
                            Explore Recipes <ArrowRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </aside>
    )
}

export default SideBar
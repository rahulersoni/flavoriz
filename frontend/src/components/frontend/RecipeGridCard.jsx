import { Eye, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { RecipeLikeButton } from "./RecipeActions";

export default function RecipeGridCard({ recipe }) {
    return (
        <Reveal y={22} duration={0.42} once className="h-full">
            <motion.article layout whileHover={{ y: -7 }}
                className="group overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                <div className="relative overflow-hidden">
                    <img src={recipe.image} alt={recipe.title} loading="lazy" className="recipe-image aspect-[0.9] w-full object-cover" />

                    <div className="absolute left-4 top-4 z-10 flex gap-2">
                        <span className="rounded-full bg-surface/95 px-3 py-1.5 text-[10px] font-bold text-text shadow-sm">
                            {recipe.categoryLabel}
                        </span>

                        {recipe.views && (
                            <span className="flex items-center gap-1 rounded-full bg-surface/95 px-3 py-1.5 text-[10px] font-bold text-text shadow-sm">
                                <Eye size={11} />
                                {recipe.views}
                            </span>
                        )}
                    </div>


                    <RecipeLikeButton recipe={recipe} className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-surface/95 shadow-sm" />

                    <div className="absolute inset-x-4 bottom-4 z-10">
                        <Link to={`/recipe/${recipe.slug}`}
                            className="flex items-center justify-between rounded-full bg-secondary px-4 py-2.5 text-[11px] font-bold text-bg transition-colors hover:bg-primary hover:text-[#171717]"
                        >
                            See Complete Recipe
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>

                <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                        {recipe.subcategory}
                    </p>

                    <h3 className="mt-2 text-xl font-bold leading-[1.1] tracking-[-0.035em]">
                        {recipe.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                        {recipe.description}
                    </p>
                </div>
            </motion.article >
        </Reveal>
    );
}
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { RecipeLikeButton, RecipeBookmarkButton } from "./RecipeActions";

export default function RecipeCard({ recipe, featured = false }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`recipe-card group relative overflow-hidden rounded-lg border border-border bg-surface ${featured ? "min-h-[520px]" : ""}`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-[520px]" : "h-[330px]"}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <span className="rounded-full bg-surface/95 px-3 py-1.5 text-xs font-bold text-text shadow-sm">
            {recipe.category}
          </span>

          {recipe.beginner && (
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-[#171717]">
              Beginner Friendly
            </span>
          )}
        </div>


        <RecipeLikeButton recipe={recipe} className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-surface/95  shadow-sm transition-transform hover:scale-105" />

        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
          <div className="mb-3 flex items-center gap-1 text-xs font-semibold text-white/85">
            <Star size={13} fill="currentColor" />
            {recipe.rating} · {recipe.time}
          </div>

          <h3 className="max-w-[520px] text-[clamp(1.55rem,3vw,2.35rem)] font-bold tracking-[-0.045em] text-white">
            {recipe.title}
          </h3>

          <Link to={`/recipe/${recipe.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-primary"
          >
            See Complete Recipe
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article >
  );
}
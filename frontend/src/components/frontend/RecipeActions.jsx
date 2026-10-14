import { Bookmark, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function RecipeLikeButton({ recipe, showCount = false, className = "" }) {
    const { isRecipeLiked, likeRecipe } = useAuth();

    if (!recipe?.id) return null;

    const liked = isRecipeLiked(recipe.id);

    return (
        <button
            type="button"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                likeRecipe(recipe.id);
            }}
            aria-label={liked ? "Unlike recipe" : "Like recipe"}
            aria-pressed={liked}
            title={liked ? "Unlike recipe" : "Like recipe"}
            className={`inline-flex items-center justify-center gap-2 transition-colors ${liked
                ? "text-red-500"
                : "text-text hover:text-red-500"
                } ${className}`}
        >
            <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
            />
            {showCount && (
                <span className="text-sm">
                    {recipe.likes ?? 0}
                </span>
            )}
        </button>
    );
}



export function RecipeBookmarkButton({
    recipe,
    className = "",
    showLabel = false,
}) {
    const { isRecipeSaved, saveRecipe } = useAuth();

    if (!recipe?.id) return null;

    const saved = isRecipeSaved(recipe.id);

    return (
        <button
            type="button"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                saveRecipe(recipe.id);
            }}
            aria-label={saved ? "Remove bookmark" : "Bookmark recipe"}
            aria-pressed={saved}
            title={saved ? "Remove bookmark" : "Bookmark recipe"}
            className={`inline-flex items-center justify-center gap-2 transition-colors ${saved
                ? "text-amber-500"
                : "text-text hover:text-amber-500"
                } ${className}`}
        >
            {showLabel && (
                <span>{saved ? "Saved Recipe" : "Save Recipe"}</span>
            )}

            <Bookmark
                size={18}
                fill={saved ? "currentColor" : "none"}
            />
        </button>
    );
}

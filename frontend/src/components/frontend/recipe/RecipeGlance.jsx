import Reveal from '../../Reveal'
import RecipeVideo from './RecipeVideo'
import { RecipeBookmarkButton } from '../RecipeActions'
import { Star } from 'lucide-react'

const RecipeGlance = ({ recipe, recipeComments }) => {
    const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

    return (
        <Reveal delay={0.12}>
            <div className="rounded-lg bg-muted p-5">
                <RecipeVideo
                    url={recipe.videoUrl}
                    poster={recipe.videoThumbnail || recipe.image}
                    title={`${recipe.title} cooking tutorial`}
                />

                <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        Recipe at a glance
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                        {recipe.title}
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-surface p-4">
                            <p className="text-xs text-soft">Total time</p>
                            <p className="mt-1 font-bold">{totalTime}</p>
                        </div>

                        <div className="rounded-2xl bg-surface p-4">
                            <p className="text-xs text-soft">Difficulty</p>
                            <p className="mt-1 font-bold">{recipe?.difficulty}</p>
                        </div>

                        <div className="rounded-2xl bg-surface p-4">
                            <p className="text-xs text-soft">Rating</p>

                            <p className="mt-1 flex items-center gap-1 font-bold">
                                <Star size={14} fill="currentColor" className="text-primary" />
                                {recipe.rating ?? "N/A"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-surface p-4">
                            <p className="text-xs text-soft">Servings</p>
                            <p className="mt-1 font-bold">{recipe?.servings} people</p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">
                                Reader engagement
                            </span>

                            <span className="text-xs text-soft">Today</span>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="font-bold">{recipe?.views ?? 0}</p>
                                <p className="text-[10px] text-soft">Views</p>
                            </div>

                            <div>
                                <p className="font-bold">
                                    {(recipe.likes ?? 0).toLocaleString()}
                                </p>
                                <p className="text-[10px] text-soft">Likes</p>
                            </div>

                            <div>
                                <p className="font-bold">{recipeComments?.length ?? 0}</p>
                                <p className="text-[10px] text-soft">
                                    Comments
                                </p>
                            </div>
                        </div>
                    </div>

                    <RecipeBookmarkButton
                        recipe={recipe}
                        showLabel
                        className="btn-primary mt-4 flex w-full items-center justify-center text-current hover:text-black dark:text-black"
                    />

                </div>
            </div>
        </Reveal>
    )
}

export default RecipeGlance
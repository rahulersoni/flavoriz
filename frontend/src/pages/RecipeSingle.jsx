import { useMemo } from "react";
import { motion } from "motion/react";
import { Navigate, useParams } from "react-router-dom";

import { Clock3, Eye, Heart, MessageCircle, Star, UsersRound } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { MetaItem } from "../components/frontend/recipe/MetaItem";
import Reveal from "../components/Reveal";
import { Stat } from "../components/frontend/recipe/Stat";
import Section from "../components/frontend/Section";
import RelatedPosts from "../components/frontend/recipe/RelatedPosts";
import Container from "../components/frontend/Container";
import RecipeShareButton from "../components/frontend/recipe/RecipeShareButton";
import { RecipeLikeButton, RecipeBookmarkButton } from "../components/frontend/RecipeActions";

import { getRecipeBySlug, relatedPosts } from "../data/recipe";
import SideBar from "../components/frontend/recipe/SideBar";
import DownloadRecipe from "../components/frontend/recipe/DownloadRecipe";
import RecipeComments from "../components/frontend/recipe/RecipeComments";


export default function RecipeSingle() {

    const { slug } = useParams();
    const recipe = getRecipeBySlug(slug);

    const { comments, isRecipeSaved } = useAuth();

    const recipeComments = useMemo(
        () => recipe ? comments.filter((comment) => comment.recipeId === recipe.id) : [],
        [comments, recipe]
    );

    const relatedRecipes = useMemo(
        () => (recipe ? relatedPosts(recipe.id) : []),
        [recipe]
    );

    const saved = recipe ? isRecipeSaved(recipe.id) : false;

    if (!recipe) {
        return <Navigate to="/recipes" replace />;
    }

    return (
        <main>
            {/* RECIPE HEADER */}
            <Section >
                <Container>
                    <Reveal>
                        <div className="overflow-hidden rounded-[34px] bg-muted">
                            <div className="relative min-h-107.5 md:min-h-127.5">
                                <img src={recipe.image} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover" />

                                <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/55 to-transparent md:from-bg/95 md:via-bg/35" />

                                <div className="relative flex min-h-107.5 max-w-162.5 flex-col justify-center px-7 py-14 md:min-h-127.5 md:px-12 lg:px-16">
                                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                                        Let's Cook
                                    </p>

                                    <h1 className="max-w-150 text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.94]">
                                        {recipe.title}
                                    </h1>

                                    <div className="mt-7 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-surface/95 px-4 py-2 text-xs font-bold shadow-sm">
                                            {recipe.category}
                                        </span>

                                        <span className="rounded-full bg-surface/95 px-4 py-2 text-xs font-bold shadow-sm">
                                            {recipe.rating} ★
                                        </span>
                                    </div>
                                </div>


                                <RecipeLikeButton recipe={recipe} className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-surface/95 text-text shadow-lg" />
                            </div>
                        </div>
                    </Reveal>

                    {/* RECIPE METADATA */}
                    <Reveal delay={0.08}>
                        <div className="grid gap-5 border-b border-border py-7 grid-cols-2 sm:grid-cols-5 lg:grid-cols-5">
                            <MetaItem icon={UsersRound} label="Servings" value={recipe.servings} />
                            <MetaItem icon={Clock3} label="Prep Time" value={recipe.prepTime} />
                            <MetaItem icon={Clock3} label="Cook Time" value={recipe.cookTime} />
                            <MetaItem icon={Star} label="Difficulty" value={recipe.difficulty} />
                            <MetaItem icon={Clock3} label="Reading Time" value={recipe.readingTime} />
                        </div>
                    </Reveal>

                    {/* SOCIAL / ENGAGEMENT */}
                    <Reveal delay={0.12}>
                        <div className="flex flex-col gap-5 border-b border-border py-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                <Stat icon={Eye} value={recipe.views ?? 0} label="Views" />
                                <Stat icon={Heart} value={`${(recipe.likes ?? 0).toLocaleString()}+`} label="Likes" />
                                <Stat icon={MessageCircle} value={recipeComments.length} label="Comments" />
                                <Stat icon={Clock3} value={recipe.readingTime} label="Reading" />
                            </div>

                            <div className="flex gap-2">

                                <RecipeBookmarkButton recipe={recipe} className={`grid size-10 place-items-center rounded-full border transition ${saved
                                    ? "border-primary bg-accent"
                                    : "border-border bg-surface"
                                    }`} />

                                <RecipeShareButton
                                    title={recipe.title}
                                    description={recipe.description}
                                    className="grid size-10 place-items-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primarying-button-classes"
                                />

                            </div>
                        </div>
                    </Reveal>
                </Container>

                {/* MAIN ARTICLE + SIDEBAR */}

                <Container className="pt-16">
                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px]">
                        {/* LEFT CONTENT */}
                        <article>
                            <Reveal>
                                <div className="max-w-none">
                                    <p className="text-base leading-7 text-muted md:text-lg">
                                        {recipe.description}
                                    </p>
                                </div>
                            </Reveal>

                            {/* AUTHOR */}

                            <DownloadRecipe recipe={recipe} />

                            {/* TAGS */}
                            <Reveal delay={0.1}>
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {(recipe.tags || []).map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>

                            {/* INGREDIENTS */}
                            <Reveal delay={0.12}>
                                <section className="mt-12 rounded-[30px] border border-border bg-surface p-6 shadow-sm md:p-8">
                                    <div className="mb-7 flex items-end justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                                                What you need
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold">Ingredients</h2>
                                        </div>

                                        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold">
                                            {recipe.servings} servings
                                        </span>
                                    </div>

                                    <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
                                        {(recipe.ingredients ?? []).map((ingredient, index) => (
                                            <div key={ingredient.id ?? index} className="flex gap-3 text-sm leading-6 text-muted">
                                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                                                {ingredient.quantity && ingredient.unit && (
                                                    <em className="shrink-0 text-primary">{ingredient.quantity} {ingredient.unit}</em>
                                                )}
                                                <span>{ingredient.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </Reveal>

                            {/* INSTRUCTIONS */}
                            <Reveal delay={0.14}>
                                <section className="mt-12">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                                        Step by step
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        Cooking <span className="text-primary">Instructions</span>
                                    </h2>

                                    <div className="mt-7 space-y-3">
                                        {(recipe.instructions ?? []).map((instruction, index) => (
                                            <motion.div
                                                key={instruction?.id || index}
                                                initial={{ opacity: 0, x: -18 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.25 }}
                                                transition={{ duration: 0.55, delay: index * 0.05 }}
                                                className="grid grid-cols-[58px_1fr] items-start gap-4 rounded-[20px] bg-muted p-5 md:grid-cols-[70px_1fr] md:p-6"
                                            >
                                                <span className="text-2xl font-bold text-primary">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <p className="pt-1 text-sm leading-6 text-muted md:text-base">
                                                    {instruction?.text}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            </Reveal>

                            {/* COMMENTS */}
                            <RecipeComments recipe={recipe} recipeComments={recipeComments} />
                        </article>

                        {/* RIGHT: STICKY COLUMN */}
                        <SideBar recipe={recipe} recipeComments={recipeComments} relatedRecipes={relatedRecipes} />

                    </div>
                </Container>

            </Section>

            {/* Related Posts */}
            <Section className="container-site">
                <RelatedPosts posts={relatedRecipes} />
            </Section>

        </main>
    );
}
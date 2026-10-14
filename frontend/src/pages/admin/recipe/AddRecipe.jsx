import { toast } from "sonner";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import RecipeDetails from "../../../components/admin/recipe/RecipeDetails";
import RecipePdfField from "../../../components/admin/recipe/RecipePdfField";
import RecipeTagsInput from "../../../components/admin/recipe/RecipeTagsInput";
import RecipeRepeater from "../../../components/admin/recipe/RecipeRepeater";
import RecipeCategorySelect from "../../../components/admin/recipe/RecipeCategorySelect";

const RecipeEditor = lazy(() => import("../../../components/admin/recipe/RecipeEditor"));

export default function AddRecipe() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            category: "",
            tags: [],
            servings: "",
            prepTime: "",
            cookTime: "",
            difficulty: "",
            ingredients: [""],
            instructions: [""],
            pdf: null,
            content: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Recipe data:", data);
        toast.success("Recipe is created.");
    };

    return (
        <div className="admin-shell min-h-screen">
            <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0 lg:pl-[270px]">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <Link to="/admin/recipes" className="mb-2 inline-flex items-center gap-2 text-admin-xs font-admin-semibold text-admin-text-muted transition-colors hover:text-admin-text dark:text-gray-400 dark:hover:text-gray-100">
                                    <ArrowLeft size={15} />
                                    Back to Recipes
                                </Link>

                                <h3 className="text-admin-2xl font-admin-bold tracking-tight text-admin-text sm:text-admin-3xl dark:text-gray-100">
                                    Add New Recipe
                                </h3>

                                <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                                    Create a new recipe and publish it to your website.
                                </p>
                            </div>
                        </div>

                        <form id="recipe-form" onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[1200px]">
                            <section className="admin-card p-5 sm:p-6 lg:p-8">
                                <div className="mb-6">
                                    <h4 className="text-admin-lg font-admin-bold text-admin-text dark:text-gray-100">
                                        Recipe Information
                                    </h4>

                                    <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                                        Add the basic information for your recipe.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="title" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                                        Recipe Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="Enter recipe title"
                                        {...register("title", {
                                            required: "Recipe title is required",
                                        })}
                                        className="admin-input h-12"
                                    />

                                    {errors.title && (
                                        <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{
                                        required: "Please select a category",
                                    }}
                                    render={({ field }) => (
                                        <RecipeCategorySelect value={field.value} onChange={field.onChange} error={errors.category?.message} />
                                    )}
                                />

                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <RecipeTagsInput value={field.value} onChange={field.onChange} />
                                    )}
                                />

                                <Controller
                                    name="pdf"
                                    control={control}
                                    render={({ field }) => (
                                        <RecipePdfField value={field.value} onChange={field.onChange} />
                                    )}
                                />

                                <Suspense
                                    fallback={
                                        <div className="mt-6 flex min-h-50 items-center justify-center text-admin-sm text-admin-text-muted dark:text-gray-400">
                                            Loading recipe editor...
                                        </div>
                                    }
                                >
                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field }) => (
                                            <RecipeEditor value={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                </Suspense>

                                <RecipeDetails register={register} errors={errors} />

                                <RecipeRepeater
                                    control={control}
                                    register={register}
                                    name="ingredients"
                                    title="Ingredients"
                                    description="Add each ingredient as a simple text entry."
                                    placeholder="Ingredient"
                                    addLabel="Add Ingredient"
                                />

                                <RecipeRepeater
                                    control={control}
                                    register={register}
                                    name="instructions"
                                    title="Instructions"
                                    description="Add each cooking step in the order it should be completed."
                                    placeholder="Step"
                                    addLabel="Add Step"
                                />

                                <div className="flex gap-2 mt-6">
                                    <button type="button" className="admin-btn-secondary" onClick={() => console.log("Save draft")}>
                                        <Save size={16} />
                                        Save Draft
                                    </button>

                                    <button type="submit" form="recipe-form" className="admin-btn-primary">
                                        <Send size={16} />
                                        Publish Recipe
                                    </button>
                                </div>
                            </section>

                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
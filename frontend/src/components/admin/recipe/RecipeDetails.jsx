const difficultyOptions = [
    "Beginner Level",
    "Intermediate Level",
    "Advanced Level",
];

export default function RecipeDetails({ register, errors }) {
    return (
        <section className="mt-6 border-t border-admin-border pt-6 dark:border-gray-800">
            <div className="mb-5">
                <h4 className="text-admin-base font-admin-bold text-admin-text dark:text-gray-100">
                    Recipe Details
                </h4>

                <p className="mt-1 text-admin-sm text-admin-text-muted dark:text-gray-400">
                    Add information that helps readers understand the recipe.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
                <div>
                    <label htmlFor="servings" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                        Servings
                    </label>

                    <input id="servings" type="number" min="1" step="1" placeholder="4"
                        {...register("servings", {
                            required: "Servings is required",
                            min: {
                                value: 1,
                                message: "Servings must be at least 1",
                            },
                            valueAsNumber: true,
                        })}
                        className="admin-input h-12"
                    />

                    {errors.servings && <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">{errors.servings.message}</p>}
                </div>

                <div>
                    <label htmlFor="prepTime" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                        Prep Time (minutes)
                    </label>

                    <input id="prepTime" type="number" min="0" step="1" placeholder="15"
                        {...register("prepTime", {
                            required: "Prep time is required",
                            min: {
                                value: 0,
                                message: "Prep time cannot be negative",
                            },
                            valueAsNumber: true,
                        })}
                        className="admin-input h-12"
                    />

                    {errors.prepTime && <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">{errors.prepTime.message}</p>}
                </div>

                <div>
                    <label htmlFor="cookTime" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                        Cook Time (minutes)
                    </label>

                    <input id="cookTime" type="number" min="0" step="1" placeholder="10"
                        {...register("cookTime", {
                            required: "Cook time is required",
                            min: {
                                value: 0,
                                message: "Cook time cannot be negative",
                            },
                            valueAsNumber: true,
                        })}
                        className="admin-input h-12"
                    />

                    {errors.cookTime && <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">{errors.cookTime.message}</p>}
                </div>

                <div>
                    <label htmlFor="difficulty" className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">
                        Difficulty
                    </label>

                    <select
                        id="difficulty"
                        {...register("difficulty", {
                            required: "Difficulty is required",
                        })}
                        className="admin-input h-12 appearance-none"
                    >
                        <option value="">Select difficulty</option>

                        {difficultyOptions.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty}
                            </option>
                        ))}
                    </select>

                    {errors.difficulty && <p className="mt-2 text-admin-xs font-admin-medium text-red-500 dark:text-red-400">{errors.difficulty.message}</p>}
                </div>
            </div>
        </section>
    );
}
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { recipesData, getRecipeById } from "../data/recipe";

const AuthContext = createContext(null);

const DEMO_USER = {
    id: 1,
    name: "Test User",
    email: "demo@flavoriz.com",
    role: "admin",
    createdAt: "2023-08-15T10:30:00Z",
};

const STORAGE_KEYS = {
    user: "flavoriz-user",
    saved: "flavoriz-saved-recipes",
    liked: "flavoriz-liked-recipes",
    comments: "flavoriz-comments",
};

const DEMO_SAVED_RECIPE_IDS = [1, 2, 4];

const DEMO_LIKED_RECIPE_IDS = [7, 9];

const DEMO_COMMENTS = [
    {
        id: 1,
        recipeId: 1,
        recipeSlug: "ground-beef-mexican-tacos",
        userId: 1,
        userName: "Tanuj Verma",
        content: "This recipe was absolutely delicious. The seasoning was perfect!",
        createdAt: "2026-10-11T10:30:00.000Z",
        date: "2 days ago",
    },
    {
        id: 2,
        recipeId: 2,
        recipeSlug: "fresh-salad-with-tahini-sauce",
        userId: 1,
        userName: "Tanuj Verma",
        content: "Made this for dinner and everyone loved it.",
        createdAt: "2026-10-06T10:30:00.000Z",
        date: "1 week ago",
    },
];

// Safely read localStorage.
function getStoredValue(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved !== null ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

// Support migration from the previous format, which stored whole recipes.
function normalizeRecipeIds(value, fallback) {
    if (!Array.isArray(value)) return fallback;

    const ids = value.map((item) => {
        const id = typeof item === "object" && item !== null ? item.id : item;
        return Number(id);
    }).filter((id) => Number.isFinite(id));

    return [...new Set(ids)];
}

function normalizeComments(value) {
    if (!Array.isArray(value)) return DEMO_COMMENTS;

    return value.map((comment) => {
        const recipe = getRecipeById(comment.recipeId) || recipesData.find(
            (item) => item.slug === comment.recipeSlug
        );

        return {
            ...comment,
            id: comment.id ?? Date.now(),
            recipeId: recipe?.id ?? comment.recipeId ?? null,
            recipeSlug: recipe?.slug ?? comment.recipeSlug ?? "",
            recipeTitle: recipe?.title ?? comment.recipeTitle ?? "Recipe",
            userId: comment.userId ?? 1,
            userName: comment.userName ?? "Demo User",
            createdAt: comment.createdAt ?? new Date().toISOString(),
            content: comment.content ?? "",
        };
    });
}

// Calculate completed calendar days since registration.
export function getDaysAsMember(createdAt) {
    if (!createdAt) return 0;

    const registeredDate = new Date(createdAt);

    if (Number.isNaN(registeredDate.getTime())) return 0;

    const today = new Date();

    const registrationDay = new Date(
        registeredDate.getFullYear(),
        registeredDate.getMonth(),
        registeredDate.getDate()
    );

    const currentDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    return Math.max(
        0,
        Math.floor(
            (currentDay.getTime() - registrationDay.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = getStoredValue(STORAGE_KEYS.user, null);

        if (!savedUser) return null;

        return {
            ...savedUser,
            role: savedUser.role || "subscriber",
            createdAt: savedUser.createdAt || new Date().toISOString(),
        };
    });

    const [savedRecipeIds, setSavedRecipeIds] = useState(() => {

        const stored = getStoredValue(STORAGE_KEYS.saved, DEMO_SAVED_RECIPE_IDS);

        return normalizeRecipeIds(stored, DEMO_SAVED_RECIPE_IDS);

    });

    const [likedRecipeIds, setLikedRecipeIds] = useState(() => {

        const stored = getStoredValue(STORAGE_KEYS.liked, DEMO_LIKED_RECIPE_IDS);

        return normalizeRecipeIds(stored, DEMO_LIKED_RECIPE_IDS);

    });

    const [comments, setComments] = useState(() => {
        return normalizeComments(getStoredValue(STORAGE_KEYS.comments, DEMO_COMMENTS));
    });

    // Persist demo data.
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEYS.user);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedRecipeIds));
    }, [savedRecipeIds]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.liked, JSON.stringify(likedRecipeIds));
    }, [likedRecipeIds]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(comments));
    }, [comments]);


    // Sync changes made in other browser tabs.
    useEffect(() => {
        const handleStorageChange = (event) => {
            // Another tab cleared localStorage.
            if (event.key === null) {
                setUser(null);
                setSavedRecipeIds(DEMO_SAVED_RECIPE_IDS);
                setLikedRecipeIds(DEMO_LIKED_RECIPE_IDS);
                setComments(DEMO_COMMENTS);
                return;
            }

            // Ignore unrelated localStorage changes.
            if (!Object.values(STORAGE_KEYS).includes(event.key)) {
                return;
            }

            try {
                const value = event.newValue === null ? null : JSON.parse(event.newValue);

                switch (event.key) {
                    case STORAGE_KEYS.user:
                        setUser(
                            value
                                ? {
                                    ...value,
                                    role: value.role || "subscriber",
                                    createdAt: value.createdAt || new Date().toISOString(),
                                }
                                : null
                        );
                        break;

                    case STORAGE_KEYS.saved:
                        setSavedRecipeIds(
                            normalizeRecipeIds(value, DEMO_SAVED_RECIPE_IDS)
                        );
                        break;

                    case STORAGE_KEYS.liked:
                        setLikedRecipeIds(
                            normalizeRecipeIds(value, DEMO_LIKED_RECIPE_IDS)
                        );
                        break;

                    case STORAGE_KEYS.comments:
                        setComments(normalizeComments(value));
                        break;

                    default:
                        break;
                }
            } catch (error) {
                console.error("Failed to sync Flavoriz data:", error);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    // Resolve IDs against the canonical dataset.
    // Every page gets the latest recipe title, image and category.
    const savedRecipes = useMemo(() =>
        savedRecipeIds.map((id) => getRecipeById(id)).filter(Boolean),
        [savedRecipeIds]
    );

    const likedRecipes = useMemo(
        () => likedRecipeIds.map((id) => getRecipeById(id)).filter(Boolean),
        [likedRecipeIds]
    );

    const login = ({ email, password }) => {
        if (email.trim().toLowerCase() !== DEMO_USER.email || password !== "password123") {
            toast.error("Invalid email or password.");

            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        setUser(DEMO_USER);
        toast.success("Login successful.");

        return {
            success: true,
            user: DEMO_USER,
        };
    };

    const registerUser = ({ name, email }) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!name.trim() || !normalizedEmail) {
            toast.error("Name and email are required.");

            return {
                success: false,
                message: "Name and email are required.",
            };
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: normalizedEmail,
            role: "subscriber",
            createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        toast.success("Registration successful.");

        return {
            success: true,
            user: newUser,
        };
    };

    const logout = () => {
        setUser(null);
        toast.success("Logout successful.");
    };

    const updateProfile = ({ name, email }) => {
        if (!user) {
            return {
                success: false,
                message: "You must be logged in.",
            };
        }

        const trimmedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!trimmedName || !normalizedEmail) {
            toast.error("Name and email are required.");

            return {
                success: false,
                message: "Name and email are required.",
            };
        }

        const updatedUser = {
            ...user,
            name: trimmedName,
            email: normalizedEmail,
        };

        setUser(updatedUser);
        toast.success("Profile updated successfully.");

        return {
            success: true,
            user: updatedUser,
        };
    };

    // Accept either a recipe object or a recipe ID.
    const getId = (recipeOrId) =>
        Number(
            typeof recipeOrId === "object" && recipeOrId !== null
                ? recipeOrId.id
                : recipeOrId
        );

    const saveRecipe = (recipeOrId) => {
        const id = getId(recipeOrId);
        const recipe = getRecipeById(id);

        if (!recipe) {
            toast.error("Recipe not found.");
            return;
        }

        setSavedRecipeIds((current) => {
            const exists = current.includes(id);

            return exists
                ? current.filter((savedId) => savedId !== id)
                : [...current, id];
        });
    };

    const likeRecipe = (recipeOrId) => {
        const id = getId(recipeOrId);
        const recipe = getRecipeById(id);

        if (!recipe) {
            toast.error("Recipe not found.");
            return;
        }

        setLikedRecipeIds((current) => {
            const exists = current.includes(id);

            return exists
                ? current.filter((likedId) => likedId !== id)
                : [...current, id];
        });
    };

    const isRecipeSaved = (recipeOrId) =>
        savedRecipeIds.includes(getId(recipeOrId));

    const isRecipeLiked = (recipeOrId) =>
        likedRecipeIds.includes(getId(recipeOrId));

    // Add a comment while attaching the canonical recipe and current user.
    const addComment = (recipeOrId, content) => {
        if (!user) {
            toast.error("Please log in to comment.");
            return {
                success: false,
                message: "Please log in to comment.",
            };
        }

        const recipe = getRecipeById(getId(recipeOrId));
        const trimmedContent = content.trim();

        if (!recipe || !trimmedContent) {
            toast.error("Please enter a comment.");
            return {
                success: false,
                message: "A valid recipe and comment are required.",
            };
        }

        const newComment = {
            id: Date.now(),
            recipeId: recipe.id,
            recipeSlug: recipe.slug,
            recipeTitle: recipe.title,
            userId: user.id,
            userName: user.name,
            content: trimmedContent,
            createdAt: new Date().toISOString(),
            date: "Just now",
        };

        setComments((current) => [newComment, ...current]);

        toast.success("Comment added.");

        return {
            success: true,
            comment: newComment,
        };
    };

    const deleteComment = (commentId) => {
        const comment = comments.find(
            (item) => item.id === commentId
        );

        if (!comment) {
            return {
                success: false,
                message: "Comment not found.",
            };
        }

        // Demo-side permission check. Real authorization must be enforced
        // by the backend when the API is added.
        if (
            !user ||
            (user.role !== "admin" && comment.userId !== user.id)
        ) {
            toast.error("You cannot delete this comment.");

            return {
                success: false,
                message: "You cannot delete this comment.",
            };
        }

        setComments((current) =>
            current.filter((item) => item.id !== commentId)
        );

        toast.success("Comment deleted.");

        return { success: true };
    };

    const daysAsMember = user
        ? getDaysAsMember(user.createdAt)
        : 0;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                daysAsMember,

                login,
                registerUser,
                logout,
                updateProfile,

                savedRecipes,
                likedRecipes,
                comments,

                saveRecipe,
                likeRecipe,
                isRecipeSaved,
                isRecipeLiked,

                addComment,
                deleteComment,
                setComments,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
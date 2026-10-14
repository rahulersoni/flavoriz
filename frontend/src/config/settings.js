export const defaultSettings = {
    general: {
        siteName: "Flavoriz",
        tagline: "Delicious recipes made simple.",
        adminEmail: "",
        contactEmail: "",
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",
    },

    appearance: {
        theme: "system",
        primaryColor: "#f5a10b",
        postsPerPage: 12,
        blogLayout: "grid",
        showFeaturedImage: true,
        showAuthor: true,
    },

    recipes: {
        defaultServings: 4,
        defaultDifficulty: "easy",
        enableRecipePdf: true,
        enableCopyRecipe: true,
        enableRatings: true,
        enableNutrition: false,
        calculateReadingTime: true,
    },

    comments: {
        enableComments: true,
        requireApproval: true,
        allowReplies: true,
        allowLikes: true,
        maxCommentLength: 1000,
        autoMarkSpam: true,
    },

    notifications: {
        notificationEmail: "",
        newComment: true,
        newUser: true,
        newRecipe: false,
        newsletter: false,
    },

    security: {
        loginAttemptLimit: 5,
        sessionTimeout: 30,
        requireStrongPasswords: true,
        notifyFailedLogins: true,
        allowMultipleSessions: true,
    },
};
// Flavoriz demo recipe dataset.
// Single source of truth for recipe content across public and admin pages.
// Per-user likes, bookmarks and comments belong in AuthContext and should
// reference recipe IDs rather than copied recipe objects.

const demoAuthor = (id, name) => ({ id, name });

export const recipesData = [
    {
        id: 1,
        slug: "ground-beef-mexican-tacos",
        title: "Ground Beef Mexican Tacos",
        description: "Seasoned ground beef, crisp vegetables and bright toppings tucked into warm taco shells.",
        excerpt: "A weeknight-friendly taco recipe with bold spices and fresh toppings.",
        authorId: 1,
        author: "Maria Rodriguez",
        authorProfile: demoAuthor(1, "Maria Rodriguez"),
        category: "main",
        categoryLabel: "Main Course",
        subcategory: "Mexican Food",
        tags: ["tacos", "beef", "Mexican", "weeknight dinner"],
        status: "published",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            { type: "paragraph", text: "These ground beef tacos are packed with warming spices and finished with crunchy vegetables, fresh herbs and a squeeze of lime." },
            { type: "heading", text: "Why you'll love this recipe" },
            { type: "paragraph", text: "The filling comes together quickly in one pan, and everyone can customize their own tacos with their favorite toppings." },
        ],
        ingredients: [
            { id: "taco-1", quantity: "500", unit: "g", name: "ground beef" },
            { id: "taco-2", quantity: "8", unit: "small", name: "taco shells or tortillas" },
            { id: "taco-3", quantity: "1", unit: "small", name: "onion, diced" },
            { id: "taco-4", quantity: "2", unit: "tsp", name: "taco seasoning" },
            { id: "taco-5", quantity: "1", unit: "cup", name: "shredded lettuce" },
            { id: "taco-6", quantity: "1", unit: "cup", name: "diced tomato" },
            { id: "taco-7", quantity: "1/2", unit: "cup", name: "grated cheese" },
            { id: "taco-8", quantity: "1", unit: "", name: "lime, cut into wedges" },
        ],
        instructions: [
            { id: "taco-step-1", text: "Warm a skillet over medium heat and cook the onion until softened." },
            { id: "taco-step-2", text: "Add the ground beef and cook, breaking it apart, until browned and cooked through. Drain excess fat if needed." },
            { id: "taco-step-3", text: "Stir in taco seasoning and a splash of water. Simmer until the filling is coated and fragrant." },
            { id: "taco-step-4", text: "Warm the taco shells, fill with beef, and add lettuce, tomato, cheese and lime." },
        ],
        servings: 4,
        prepTime: 15,
        cookTime: 15,
        readingTime: 4,
        difficulty: "Easy",
        recipePdfUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrqqyn2GtNfzsHzp4jRJ0vYhjt1jnuLy9V5oJ0jLUmIw&s=10",
        videoUrl: 'https://www.youtube.com/watch?v=u31qwQUeGuM',
        nutrition: { calories: 420, protein: "25 g", carbohydrates: "32 g", fat: "22 g" },
        views: 12800,
        likes: 1400,
        commentsCount: 18,
        createdAt: "2026-10-03T09:00:00.000Z",
        updatedAt: "2026-10-03T09:00:00.000Z",
        date: "03 Oct 2026",
        featured: true,
    },
    {
        id: 2,
        slug: "fresh-salad-with-tahini-sauce",
        title: "Fresh Salad with Tahini Sauce",
        description: "Crisp vegetables, creamy tahini and a bright dressing for an easy everyday favorite.",
        excerpt: "A colorful, crunchy salad finished with a smooth lemon-tahini dressing.",
        authorId: 2,
        author: "Joanne Roosevelt",
        authorProfile: demoAuthor(2, "Joanne Roosevelt"),
        category: "appetizer",
        categoryLabel: "Appetizer",
        subcategory: "Healthy",
        tags: ["salad", "healthy", "vegetarian", "tahini"],
        status: "published",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85"],
        content: [
            { type: "paragraph", text: "Fresh greens and crisp vegetables make a refreshing base for a creamy tahini dressing with lemon and garlic." },
            { type: "heading", text: "Serving suggestion" },
            { type: "paragraph", text: "Serve as a light lunch or pair with roasted vegetables, grains or grilled protein." },
        ],
        ingredients: [
            { id: "salad-1", quantity: "4", unit: "cups", name: "mixed greens" },
            { id: "salad-2", quantity: "1", unit: "", name: "cucumber, sliced" },
            { id: "salad-3", quantity: "1", unit: "cup", name: "cherry tomatoes, halved" },
            { id: "salad-4", quantity: "3", unit: "tbsp", name: "tahini" },
            { id: "salad-5", quantity: "2", unit: "tbsp", name: "lemon juice" },
            { id: "salad-6", quantity: "1", unit: "small", name: "garlic clove, minced" },
            { id: "salad-7", quantity: "2", unit: "tbsp", name: "water, plus more as needed" },
            { id: "salad-8", quantity: "", unit: "", name: "salt and black pepper, to taste" },
        ],
        instructions: [
            { id: "salad-step-1", text: "Arrange the greens, cucumber and tomatoes in a large serving bowl." },
            { id: "salad-step-2", text: "Whisk tahini, lemon juice, garlic and water until smooth, adding water gradually to reach a pourable consistency." },
            { id: "salad-step-3", text: "Season the dressing with salt and pepper." },
            { id: "salad-step-4", text: "Drizzle over the salad and toss just before serving." },
        ],
        servings: 2,
        prepTime: 15,
        cookTime: 6,
        readingTime: 3,
        difficulty: "Easy",
        recipePdfUrl: "",
        nutrition: { calories: 240, protein: "7 g", carbohydrates: "18 g", fat: "17 g" },
        views: 9600,
        likes: 1100,
        commentsCount: 12,
        createdAt: "2026-10-01T09:00:00.000Z",
        updatedAt: "2026-10-01T09:00:00.000Z",
        date: "01 Oct 2026",
        featured: true,
    },
    {
        id: 3,
        slug: "flat-noodles-with-shrimp-veggie",
        title: "Flat Noodles with Shrimp Veggie",
        description: "Silky noodles, juicy shrimp and colorful vegetables tossed in a savory sauce.",
        excerpt: "A quick noodle stir-fry with shrimp and crisp vegetables.",
        authorId: 3,
        author: "Michael Richard",
        authorProfile: demoAuthor(3, "Michael Richard"),
        category: "main",
        categoryLabel: "Main Course",
        subcategory: "Asian Inspired",
        tags: ["noodles", "shrimp", "Asian-inspired", "stir-fry"],
        status: "draft",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85"],
        content: [
            { type: "paragraph", text: "Flat noodles are tossed with shrimp and colorful vegetables in a savory, lightly sweet sauce." },
            { type: "heading", text: "Before you begin" },
            { type: "paragraph", text: "Prepare and slice all ingredients before heating the wok, since stir-frying moves quickly." },
        ],
        ingredients: [
            { id: "noodle-1", quantity: "250", unit: "g", name: "flat rice noodles" },
            { id: "noodle-2", quantity: "300", unit: "g", name: "peeled shrimp" },
            { id: "noodle-3", quantity: "2", unit: "cups", name: "mixed sliced vegetables" },
            { id: "noodle-4", quantity: "2", unit: "tbsp", name: "soy sauce" },
            { id: "noodle-5", quantity: "1", unit: "tbsp", name: "oil" },
            { id: "noodle-6", quantity: "2", unit: "", name: "garlic cloves, minced" },
        ],
        instructions: [
            { id: "noodle-step-1", text: "Prepare the noodles according to their package instructions, then drain." },
            { id: "noodle-step-2", text: "Heat oil in a wok or large skillet and cook the garlic briefly." },
            { id: "noodle-step-3", text: "Add the shrimp and cook until opaque, then add the vegetables and stir-fry until crisp-tender." },
            { id: "noodle-step-4", text: "Add the noodles and soy sauce. Toss together until hot and evenly coated." },
        ],
        servings: 3,
        prepTime: 15,
        cookTime: 15,
        readingTime: 3,
        difficulty: "Medium",
        recipePdfUrl: "",
        nutrition: { calories: 390, protein: "26 g", carbohydrates: "52 g", fat: "8 g" },
        views: 8200,
        likes: 980,
        commentsCount: 7,
        createdAt: "2026-09-28T09:00:00.000Z",
        updatedAt: "2026-09-28T09:00:00.000Z",
        date: "28 Sep 2026",
        featured: false,
    },
    {
        id: 4,
        slug: "classic-italian-beef-maltagliati",
        title: "Classic Italian Beef Maltagliati",
        description: "Tender beef and pasta come together in a deeply savory Italian-inspired dish.",
        excerpt: "Comforting beef and pasta with herbs and a rich tomato-based sauce.",
        authorId: 1,
        author: "Maria Rodriguez",
        authorProfile: demoAuthor(1, "Maria Rodriguez"),
        category: "international",
        categoryLabel: "International",
        subcategory: "Italian Food",
        tags: ["pasta", "beef", "Italian", "comfort food"],
        status: "published",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85"],
        content: [
            { type: "paragraph", text: "This hearty pasta dish pairs tender beef with a rich sauce and fresh herbs for a comforting dinner." },
            { type: "heading", text: "Make it your own" },
            { type: "paragraph", text: "Finish with grated cheese and fresh herbs, and serve with a crisp green salad." },
        ],
        ingredients: [
            { id: "beefpasta-1", quantity: "300", unit: "g", name: "pasta" },
            { id: "beefpasta-2", quantity: "400", unit: "g", name: "stewing beef, cut small" },
            { id: "beefpasta-3", quantity: "1", unit: "", name: "onion, diced" },
            { id: "beefpasta-4", quantity: "400", unit: "g", name: "chopped tomatoes" },
            { id: "beefpasta-5", quantity: "2", unit: "", name: "garlic cloves, minced" },
            { id: "beefpasta-6", quantity: "1", unit: "tsp", name: "dried Italian herbs" },
        ],
        instructions: [
            { id: "beefpasta-step-1", text: "Brown the beef in a heavy pan in batches, then set aside." },
            { id: "beefpasta-step-2", text: "Cook the onion until softened, add garlic and herbs, and stir for about a minute." },
            { id: "beefpasta-step-3", text: "Return the beef to the pan, add tomatoes and simmer until the beef is tender." },
            { id: "beefpasta-step-4", text: "Cook the pasta separately, drain, and toss with the sauce before serving." },
        ],
        servings: 4,
        prepTime: 20,
        cookTime: 45,
        readingTime: 4,
        difficulty: "Medium",
        recipePdfUrl: "",
        nutrition: { calories: 510, protein: "32 g", carbohydrates: "58 g", fat: "16 g" },
        views: 7400,
        likes: 870,
        commentsCount: 9,
        createdAt: "2026-09-25T09:00:00.000Z",
        updatedAt: "2026-09-25T09:00:00.000Z",
        date: "25 Sep 2026",
        featured: false,
    },
    {
        id: 5,
        slug: "crispy-garlic-chicken",
        title: "Crispy Garlic Chicken",
        description: "Golden, crispy chicken with aromatic garlic, herbs and a deliciously savory finish.",
        excerpt: "A satisfying chicken dinner with a crispy coating and rich garlic flavor.",
        authorId: 4,
        author: "Chef Mark Johnson",
        authorProfile: demoAuthor(4, "Chef Mark Johnson"),
        category: "main",
        categoryLabel: "Main Course",
        subcategory: "Comfort Food",
        tags: ["chicken", "garlic", "crispy", "dinner"],
        status: "pending",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            {
                type: "paragraph",
                text: "Crispy garlic chicken combines a golden exterior with juicy chicken and fragrant garlic seasoning.",
            },
            {
                type: "heading",
                text: "Tips for crispy chicken",
            },
            {
                type: "paragraph",
                text: "Pat the chicken dry before coating it, and avoid overcrowding the pan so the coating browns evenly.",
            },
        ],
        ingredients: [
            { id: "chicken-1", quantity: "500", unit: "g", name: "boneless chicken pieces" },
            { id: "chicken-2", quantity: "4", unit: "cloves", name: "garlic, minced" },
            { id: "chicken-3", quantity: "1/2", unit: "cup", name: "all-purpose flour" },
            { id: "chicken-4", quantity: "1", unit: "tsp", name: "paprika" },
            { id: "chicken-5", quantity: "1", unit: "tsp", name: "dried herbs" },
            { id: "chicken-6", quantity: "2", unit: "tbsp", name: "olive oil" },
            { id: "chicken-7", quantity: "", unit: "", name: "salt and black pepper, to taste" },
        ],
        instructions: [
            { id: "chicken-step-1", text: "Pat the chicken dry and season with salt, pepper, paprika and dried herbs." },
            { id: "chicken-step-2", text: "Lightly coat the chicken pieces in flour, shaking off any excess." },
            { id: "chicken-step-3", text: "Heat olive oil in a skillet over medium heat and cook the chicken until golden and cooked through." },
            { id: "chicken-step-4", text: "Add the minced garlic near the end of cooking and stir briefly until fragrant, taking care not to burn it." },
            { id: "chicken-step-5", text: "Check that the chicken reaches a safe internal temperature before serving." },
        ],
        servings: 4,
        prepTime: 15,
        cookTime: 25,
        readingTime: 4,
        difficulty: "Medium",
        recipePdfUrl: "",
        nutrition: {
            calories: 380,
            protein: "34 g",
            carbohydrates: "22 g",
            fat: "17 g",
        },
        views: 6800,
        likes: 730,
        commentsCount: 14,
        createdAt: "2026-09-23T09:00:00.000Z",
        updatedAt: "2026-09-23T09:00:00.000Z",
        date: "23 Sep 2026",
        featured: false,
    },
    {
        id: 6,
        slug: "creamy-tomato-pasta",
        title: "Creamy Tomato Pasta",
        description: "Tender pasta tossed in a creamy tomato sauce with garlic and Italian herbs.",
        excerpt: "A comforting pasta dish with a smooth tomato sauce and aromatic herbs.",
        authorId: 5,
        author: "Laura Syahna",
        authorProfile: demoAuthor(5, "Laura Syahna"),
        category: "international",
        categoryLabel: "International",
        subcategory: "Italian Food",
        tags: ["pasta", "tomato", "Italian", "vegetarian"],
        status: "draft",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            {
                type: "paragraph",
                text: "This creamy tomato pasta combines a rich tomato base with cream, garlic and Italian herbs for a simple comfort-food favorite.",
            },
            {
                type: "heading",
                text: "Make the sauce extra smooth",
            },
            {
                type: "paragraph",
                text: "Reserve a little pasta water and add it gradually to help the sauce coat the pasta evenly.",
            },
        ],
        ingredients: [
            { id: "pasta-1", quantity: "300", unit: "g", name: "pasta" },
            { id: "pasta-2", quantity: "400", unit: "g", name: "chopped tomatoes" },
            { id: "pasta-3", quantity: "100", unit: "ml", name: "cooking cream" },
            { id: "pasta-4", quantity: "3", unit: "cloves", name: "garlic, minced" },
            { id: "pasta-5", quantity: "1", unit: "tbsp", name: "olive oil" },
            { id: "pasta-6", quantity: "1", unit: "tsp", name: "Italian herbs" },
            { id: "pasta-7", quantity: "2", unit: "tbsp", name: "grated Parmesan, optional" },
        ],
        instructions: [
            { id: "pasta-step-1", text: "Cook the pasta in salted water according to the package instructions. Reserve some pasta water before draining." },
            { id: "pasta-step-2", text: "Heat olive oil in a skillet and gently cook the garlic until fragrant." },
            { id: "pasta-step-3", text: "Add the chopped tomatoes and Italian herbs. Simmer until the sauce thickens slightly." },
            { id: "pasta-step-4", text: "Stir in the cream and season to taste." },
            { id: "pasta-step-5", text: "Add the cooked pasta and toss with a splash of reserved pasta water. Finish with Parmesan if desired." },
        ],
        servings: 3,
        prepTime: 10,
        cookTime: 20,
        readingTime: 3,
        difficulty: "Easy",
        recipePdfUrl: "",
        nutrition: {
            calories: 460,
            protein: "14 g",
            carbohydrates: "62 g",
            fat: "17 g",
        },
        views: 5900,
        likes: 610,
        commentsCount: 8,
        createdAt: "2026-09-20T09:00:00.000Z",
        updatedAt: "2026-09-20T09:00:00.000Z",
        date: "20 Sep 2026",
        featured: false,
    },
    {
        id: 7,
        slug: "spicy-vermicelli-noodle-salad",
        title: "Spicy Vermicelli Noodle Salad",
        description: "A refreshing noodle salad with crunchy vegetables, fresh herbs and a spicy Asian-inspired dressing.",
        excerpt: "Light vermicelli noodles tossed with colorful vegetables and a tangy, spicy dressing.",
        authorId: 3,
        author: "Michael Richard",
        authorProfile: demoAuthor(3, "Michael Richard"),
        category: "appetizer",
        categoryLabel: "Appetizer",
        subcategory: "Asian Inspired",
        tags: ["noodles", "salad", "spicy", "Asian-inspired"],
        status: "published",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            { type: "paragraph", text: "This vermicelli noodle salad combines delicate noodles, crunchy vegetables and a bright dressing with a gentle kick of heat." },
            { type: "heading", text: "Serving tip" },
            { type: "paragraph", text: "Let the salad rest briefly before serving so the noodles can absorb the dressing." },
        ],
        ingredients: [
            { id: "vermicelli-1", quantity: "200", unit: "g", name: "rice vermicelli noodles" },
            { id: "vermicelli-2", quantity: "1", unit: "cup", name: "shredded carrots" },
            { id: "vermicelli-3", quantity: "1", unit: "cup", name: "sliced cucumber" },
            { id: "vermicelli-4", quantity: "2", unit: "tbsp", name: "soy sauce" },
            { id: "vermicelli-5", quantity: "1", unit: "tbsp", name: "lime juice" },
            { id: "vermicelli-6", quantity: "1", unit: "tsp", name: "chili sauce" },
            { id: "vermicelli-7", quantity: "2", unit: "tbsp", name: "chopped fresh herbs" },
        ],
        instructions: [
            { id: "vermicelli-step-1", text: "Prepare the vermicelli noodles according to the package instructions, then drain and cool." },
            { id: "vermicelli-step-2", text: "Combine the carrots, cucumber and fresh herbs in a large bowl." },
            { id: "vermicelli-step-3", text: "Whisk together the soy sauce, lime juice and chili sauce." },
            { id: "vermicelli-step-4", text: "Add the noodles and dressing to the vegetables. Toss thoroughly and serve." },
        ],
        servings: 3,
        prepTime: 15,
        cookTime: 5,
        readingTime: 3,
        difficulty: "Easy",
        recipePdfUrl: "",
        nutrition: { calories: 280, protein: "7 g", carbohydrates: "52 g", fat: "5 g" },
        views: 5200,
        likes: 580,
        commentsCount: 11,
        createdAt: "2026-09-18T09:00:00.000Z",
        updatedAt: "2026-09-18T09:00:00.000Z",
        date: "18 Sep 2026",
        featured: false,
    },
    {
        id: 8,
        slug: "roasted-vegetable-bowl",
        title: "Roasted Vegetable Bowl",
        description: "Colorful roasted vegetables served over grains with a simple, flavorful dressing.",
        excerpt: "A nourishing bowl of caramelized vegetables that's easy to customize.",
        authorId: 2,
        author: "Joanne Roosevelt",
        authorProfile: demoAuthor(2, "Joanne Roosevelt"),
        category: "main",
        categoryLabel: "Main Course",
        subcategory: "Healthy",
        tags: ["vegetables", "healthy", "vegetarian", "grain bowl"],
        status: "pending",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            { type: "paragraph", text: "Roasting vegetables brings out their natural sweetness and creates a hearty base for a customizable grain bowl." },
            { type: "heading", text: "Build your bowl" },
            { type: "paragraph", text: "Serve the vegetables over rice or quinoa and finish with your favorite dressing, herbs or seeds." },
        ],
        ingredients: [
            { id: "bowl-1", quantity: "2", unit: "cups", name: "broccoli florets" },
            { id: "bowl-2", quantity: "1", unit: "", name: "red bell pepper, chopped" },
            { id: "bowl-3", quantity: "1", unit: "", name: "red onion, sliced" },
            { id: "bowl-4", quantity: "2", unit: "tbsp", name: "olive oil" },
            { id: "bowl-5", quantity: "2", unit: "cups", name: "cooked rice or quinoa" },
            { id: "bowl-6", quantity: "1", unit: "tsp", name: "mixed dried herbs" },
            { id: "bowl-7", quantity: "", unit: "", name: "salt and pepper, to taste" },
        ],
        instructions: [
            { id: "bowl-step-1", text: "Preheat the oven to 200°C (400°F)." },
            { id: "bowl-step-2", text: "Toss the vegetables with olive oil, dried herbs, salt and pepper." },
            { id: "bowl-step-3", text: "Spread the vegetables on a baking tray and roast until tender and lightly browned, about 20–30 minutes." },
            { id: "bowl-step-4", text: "Serve the roasted vegetables over cooked rice or quinoa and add a dressing if desired." },
        ],
        servings: 2,
        prepTime: 15,
        cookTime: 30,
        readingTime: 3,
        difficulty: "Easy",
        recipePdfUrl: "",
        nutrition: { calories: 340, protein: "9 g", carbohydrates: "48 g", fat: "12 g" },
        views: 4800,
        likes: 510,
        commentsCount: 6,
        createdAt: "2026-09-15T09:00:00.000Z",
        updatedAt: "2026-09-15T09:00:00.000Z",
        date: "15 Sep 2026",
        featured: false,
    },
    {
        id: 9,
        slug: "homemade-margherita-pizza",
        title: "Homemade Margherita Pizza",
        description: "A classic pizza topped with tomato sauce, mozzarella and fragrant fresh basil.",
        excerpt: "Make a simple homemade pizza with a crisp crust and classic Italian toppings.",
        authorId: 4,
        author: "Chef Mark Johnson",
        authorProfile: demoAuthor(4, "Chef Mark Johnson"),
        category: "international",
        categoryLabel: "International",
        subcategory: "Italian Food",
        tags: ["pizza", "Italian", "vegetarian", "homemade"],
        status: "published",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            { type: "paragraph", text: "Margherita pizza keeps things simple with tomato sauce, mozzarella and fresh basil on a golden crust." },
            { type: "heading", text: "For a crisp crust" },
            { type: "paragraph", text: "Preheat your oven thoroughly and use a hot baking tray or pizza stone if available." },
        ],
        ingredients: [
            { id: "pizza-1", quantity: "1", unit: "", name: "prepared pizza dough" },
            { id: "pizza-2", quantity: "150", unit: "g", name: "tomato sauce" },
            { id: "pizza-3", quantity: "200", unit: "g", name: "mozzarella cheese" },
            { id: "pizza-4", quantity: "1", unit: "handful", name: "fresh basil leaves" },
            { id: "pizza-5", quantity: "1", unit: "tbsp", name: "olive oil" },
        ],
        instructions: [
            { id: "pizza-step-1", text: "Preheat the oven to its highest suitable temperature, following the dough instructions." },
            { id: "pizza-step-2", text: "Stretch the dough into a round base and spread the tomato sauce over it." },
            { id: "pizza-step-3", text: "Add mozzarella and a light drizzle of olive oil." },
            { id: "pizza-step-4", text: "Bake until the crust is golden and the cheese is bubbling." },
            { id: "pizza-step-5", text: "Finish with fresh basil leaves and serve hot." },
        ],
        servings: 2,
        prepTime: 15,
        cookTime: 12,
        readingTime: 3,
        difficulty: "Medium",
        recipePdfUrl: "",
        nutrition: { calories: 420, protein: "19 g", carbohydrates: "54 g", fat: "14 g" },
        views: 4300,
        likes: 470,
        commentsCount: 16,
        createdAt: "2026-09-12T09:00:00.000Z",
        updatedAt: "2026-09-12T09:00:00.000Z",
        date: "12 Sep 2026",
        featured: true,
    },
    {
        id: 10,
        slug: "korean-kimchi-bowl",
        title: "Korean Kimchi Bowl",
        description: "A savory bowl of rice, tangy kimchi, vegetables and a flavorful Korean-inspired sauce.",
        excerpt: "A customizable rice bowl with bold flavors and a little heat.",
        authorId: 5,
        author: "Laura Syahna",
        authorProfile: demoAuthor(5, "Laura Syahna"),
        category: "international",
        categoryLabel: "International",
        subcategory: "Korean",
        tags: ["Korean", "kimchi", "rice bowl", "spicy"],
        status: "draft",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=85",
        ],
        content: [
            { type: "paragraph", text: "This Korean-inspired bowl combines warm rice with tangy kimchi, fresh vegetables and a savory dressing." },
            { type: "heading", text: "Customize the toppings" },
            { type: "paragraph", text: "Add tofu, an egg or your preferred protein to make the bowl more substantial." },
        ],
        ingredients: [
            { id: "kimchi-1", quantity: "2", unit: "cups", name: "cooked rice" },
            { id: "kimchi-2", quantity: "1", unit: "cup", name: "kimchi" },
            { id: "kimchi-3", quantity: "1", unit: "cup", name: "sliced vegetables" },
            { id: "kimchi-4", quantity: "1", unit: "tbsp", name: "soy sauce" },
            { id: "kimchi-5", quantity: "1", unit: "tsp", name: "sesame oil" },
            { id: "kimchi-6", quantity: "1", unit: "tsp", name: "sesame seeds" },
        ],
        instructions: [
            { id: "kimchi-step-1", text: "Prepare the rice and slice the vegetables." },
            { id: "kimchi-step-2", text: "Warm the kimchi in a skillet if desired." },
            { id: "kimchi-step-3", text: "Divide the rice between bowls and arrange the kimchi and vegetables on top." },
            { id: "kimchi-step-4", text: "Drizzle with soy sauce and sesame oil, then finish with sesame seeds." },
        ],
        servings: 2,
        prepTime: 10,
        cookTime: 10,
        readingTime: 3,
        difficulty: "Easy",
        recipePdfUrl: "",
        nutrition: { calories: 360, protein: "8 g", carbohydrates: "63 g", fat: "9 g" },
        views: 3900,
        likes: 420,
        commentsCount: 5,
        createdAt: "2026-09-09T09:00:00.000Z",
        updatedAt: "2026-09-09T09:00:00.000Z",
        date: "09 Sep 2026",
        featured: false,
    }
];

export const recipes = recipesData.filter(
    (recipe) => recipe.status === "published"
);


export const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Main Course",
    "Appetizer",
    "Dessert",
    "Healthy",
    "Italian Food",
    "Mexican Food",
    "Asian Inspired",
    "Seafood",
    "Vegetarian",
    "Drinks",
];

export const statusTabs = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
    { key: "pending", label: "Pending" },
];

export const itemsPerPage = 6;

export const getRecipeById = (id) =>
    recipes.find((recipe) => recipe.id === Number(id));

export const getRecipeBySlug = (slug) =>
    recipes.find((recipe) => recipe.slug === slug);

export const relatedPosts = (id, connection = null, limit = 3) => {
    const currentRecipe = getRecipeById(id);


    if (!currentRecipe) return [];

    const publishedRecipes = recipes;

    if (!connection) {

        return publishedRecipes
            .filter((item) => item.id !== currentRecipe.id)
            .slice(0, limit);
    }

    const connections = Array.isArray(connection)
        ? connection
        : [connection];


    const output = publishedRecipes
        .filter((item) => item.id !== currentRecipe.id)
        .filter((item) =>
            connections.some((key) => {
                if (key === "category") {
                    return item.category === currentRecipe.category;
                }

                if (key === "tags") {
                    const currentTags = currentRecipe.tags || [];
                    const itemTags = item.tags || [];

                    return currentTags.some((tag) => itemTags.includes(tag));
                }

                return false;
            })
        )
        .slice(0, limit);

    return output;
};

export const getPublishedRecipes = () =>
    recipesData.filter((recipe) => recipe.status === "published");
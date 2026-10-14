import { Eye, Heart, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

const recipes = [
  ["Ground Beef Mexican Tacos", "Mexican Food", "12.8K", "1.4K", "1551504734-5ee1c4a1479b"],
  ["Fresh Salad with Tahini Sauce", "Healthy", "9.6K", "1.1K", "1512621776951-a57141f2eefd"],
  ["Flat Noodles with Shrimp Veggie", "Asian Inspired", "8.2K", "980", "1559314809-0d155014e29e"],
  ["Classic Italian Beef Maltagliati", "Italian Food", "7.4K", "870", "1551183053-bf91a1d81141"],
];

export default function TopRecipes() {
  return (
    <section className="admin-card rounded-[26px] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
            Audience favorites
          </p>

          <h3 className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
            Top recipes
          </h3>
        </div>

        <button type="button" className="text-admin-xs font-admin-bold text-admin-primary transition hover:text-admin-primary-hover dark:text-amber-400 dark:hover:text-amber-300">
          View all
        </button>
      </div>

      <div className="mt-5 divide-y divide-admin-border dark:divide-gray-800">
        {recipes.map(([title, category, views, likes, image], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 py-4 first:pt-1 last:pb-1"
          >
            <img
              src={`https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=180&q=80`}
              alt=""
              className="size-12 shrink-0 rounded-admin-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <h5 className="truncate text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">
                {title}
              </h5>

              <p className="mt-1 text-[10px] text-admin-text-soft dark:text-gray-500">
                {category}
              </p>
            </div>

            <div className="hidden gap-4 sm:flex">
              <span className="flex items-center gap-1 text-[10px] text-admin-text-muted dark:text-gray-400">
                <Eye size={12} />
                {views}
              </span>

              <span className="flex items-center gap-1 text-[10px] text-admin-text-muted dark:text-gray-400">
                <Heart size={12} />
                {likes}
              </span>
            </div>

            <button type="button" aria-label={`More options for ${title}`} className="grid size-8 place-items-center rounded-admin-md text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
              <MoreHorizontal size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
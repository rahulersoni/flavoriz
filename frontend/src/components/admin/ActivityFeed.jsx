import { ChefHat, FileText, MessageSquare, UserPlus } from "lucide-react";
import { motion } from "motion/react";

const activities = [
  ["New recipe published", "Crispy Garlic Chicken", "8 min ago", ChefHat],
  ["New comment", "Ground Beef Mexican Tacos", "24 min ago", MessageSquare],
  ["128 new members", "Community growth", "1 hr ago", UserPlus],
  ["Article updated", "Global Culinary Adventures", "2 hrs ago", FileText],
];

export default function ActivityFeed() {
  return (
    <section className="admin-card rounded-[26px] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
            Recent activity
          </p>

          <h3 className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
            What's happening
          </h3>
        </div>

        <button type="button" className="text-admin-xs font-admin-bold text-admin-primary transition hover:text-admin-primary-hover dark:text-amber-400 dark:hover:text-amber-300">
          See all
        </button>
      </div>

      <div className="mt-5 space-y-1">
        {activities.map(([title, detail, time, Icon], i) => (
          <motion.div
            key={`${title}-${time}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-3 rounded-admin-lg p-3 text-admin-text transition hover:bg-admin-surface dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-admin-lg bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400">
              <Icon size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-admin-xs font-admin-bold text-admin-text dark:text-gray-100">
                {title}
              </p>

              <p className="mt-1 truncate text-[11px] text-admin-text-muted dark:text-gray-400">
                {detail}
              </p>

              <p className="mt-1 text-[10px] text-admin-text-soft dark:text-gray-500">
                {time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
import { motion } from "motion/react";

const content = [
  ["Recipes", 78],
  ["Articles", 54],
  ["Videos", 38],
  ["Guides", 27],
];

export default function ContentChart() {
  return (
    <section className="admin-card rounded-[26px] p-5 sm:p-6">
      <p className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
        Content performance
      </p>

      <h3 className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
        Top content types
      </h3>

      <p className="mt-1 text-admin-xs text-admin-text-soft dark:text-gray-500">
        Illustrative engagement index
      </p>

      <div className="mt-7 space-y-5">
        {content.map(([label, value], i) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-admin-xs">
              <span className="font-admin-semibold text-admin-text dark:text-gray-200">
                {label}
              </span>

              <span className="font-admin-bold text-admin-text-muted dark:text-gray-400">
                {value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-admin-track dark:bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="h-full rounded-full bg-admin-primary dark:bg-amber-400"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-admin-lg bg-admin-surface p-4 dark:bg-gray-800">
          <p className="text-[10px] text-admin-text-soft dark:text-gray-500">
            Published
          </p>

          <p className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
            1,248
          </p>
        </div>

        <div className="rounded-admin-lg bg-admin-surface p-4 dark:bg-gray-800">
          <p className="text-[10px] text-admin-text-soft dark:text-gray-500">
            Drafts
          </p>

          <p className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
            42
          </p>
        </div>
      </div>
    </section>
  );
}
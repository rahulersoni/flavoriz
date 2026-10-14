import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, change, icon: Icon, positive = true }) {
  return (
    <motion.article initial={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="admin-card rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-admin-lg bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400">
          <Icon size={19} />
        </span>

        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-admin-bold ${positive ? "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400" : "bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400"}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      </div>

      <p className="mt-5 text-admin-xs text-admin-text-muted dark:text-gray-400">{label}</p>

      <p className="mt-1 text-admin-2xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-3xl dark:text-gray-100">
        {value}
      </p>
    </motion.article>
  );
}
import { motion } from "motion/react";
import { ChefHat, CakeSlice, Globe2, Salad, Soup } from "lucide-react";

const filters = [
    { id: "all", label: "All Types", icon: Globe2 },
    { id: "appetizer", label: "Appetizers", icon: Salad },
    { id: "main", label: "Main Course", icon: Soup },
    { id: "international", label: "International Flavors", icon: Globe2 },
    { id: "dessert", label: "Desserts & Sweets", icon: CakeSlice },
];

export default function RecipeFilter({ activeFilter, onChange }) {
    return (
        <div className="flex flex-wrap justify-center gap-2.5">
            {filters.map(({ id, label, icon: Icon }) => {
                const active = activeFilter === id;

                return (
                    <motion.button
                        key={id}
                        type="button"
                        onClick={() => onChange(id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${active
                                ? "bg-secondary text-bg shadow-md"
                                : "bg-muted text-text hover:bg-accent"
                            }`}
                    >
                        {active && (
                            <motion.span
                                layoutId="activeRecipeFilter"
                                className="absolute inset-0 rounded-full bg-secondary"
                                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                            />
                        )}

                        <span className="relative z-10">
                            <Icon size={14} strokeWidth={1.8} />
                        </span>

                        <span className="relative z-10">{label}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}
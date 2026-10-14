import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronDown, Eye, Filter, Heart, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminTable from "../../../components/admin/table/AdminTable";
import RecipeStatusBadge from "../../../components/admin/recipe/RecipeStatusBadge";
import { itemsPerPage, statusTabs, recipesData } from "../../../data/recipe";

const recipeColumns = [
    {
        key: "title",
        label: "Recipe",
        sortable: true,
        render: (recipe) => (
            <div className="flex min-w-[280px] items-center gap-3">
                <img src={recipe.image} alt="" className="size-11 shrink-0 rounded-admin-lg object-cover" />
                <div className="min-w-0">
                    <Link to={`/admin/recipes/edit/${recipe.id}`} className="block truncate text-admin-sm font-admin-semibold text-admin-text hover:text-admin-primary dark:text-gray-100 dark:hover:text-amber-400">
                        {recipe.title}
                    </Link>
                    <Link to={`/admin/users/edit/${recipe.authorSlug}`} className="block truncate text-admin-xs font-admin-medium text-admin-text-muted hover:text-admin-primary dark:text-gray-400 dark:hover:text-amber-400">
                        {recipe.author}
                    </Link>
                </div>
            </div>
        ),
    },
    {
        key: "category",
        label: "Category",
        sortable: true,
        render: (recipe) => (
            <span className="text-admin-xs font-admin-medium text-admin-text-muted dark:text-gray-400">
                {recipe.category}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (recipe) => <RecipeStatusBadge status={recipe.status} />,
    },
    {
        key: "views",
        label: "Views",
        sortable: true,
        render: (recipe) => (
            <span className="flex items-center gap-1.5 text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
                <Eye size={13} />
                {recipe.views}
            </span>
        ),
    },
    {
        key: "likes",
        label: "Likes",
        sortable: true,
        render: (recipe) => (
            <span className="flex items-center gap-1.5 text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
                <Heart size={13} />
                {recipe.likes}
            </span>
        ),
    },
    {
        key: "date",
        label: "Published",
        sortable: true,
        render: (recipe) => (
            <span className="whitespace-nowrap text-admin-xs text-admin-text-muted dark:text-gray-400">
                {recipe.date}
            </span>
        ),
    },
];

export default function AllRecipes() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState({
        key: "date",
        direction: "desc",
    });
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const categories = useMemo(() => {
        return [...new Set(recipesData.map((recipe) => recipe.category))];
    }, []);

    const filteredRecipes = useMemo(() => {
        const query = search.trim().toLowerCase();

        return recipesData.filter((recipe) => {
            const matchesSearch =
                !query ||
                recipe.title.toLowerCase().includes(query) ||
                recipe.author.toLowerCase().includes(query) ||
                recipe.category.toLowerCase().includes(query);

            const matchesStatus = status === "all" || recipe.status === status;
            const matchesCategory = category === "all" || recipe.category === category;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [search, status, category]);

    const sortedRecipes = useMemo(() => {
        const recipes = [...filteredRecipes];

        recipes.sort((a, b) => {
            let valueA = a[sort.key];
            let valueB = b[sort.key];

            if (sort.key === "date") {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
            }

            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) {
                return sort.direction === "asc" ? -1 : 1;
            }

            if (valueA > valueB) {
                return sort.direction === "asc" ? 1 : -1;
            }

            return 0;
        });

        return recipes;
    }, [filteredRecipes, sort]);

    const totalPages = Math.max(1, Math.ceil(sortedRecipes.length / itemsPerPage));
    const currentPage = Math.min(page, totalPages);

    const paginatedRecipes = sortedRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleSort = (key) => {
        setSort((current) => ({
            key,
            direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
        }));

        setPage(1);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(1);
        setSelectedIds([]);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setPage(1);
        setSelectedIds([]);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const visibleIds = paginatedRecipes.map((recipe) => recipe.id);

    const allVisibleSelected =
        visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

    const toggleAll = () => {
        if (allVisibleSelected) {
            setSelectedIds((current) => current.filter((id) => !visibleIds.includes(id)));
            return;
        }

        setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
    };

    const toggleRow = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("all");
        setCategory("all");
        setPage(1);
        setSelectedIds([]);
    };

    return (
        <div className="admin-shell min-h-screen">
            <div className="min-h-screen bg-admin-bg text-admin-text dark:bg-gray-950 dark:text-gray-100">
                <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0 lg:pl-[270px]">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>

                                <h3 className="mt-2 text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">
                                    Recipes
                                </h3>

                                <p className="mt-2 max-w-[620px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">
                                    Create, manage and organize all recipes published across Flavoriz.
                                </p>
                            </div>

                            <Link type="button" className="admin-btn-primary self-start md:self-auto" to="/admin/recipes/add">
                                <Plus size={16} />
                                Add new recipe
                            </Link>
                        </motion.section>

                        <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
                            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="mb-4 overflow-x-auto">
                                <div className="inline-flex min-w-max items-center gap-1 rounded-admin-lg border border-admin-border bg-admin-card p-1.5 dark:border-gray-800 dark:bg-gray-900">
                                    {statusTabs.map((tab) => {
                                        const count = tab.key === "all"
                                            ? recipesData.length
                                            : recipesData.filter((recipe) => recipe.status === tab.key).length;

                                        const active = status === tab.key;

                                        return (
                                            <button
                                                key={tab.key}
                                                type="button"
                                                onClick={() => handleStatusChange(tab.key)}
                                                className={`inline-flex items-center gap-2 rounded-admin-md px-4 py-2 text-admin-xs font-admin-bold transition-all ${active ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}
                                            >
                                                {tab.label}

                                                <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active ? "bg-admin-primary text-white dark:bg-amber-400 dark:text-gray-950" : "bg-admin-surface text-admin-text-soft dark:bg-gray-800 dark:text-gray-500"}`}>
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="admin-card mb-4 sm:flex-1 rounded-[22px] p-3">
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                    <div className="relative min-w-0 flex-1">
                                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />

                                        <input
                                            type="search"
                                            value={search}
                                            onChange={handleSearchChange}
                                            placeholder="Search recipes, authors or categories..."
                                            className="h-11 w-full rounded-admin-md border border-admin-border bg-admin-surface pl-10 pr-4 text-admin-xs text-admin-text outline-none transition placeholder:text-admin-text-soft focus:border-admin-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />

                                        <select
                                            value={category}
                                            onChange={handleCategoryChange}
                                            className="h-11 w-full appearance-none rounded-admin-md border border-admin-border bg-admin-surface pl-9 pr-9 text-admin-xs font-admin-semibold text-admin-text outline-none focus:border-admin-primary sm:w-[190px] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                        >
                                            <option value="all">All categories</option>

                                            {categories.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />
                                    </div>

                                    {(search || category !== "all" || status !== "all") && (
                                        <button type="button" onClick={resetFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-admin-md border border-admin-border px-4 text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                                            <SlidersHorizontal size={14} />
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </motion.section>
                        </div>

                        {selectedIds.length > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0, y: -5 }} animate={{ opacity: 1, height: "auto", y: 0 }} className="mb-4 flex items-center justify-between gap-3 rounded-admin-lg border border-admin-primary/20 bg-admin-primary-soft px-4 py-3 dark:bg-amber-400/10">
                                <p className="text-admin-xs font-admin-bold text-admin-text dark:text-gray-100">
                                    {selectedIds.length} {selectedIds.length === 1 ? "recipe" : "recipes"} selected
                                </p>

                                <button type="button" className="inline-flex items-center gap-2 rounded-admin-md px-3 py-2 text-admin-xs font-admin-bold text-red-500 transition hover:bg-red-500/10 dark:text-red-400">
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
                            <AdminTable
                                data={paginatedRecipes}
                                columns={recipeColumns}
                                rowKey="id"
                                selectable
                                selectedIds={selectedIds}
                                allSelected={allVisibleSelected}
                                onToggleAll={toggleAll}
                                onToggleRow={toggleRow}
                                sort={sort}
                                onSort={handleSort}
                                emptyTitle="No recipes found"
                                emptyDescription="Try changing your search or filter criteria."
                            />
                        </motion.div>

                        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p className="text-admin-xs text-admin-text-muted dark:text-gray-400">
                                Showing{" "}
                                <strong className="text-admin-text dark:text-gray-100">
                                    {sortedRecipes.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                                </strong>{" "}
                                to{" "}
                                <strong className="text-admin-text dark:text-gray-100">
                                    {Math.min(currentPage * itemsPerPage, sortedRecipes.length)}
                                </strong>{" "}
                                of{" "}
                                <strong className="text-admin-text dark:text-gray-100">
                                    {sortedRecipes.length}
                                </strong>{" "}
                                recipes
                            </p>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                                    className="grid size-9 place-items-center rounded-admin-md border border-admin-border bg-admin-card text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                                >
                                    ←
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => setPage(pageNumber)}
                                        className={`grid size-9 place-items-center rounded-admin-md text-admin-xs font-admin-bold transition ${currentPage === pageNumber ? "bg-admin-primary text-white dark:bg-amber-400 dark:text-gray-950" : "border border-admin-border bg-admin-card text-admin-text-muted hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                                    className="grid size-9 place-items-center rounded-admin-md border border-admin-border bg-admin-card text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
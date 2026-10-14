import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Filter, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";

import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminTable from "../../../components/admin/table/AdminTable";
import TablePagination from "../../../components/admin/table/TablePagination";
import CommentStatusBadge from "../../../components/admin/comment/CommentStatusBadge";
import CommentActions from "../../../components/admin/comment/CommentActions";

import { commentsData, commentStatuses, commentsPerPage } from "../../../data/comments";

const commentColumns = [
    {
        key: "content",
        label: "Comment",
        sortable: true,
        headerClassName: "min-w-[360px] px-5 py-4",
        cellClassName: "px-5 py-4",
        render: (comment) => (
            <div className="max-w-[420px]">
                <Link to={`/admin/comments/edit/${comment.id}`} className="block max-w-[420px] truncate text-admin-sm font-admin-semibold text-admin-text transition hover:text-admin-primary dark:text-gray-200 dark:hover:text-amber-400">
                    <p className="line-clamp-2 text-admin-xs leading-admin-relaxed text-admin-text dark:text-gray-200">{comment.content}</p>
                </Link>
                <Link to={`/admin/users/${comment.authorId || comment.author}`} className="mt-2 inline-flex items-center gap-2 text-[10px] font-admin-semibold text-admin-text-muted transition hover:text-admin-primary dark:text-gray-500 dark:hover:text-amber-400">
                    {comment.author}
                </Link>
            </div>
        ),
    },
    {
        key: "postTitle",
        label: "Post",
        sortable: true,
        render: (comment) => (
            <Link to={`/recipe/${comment.postSlug}`} className="block max-w-[250px] truncate text-admin-xs font-admin-semibold text-admin-text transition hover:text-admin-primary dark:text-gray-200 dark:hover:text-amber-400">
                {comment.postTitle}
            </Link>
        ),
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (comment) => <CommentStatusBadge status={comment.status} />,
    },
    {
        key: "date",
        label: "Date",
        sortable: true,
        render: (comment) => <span className="whitespace-nowrap text-admin-xs text-admin-text-muted dark:text-gray-400">{comment.date}</span>,
    },
];

export default function AllComments() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState({ key: "date", direction: "desc" });
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;

        const confirmed = window.confirm(`Delete ${selectedIds.length} selected ${selectedIds.length === 1 ? "comment" : "comments"}?`);

        if (!confirmed) return;

        console.log("Delete comments:", selectedIds);
        setSelectedIds([]);
    };

    const filteredComments = useMemo(() => {
        const query = search.trim().toLowerCase();

        return commentsData.filter((comment) => {
            const matchesSearch = !query || comment.content.toLowerCase().includes(query) || comment.author.toLowerCase().includes(query) || comment.authorEmail.toLowerCase().includes(query) || comment.postTitle.toLowerCase().includes(query);
            const matchesStatus = status === "all" || comment.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    const sortedComments = useMemo(() => {
        const comments = [...filteredComments];

        comments.sort((a, b) => {
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

            if (valueA < valueB) return sort.direction === "asc" ? -1 : 1;
            if (valueA > valueB) return sort.direction === "asc" ? 1 : -1;

            return 0;
        });

        return comments;
    }, [filteredComments, sort]);

    const totalPages = Math.max(1, Math.ceil(sortedComments.length / commentsPerPage));
    const currentPage = Math.min(page, totalPages);

    const paginatedComments = sortedComments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

    const handleSort = (key) => {
        setSort((current) => ({
            key,
            direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
        }));

        setPage(1);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
        setSelectedIds([]);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(1);
        setSelectedIds([]);
    };

    const visibleIds = paginatedComments.map((comment) => comment.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

    const toggleAll = () => {
        if (allVisibleSelected) {
            setSelectedIds((current) => current.filter((id) => !visibleIds.includes(id)));
            return;
        }

        setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
    };

    const toggleRow = (id) => {
        setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };

    const handleDeleteComment = (comment) => {
        const confirmed = window.confirm(`Delete this comment by ${comment.author}?`);

        if (!confirmed) return;

        console.log("Delete comment:", comment.id);
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("all");
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
                                <h1 className="text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">Comments</h1>
                                <p className="mt-2 max-w-[620px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">Review, manage and moderate comments posted across Flavoriz.</p>
                            </div>

                            <Link to="/admin/comments/add" className="admin-btn-primary self-start gap-2 md:self-auto">
                                <Plus size={16} />
                                Add comment
                            </Link>
                        </motion.section>

                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="overflow-x-auto">
                                <div className="inline-flex min-w-max items-center gap-1 rounded-admin-lg border border-admin-border bg-admin-card p-1.5 dark:border-gray-800 dark:bg-gray-900">
                                    {commentStatuses.map((tab) => {
                                        const count = tab.key === "all" ? commentsData.length : commentsData.filter((comment) => comment.status === tab.key).length;
                                        const active = status === tab.key;

                                        return (
                                            <button key={tab.key} type="button" onClick={() => handleStatusChange(tab.key)} className={`inline-flex items-center gap-2 rounded-admin-md px-4 py-2 text-admin-xs font-admin-bold transition-all ${active ? "bg-admin-primary-soft text-admin-primary dark:bg-amber-400/10 dark:text-amber-400" : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"}`}>
                                                {tab.label}
                                                <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active ? "bg-admin-primary text-white dark:bg-amber-400 dark:text-gray-950" : "bg-admin-surface text-admin-text-soft dark:bg-gray-800 dark:text-gray-500"}`}>{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="admin-card w-full rounded-[22px] p-3 lg:flex-1">
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                    <div className="relative min-w-0 flex-1">
                                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />
                                        <input type="search" value={search} onChange={handleSearchChange} placeholder="Search comments, users or posts..." className="h-11 w-full rounded-admin-md border border-admin-border bg-admin-surface pl-10 pr-4 text-admin-xs text-admin-text outline-none transition placeholder:text-admin-text-soft focus:border-admin-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500" />
                                    </div>

                                    {(search || status !== "all") && (
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
                                <p className="text-admin-xs font-admin-bold text-admin-text dark:text-gray-100">{selectedIds.length} {selectedIds.length === 1 ? "comment" : "comments"} selected</p>

                                <button type="button" onClick={handleBulkDelete} className="inline-flex items-center gap-2 rounded-admin-md px-3 py-2 text-admin-xs font-admin-bold text-red-500 transition hover:bg-red-500/10 dark:text-red-400">
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
                            <AdminTable
                                data={paginatedComments}
                                columns={commentColumns}
                                rowKey="id"
                                selectable
                                selectedIds={selectedIds}
                                allSelected={allVisibleSelected}
                                onToggleAll={toggleAll}
                                onToggleRow={toggleRow}
                                sort={sort}
                                onSort={handleSort}
                                actions={(comment) => <CommentActions comment={comment} onDelete={handleDeleteComment} />}
                                emptyTitle="No comments found"
                                emptyDescription="Try changing your search or status filter."
                            />
                        </motion.div>

                        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p className="text-admin-xs text-admin-text-muted dark:text-gray-400">
                                Showing <strong className="text-admin-text dark:text-gray-100">{sortedComments.length === 0 ? 0 : (currentPage - 1) * commentsPerPage + 1}</strong> to <strong className="text-admin-text dark:text-gray-100">{Math.min(currentPage * commentsPerPage, sortedComments.length)}</strong> of <strong className="text-admin-text dark:text-gray-100">{sortedComments.length}</strong> comments
                            </p>

                            <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
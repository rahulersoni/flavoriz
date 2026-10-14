import { toast } from "sonner";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Filter, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";

import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminTable from "../../../components/admin/table/AdminTable";
import UserActions from "../../../components/admin/user/UserActions";
import UserRoleBadge from "../../../components/admin/user/RoleBadge";
import UserStatusBadge from "../../../components/admin/user/UserStatusBadge";
import TablePagination from "../../../components/admin/table/TablePagination";

import { usersData, userRoles, userStatuses, usersPerPage } from "../../../data/users";

const userColumns = [
    {
        key: "name",
        label: "User",
        sortable: true,
        headerClassName: "min-w-[300px] px-5 py-4",
        cellClassName: "px-5 py-4",
        render: (user) => (
            <Link to={`/admin/users/edit/${user.id}`} className="group flex min-w-[280px] items-center gap-3">
                <img src={user.avatar} alt="" className="size-10 shrink-0 rounded-full object-cover transition-transform duration-200 group-hover:scale-105" />
                <div className="min-w-0">
                    <p className="truncate text-admin-sm font-admin-bold text-admin-text transition-colors group-hover:text-admin-primary dark:text-gray-100 dark:group-hover:text-amber-400">{user.name}</p>
                    <p className="mt-0.5 truncate text-[10px] text-admin-text-soft dark:text-gray-500">{user.email}</p>
                </div>
            </Link>
        ),
    },
    {
        key: "role",
        label: "Role",
        sortable: true,
        render: (user) => <UserRoleBadge role={user.role} />,
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (user) => <UserStatusBadge status={user.status} />,
    },
    {
        key: "recipes",
        label: "Recipes",
        sortable: true,
        render: (user) => <span className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">{user.recipes}</span>,
    },
    {
        key: "comments",
        label: "Comments",
        sortable: true,
        render: (user) => <span className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">{user.comments}</span>,
    },
    {
        key: "joined",
        label: "Joined",
        sortable: true,
        render: (user) => <span className="whitespace-nowrap text-admin-xs text-admin-text-muted dark:text-gray-400">{user.joined}</span>,
    },
];

export default function AllUsers() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState({ key: "joined", direction: "desc" });
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleDeleteUser = (user) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${user.name}?`);

        if (!confirmed) {
            return;
        }

        toast.success(`User ${user.name} is deleted.`);
        console.log("Delete user:", user.id);

        // API delete will be added later.
    };

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return usersData.filter((user) => {
            const matchesSearch = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
            const matchesRole = role === "all" || user.role === role;
            const matchesStatus = status === "all" || user.status === status;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [search, role, status]);

    const sortedUsers = useMemo(() => {
        const users = [...filteredUsers];

        users.sort((a, b) => {
            let valueA = a[sort.key];
            let valueB = b[sort.key];

            if (sort.key === "joined") {
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

        return users;
    }, [filteredUsers, sort]);

    const totalPages = Math.max(1, Math.ceil(sortedUsers.length / usersPerPage));
    const currentPage = Math.min(page, totalPages);
    const paginatedUsers = sortedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

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
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setPage(1);
        setSelectedIds([]);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setPage(1);
        setSelectedIds([]);
    };

    const visibleIds = paginatedUsers.map((user) => user.id);
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

    const resetFilters = () => {
        setSearch("");
        setRole("all");
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
                        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-7  flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <h3 className="text-admin-3xl font-admin-bold tracking-[-0.045em] text-admin-text sm:text-admin-4xl dark:text-gray-100">Users</h3>
                                <p className="mt-2 max-w-[620px] text-admin-sm leading-admin-relaxed text-admin-text-muted dark:text-gray-400">Manage Flavoriz users, roles, account status and activity.</p>
                            </div>
                            <Link type="button" className="admin-btn-primary self-start md:self-auto" to="/admin/users/add">
                                <Plus size={16} />
                                Add new user
                            </Link>
                        </motion.section>

                        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="admin-card mb-4 rounded-[22px] p-3">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                <div className="relative min-w-0 flex-1">
                                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />
                                    <input type="search" value={search} onChange={handleSearchChange} placeholder="Search users by name or email..." className="h-11 w-full rounded-admin-md border border-admin-border bg-admin-surface pl-10 pr-4 text-admin-xs text-admin-text outline-none transition placeholder:text-admin-text-soft focus:border-admin-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500" />
                                </div>

                                <div className="relative">
                                    <Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />
                                    <select value={role} onChange={handleRoleChange} className="h-11 w-full appearance-none rounded-admin-md border border-admin-border bg-admin-surface pl-9 pr-9 text-admin-xs font-admin-semibold text-admin-text outline-none focus:border-admin-primary sm:w-[170px] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                                        {userRoles.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                                    </select>
                                </div>

                                <div className="relative">
                                    <select value={status} onChange={handleStatusChange} className="h-11 w-full appearance-none rounded-admin-md border border-admin-border bg-admin-surface px-4 pr-9 text-admin-xs font-admin-semibold text-admin-text outline-none focus:border-admin-primary sm:w-[170px] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                                        {userStatuses.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                                    </select>
                                </div>

                                {(search || role !== "all" || status !== "all") && (
                                    <button type="button" onClick={resetFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-admin-md border border-admin-border px-4 text-admin-xs font-admin-bold text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                                        <SlidersHorizontal size={14} />
                                        Reset
                                    </button>
                                )}
                            </div>
                        </motion.section>

                        {selectedIds.length > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0, y: -5 }} animate={{ opacity: 1, height: "auto", y: 0 }} className="mb-4 flex items-center justify-between gap-3 rounded-admin-lg border border-admin-primary/20 bg-admin-primary-soft px-4 py-3 dark:bg-amber-400/10">
                                <p className="text-admin-xs font-admin-bold text-admin-text dark:text-gray-100">{selectedIds.length} {selectedIds.length === 1 ? "user" : "users"} selected</p>
                                <button type="button" className="inline-flex items-center gap-2 rounded-admin-md px-3 py-2 text-admin-xs font-admin-bold text-red-500 transition hover:bg-red-500/10 dark:text-red-400">
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
                            <AdminTable
                                data={paginatedUsers}
                                columns={userColumns}
                                rowKey="id"
                                selectable
                                selectedIds={selectedIds}
                                allSelected={allVisibleSelected}
                                onToggleAll={toggleAll}
                                onToggleRow={toggleRow}
                                sort={sort}
                                onSort={handleSort}
                                actions={(user) => <UserActions user={user} onDelete={handleDeleteUser} />}
                                emptyTitle="No users found"
                                emptyDescription="Try changing your search or filter criteria."
                            />

                            {/* <AdminTable data={paginatedUsers} columns={userColumns} rowKey="id" selectable selectedIds={selectedIds} allSelected={allVisibleSelected} onToggleAll={toggleAll} onToggleRow={toggleRow} sort={sort} onSort={handleSort} emptyTitle="No users found" emptyDescription="Try changing your search or filter criteria." /> */}
                        </motion.div>

                        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p className="text-admin-xs text-admin-text-muted dark:text-gray-400">
                                Showing <strong className="text-admin-text dark:text-gray-100">{sortedUsers.length === 0 ? 0 : (currentPage - 1) * usersPerPage + 1}</strong> to <strong className="text-admin-text dark:text-gray-100">{Math.min(currentPage * usersPerPage, sortedUsers.length)}</strong> of <strong className="text-admin-text dark:text-gray-100">{sortedUsers.length}</strong> users
                            </p>

                            <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
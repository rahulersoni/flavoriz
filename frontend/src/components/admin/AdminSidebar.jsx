import { Link, NavLink } from "react-router-dom";
import { BarChart3, ChefHat, FileText, Home, LogOut, MessageSquare, Settings, Users, X } from "lucide-react";

const mainItems = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: Home,
  },
  {
    label: "Recipes",
    to: "/admin/recipes",
    icon: ChefHat,
  },
  // {
  //   label: "Articles",
  //   to: "/admin/articles",
  //   icon: FileText,
  // },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Comments",
    to: "/admin/comments",
    icon: MessageSquare,
  },
];

const manageItems = [
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({ open, onClose }) {
  const renderItems = (items) =>
    items.map(({ label, to, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/admin"}
        onClick={onClose}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-admin-lg px-2 py-2 text-admin-sm font-admin-semibold transition-all duration-200 ${isActive
            ? "bg-admin-primary-soft text-admin-primary"
            : "text-admin-text-muted hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span className={`grid size-7 shrink-0 place-items-center rounded-admin-md transition-all duration-200 ${isActive ? "bg-admin-primary text-white" : "bg-transparent group-hover:bg-admin-card dark:group-hover:bg-gray-700"}`}>
              <Icon size={15} strokeWidth={1.9} />
            </span>

            <span className="min-w-0 flex-1 truncate">{label}</span>

            {isActive && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-admin-primary" />}
          </>
        )}
      </NavLink>
    ));

  return (
    <>
      {open && (
        <button type="button" aria-label="Close sidebar" onClick={onClose} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm dark:bg-black/60 lg:hidden" />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-dvh w-[270px] flex-col border-r border-admin-border bg-admin-card shadow-admin transition-transform duration-300 ease-out dark:border-gray-800 dark:bg-gray-950 dark:shadow-none ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-admin-border px-5 dark:border-gray-800">
          <NavLink to="/admin" onClick={onClose} className="text-2xl font-black tracking-[-0.07em] text-admin-text dark:text-gray-100">
            FLA<span className="text-admin-primary">V</span>ORIZ
          </NavLink>

          <button type="button" onClick={onClose} aria-label="Close sidebar" className="grid size-9 place-items-center rounded-admin-md text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div data-lenis-prevent-wheel className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 [scrollbar-color:var(--admin-border)_transparent] [scrollbar-width:thin] dark:[scrollbar-color:#374151_transparent]">
          <p className="mb-3 px-3 text-[10px] font-admin-bold uppercase tracking-[0.16em] text-admin-text-soft dark:text-gray-500">Workspace</p>

          <nav aria-label="Workspace navigation" className="space-y-1.5">
            {renderItems(mainItems)}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-admin-bold uppercase tracking-[0.16em] text-admin-text-soft dark:text-gray-500">Manage</p>

          <nav aria-label="Management navigation" className="space-y-1.5">
            {renderItems(manageItems)}
          </nav>

          <div className="h-6" />
        </div>

        {/* User Section */}
        <Link to="/admin/users/edit/2">
          <div className="shrink-0 border-t border-admin-border bg-admin-card p-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-3 flex items-center gap-3 rounded-admin-lg bg-admin-surface p-3 dark:bg-gray-900">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-admin-primary text-sm font-admin-bold text-white">
                MR
              </div>

              <div className="min-w-0">
                <p className="truncate text-admin-sm font-admin-bold text-admin-text dark:text-gray-100">Maria Rodriguez</p>
                <p className="truncate text-admin-xs text-admin-text-muted dark:text-gray-400">Administrator</p>
              </div>
            </div>

            <button type="button" className="flex w-full items-center gap-3 rounded-admin-lg px-3 py-2.5 text-admin-sm font-admin-semibold text-admin-text-muted transition hover:bg-admin-surface hover:text-admin-text dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
              <LogOut size={17} />
              <span>Sign out</span>
            </button>
          </div>
        </Link>
      </aside>
    </>
  );
}
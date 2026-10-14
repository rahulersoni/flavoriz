import { Bell, ChevronDown, Menu, Moon, Search, Settings, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function AdminHeader({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-19.5 items-center justify-between border-b border-admin-border bg-admin-card/90 px-4 text-admin-text backdrop-blur-xl sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-950/90 dark:text-gray-100">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenuClick} className="grid size-10 place-items-center rounded-admin-lg border border-admin-border bg-admin-card text-admin-text transition hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 lg:hidden" aria-label="Open menu">
          <Menu size={19} />
        </button>

        <div>
          <p className="hidden text-admin-xs text-admin-text-soft sm:block dark:text-gray-500">Flavoriz workspace</p>
          <h5 className="text-admin-sm font-admin-bold tracking-tight text-admin-text sm:text-admin-xl dark:text-gray-100">Dashboard</h5>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-soft dark:text-gray-500" />
          <input type="search" placeholder="Search anything..." className="admin-input h-10 w-57.5 bg-admin-surface pl-10 pr-4 text-admin-sm dark:border-gray-800 dark:bg-gray-900" />
        </label>

        <button type="button" onClick={toggleTheme} className="grid size-10 place-items-center rounded-admin-lg border border-admin-border bg-admin-card text-admin-text transition hover:-translate-y-0.5 hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        <button type="button" className="relative grid size-10 place-items-center rounded-admin-lg border border-admin-border bg-admin-card text-admin-text transition hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-admin-primary" />
        </button>

        <div className="group relative">
          <button type="button" className="flex items-center gap-2 rounded-admin-lg border border-admin-border bg-admin-card p-1.5 pr-2.5 text-admin-text transition hover:bg-admin-surface dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label="Open user menu">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Administrator" className="size-7 rounded-admin-md object-cover" />
            <ChevronDown size={14} className="hidden text-admin-text-muted transition-transform duration-300 group-hover:rotate-180 sm:block dark:text-gray-400" />
          </button>

          <div className="pointer-events-none absolute right-0 top-full w-48 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="translate-y-3 overflow-hidden rounded-admin-lg border border-admin-border bg-admin-card p-1.5 shadow-admin-lg transition-transform duration-300 ease-out group-hover:translate-y-0 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
              <Link to="/admin/users/edit/2" className="flex w-full items-center gap-3 rounded-admin-md px-3 py-2.5 text-left text-admin-sm font-admin-medium text-admin-text transition hover:bg-admin-surface dark:text-gray-100 dark:hover:bg-gray-800">
                <User size={16} className="text-admin-text-muted dark:text-gray-400" />
                Profile
              </Link>

              <Link to="/admin/settings" className="flex w-full items-center gap-3 rounded-admin-md px-3 py-2.5 text-left text-admin-sm font-admin-medium text-admin-text transition hover:bg-admin-surface dark:text-gray-100 dark:hover:bg-gray-800">
                <Settings size={16} className="text-admin-text-muted dark:text-gray-400" />
                Settings
              </Link>

              <div className="my-1 border-t border-admin-border dark:border-gray-800" />

              <button type="button" className="flex w-full items-center gap-3 rounded-admin-md px-3 py-2.5 text-left text-admin-sm font-admin-medium text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
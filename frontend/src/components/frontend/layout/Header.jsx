import { Search, UserRound, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ThemeToggle from "../../ThemeToggle";

const links = ["Home", "About", "Recipes", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const accountMenuRef = useRef(null);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const isAdmin = user?.role === "admin";
  const isAuthor = user?.role === "author";

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setSearchOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/recipes");
    } else {
      navigate(`/recipes?search=${encodeURIComponent(query)}`);
    }

    setSearchOpen(false);
    setSearch("");
  };

  const handleLogout = () => {
    setAccountMenuOpen(false);
    setOpen(false);
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/90 backdrop-blur-xl">
      <div className="container-site flex h-19 items-center justify-between gap-6">
        <Link to="/" className="shrink-0 text-[22px] font-extrabold tracking-tighter">
          FLAV<span className="text-primary">O</span>RIZ
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => (
            <NavLink
              key={link}
              to={index === 0 ? "/" : `/${link.toLowerCase()}`}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {link}
            </NavLink>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((value) => !value);
              setOpen(false);
              setAccountMenuOpen(false);
            }}
            className="grid size-10 place-items-center rounded-full text-text transition-colors hover:bg-muted"
          >
            {searchOpen ? (
              <X size={18} />
            ) : (
              <Search size={18} strokeWidth={1.8} />
            )}
          </button>

          {/* Account Dropdown */}
          <div className="relative" ref={accountMenuRef}>
            <button
              type="button"
              aria-label="Account menu"
              aria-expanded={accountMenuOpen}
              aria-haspopup="menu"
              onClick={() => {
                setAccountMenuOpen((value) => !value);
                setOpen(false);
                setSearchOpen(false);
              }}
              className="grid size-10 place-items-center rounded-full border border-border text-text transition-colors hover:bg-muted"
            >
              <UserRound size={18} strokeWidth={1.8} />
            </button>

            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  role="menu"
                  className="absolute right-0 top-full z-60 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl"
                >
                  {isAuthenticated ? (
                    <>
                      {/* User Information */}
                      <div className="border-b border-border px-3 py-3">
                        <p className="truncate text-sm font-semibold text-text">
                          {user?.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-soft">
                          {user?.email}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold capitalize text-primary">
                          {user?.role || "subscriber"}
                        </span>
                      </div>

                      {/* Account Profile */}
                      <Link
                        to="/account"
                        role="menuitem"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text transition-colors hover:bg-muted"
                      >
                        <UserRound size={17} />
                        Account Profile
                      </Link>

                      {/* Admin / Author Dashboard */}
                      {(isAdmin || isAuthor) && (
                        <Link
                          to="/admin"
                          role="menuitem"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text transition-colors hover:bg-muted"
                        >
                          <LayoutDashboard size={17} />
                          {isAdmin
                            ? "Admin Dashboard"
                            : "Author Dashboard"}
                        </Link>
                      )}

                      <div className="my-1 border-t border-border" />

                      {/* Logout */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/account"
                        role="menuitem"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text transition-colors hover:bg-muted"
                      >
                        <UserRound size={17} />
                        Login / Register
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => {
              setOpen((value) => !value);
              setSearchOpen(false);
              setAccountMenuOpen(false);
            }}
            className="grid size-10 place-items-center rounded-full border border-border text-text transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="container-site py-4">
              <form
                onSubmit={handleSearch}
                className="relative mx-auto max-w-150"
              >
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                />

                <label htmlFor="navbar-search" className="sr-only">
                  Search recipes
                </label>

                <input
                  autoFocus
                  id="navbar-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search recipes..."
                  className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-24 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />

                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-text transition-colors hover:bg-primary-hover"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {links.map((link, index) => (
                <NavLink
                  key={link}
                  to={index === 0 ? "/" : `/${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 font-semibold transition-colors ${isActive
                      ? "bg-accent text-primary"
                      : "text-text hover:bg-muted hover:text-primary"
                    }`
                  }
                >
                  {link}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

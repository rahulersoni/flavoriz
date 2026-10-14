import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FrontendLayout from "./layouts/FrontendLayout";
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
import AdminRoute from "../src/routes/AdminRoute"

// Frontend pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Contact = lazy(() => import("./pages/Contact"));
const Account = lazy(() => import("./pages/Account"));
const RecipeSingle = lazy(() => import("./pages/RecipeSingle"));

// User dashboard pages
const SavedRecipes = lazy(() => import("./pages/user/SavedRecipes"));
const LikedRecipes = lazy(() => import("./pages/user/LikedRecipes"));
const AccountComments = lazy(() => import("./pages/user/AccountComments"));
const AccountSettings = lazy(() => import("./pages/user/AccountSettings"));

// Admin user pages
const AddUser = lazy(() => import("./pages/admin/user/AddUser"));
const AllUsers = lazy(() => import("./pages/admin/user/AllUsers"));
const EditUser = lazy(() => import("./pages/admin/user/EditUser"));

// Admin dashboard and recipe pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AllRecipes = lazy(() => import("./pages/admin/recipe/AllRecipes"));
const AddRecipe = lazy(() => import("./pages/admin/recipe/AddRecipe"));
const EditRecipe = lazy(() => import("./pages/admin/recipe/EditRecipe"));

// Admin comment pages
const AllComments = lazy(() => import("./pages/admin/comment/AllComments"));
const AddComment = lazy(() => import("./pages/admin/comment/AddComment"));
const EditComment = lazy(() => import("./pages/admin/comment/EditComment"));

// Admin settings
const Settings = lazy(() => import("./pages/admin/setting/Settings"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
          </div>
        }
      >
        <Routes>
          {/* Frontend */}
          <Route element={<FrontendLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:slug" element={<RecipeSingle />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* User account */}
          <Route path="/account" element={<FrontendLayout />}>
            <Route index element={<Account />} />
            <Route path="saved-recipes" element={<SavedRecipes />} />
            <Route path="liked-recipes" element={<LikedRecipes />} />
            <Route path="comments" element={<AccountComments />} />
            <Route path="profile" element={<AccountSettings />} />
          </Route>

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              {/* Recipes */}
              <Route path="recipes" element={<AllRecipes />} />
              <Route path="recipes/add" element={<AddRecipe />} />
              <Route path="recipes/edit/:id" element={<EditRecipe />} />

              {/* Comments */}
              <Route path="comments" element={<AllComments />} />
              <Route path="comments/add" element={<AddComment />} />
              <Route path="comments/edit/:id" element={<EditComment />} />

              {/* Users */}
              <Route path="users" element={<AllUsers />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

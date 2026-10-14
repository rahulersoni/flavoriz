import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-admin-bg">

            <div className="flex">
                <AdminSidebar />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

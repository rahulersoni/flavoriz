import { useAuth } from "../context/AuthContext";
import Auth from "./Auth";
import AccountProfile from "./user/AccountProfile";

export default function Account() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <AccountProfile /> : <Auth />;
}
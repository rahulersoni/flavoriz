import { Outlet } from "react-router-dom";
import Header from "../components/frontend/layout/Header";
import ScrollToTop from "../components/ScrollToTop";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/frontend/layout/Footer"

export default function FrontendLayout() {
    return (
        <>
            <ScrollToTop />

            <SmoothScroll>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </SmoothScroll>
        </>
    );
}
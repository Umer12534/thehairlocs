import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import WhatsappIcon from "../../components/ui/whatsappChat/WhatsappIcon";
import BacktoTop from "../../components/ui/backTotop/BacktoTop";

function MainLayout() {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        <WhatsappIcon />
        <BacktoTop />
        </>
    );
}

export default MainLayout;

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import WhatsappIcon from "../../components/ui/whatsappChat/WhatsappIcon";
import BacktoTop from "../../components/ui/backTotop/BacktoTop";
import ChatbotToggleButton from "../ui/catbotbutton/ChatbotToggleButton";

function MainLayout() {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        <WhatsappIcon />
        <ChatbotToggleButton/>
        <BacktoTop />
        </>
    );
}

export default MainLayout;

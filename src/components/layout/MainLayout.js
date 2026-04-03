import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import WhatsappIcon from "../../components/ui/whatsappChat/WhatsappIcon";
import BacktoTop from "../../components/ui/backTotop/BacktoTop";
import HairCareChat from "../ui/hairCareChat/HairCareChat";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsappIcon />
      <HairCareChat />
      <BacktoTop />
    </>
  );
}

export default MainLayout;

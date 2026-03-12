import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import WhatsappIcon from "../../components/ui/whatsappChat/WhatsappIcon";
import BacktoTop from "../../components/ui/backTotop/BacktoTop";
import ChatbotToggleButton from "../ui/catbotbutton/ChatbotToggleButton";
import ChatbotSidebar from "./ChatbotSidebar/ChatbotSidebar";
import { ChatProvider, useChat } from "../../contaxt/ChatContext";

function MainLayoutContent() {
  const { closeChat } = useChat();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsappIcon />
      <ChatbotToggleButton/>
      <BacktoTop />
      <ChatbotSidebar onClose={closeChat} />
    </>
  );
}

function MainLayout() {
  return (
    <ChatProvider>
      <MainLayoutContent />
    </ChatProvider>
  );
}

export default MainLayout;

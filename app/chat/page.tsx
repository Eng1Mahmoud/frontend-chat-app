import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatContent from "@/components/ChatContent";
import SocketController from "@/components/SocketController";

const ChatPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen">
        <SocketController />
        <SidebarTrigger />
        {/* Chat content goes here */}
        <ChatContent />
      </main>
    </SidebarProvider>
  );
};

export default ChatPage;

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatContent from "@/components/chat-page/ChatContent";
import SocketController from "@/components/SocketController";

const ChatPage = () => {
  return (
    <div className="overflow-y-hidden">
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen w-full bg-slate-950 text-white">
        <SocketController />
        {/* Chat content goes here */}
        <ChatContent />
      </main>
    </SidebarProvider>
    </div>
  );
};

export default ChatPage;

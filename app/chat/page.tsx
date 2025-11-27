import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatContent from "@/components/chat-page/ChatContent";
import SocketController from "@/components/SocketController";

const ChatPage = () => {
  return (
    <div className="h-screen w-full overflow-hidden flex">
      <SidebarProvider defaultOpen={true} className="w-full h-full flex">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full w-full bg-slate-950 text-white overflow-hidden">
          <SocketController />
          {/* Chat content goes here */}
          <ChatContent />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default ChatPage;

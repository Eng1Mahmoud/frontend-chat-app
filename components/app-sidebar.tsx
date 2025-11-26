import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import UserList from "./User-list/UserList";
import { LogedinUserUI } from "@/components/LogedinUserUI";

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-950 border-r border-white/5 shadow-xl shadow-white/8">
      <SidebarHeader className="bg-slate-950 ">
        <LogedinUserUI />
      </SidebarHeader>
      <SidebarContent className="bg-slate-950">
        <UserList />
      </SidebarContent>
    </Sidebar>
  );
}

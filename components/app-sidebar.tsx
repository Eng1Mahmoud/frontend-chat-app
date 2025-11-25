import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import UserList from "./User-list/UserList"
import { LogedinUserUI } from "@/components/LogedinUserUI"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader >
        <LogedinUserUI />
      </SidebarHeader>
      <SidebarContent>
        <UserList />
      </SidebarContent>
    </Sidebar>
  )
}
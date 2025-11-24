import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import UserList from "./User-list/UserList"
import LogdinUser from "./LogdinUser/LogdinUser"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader >
        <LogdinUser />
      </SidebarHeader>
      <SidebarContent>
        <UserList />
      </SidebarContent>
    </Sidebar>
  )
}
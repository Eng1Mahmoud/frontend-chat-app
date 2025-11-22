import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import UserList from "./User-list/UserList"
import UserAvatar from "./UserAvatar/UserAvatar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader >
       <UserAvatar/>
      </SidebarHeader>
      <SidebarContent>
        <UserList/>
      </SidebarContent>
    </Sidebar>
  )
}
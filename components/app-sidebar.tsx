import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader >
        <div className="text-lg font-bold">Chat App</div>
        <div className="bg-gray-500 h-px w-full rounded"/>
      </SidebarHeader>
      <SidebarContent>
        <div>
          user list here
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
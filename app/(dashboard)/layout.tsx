import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardNavbar from "@/modules/Dashboard/ui/components/DashboardNavbar"
import DashboardSidebar from "@/modules/Dashboard/ui/components/DashboardSidebar"

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">
        <DashboardNavbar />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default layout
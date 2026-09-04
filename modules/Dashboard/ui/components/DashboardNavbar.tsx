"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import DashboardCommand from "./DashboardCommand"
import { useEffect, useState } from "react"

const DashboardNavbar = () => {
    const [commandOpen, setCommandOpen] = useState(false)
    const { state, toggleSidebar, isMobile} = useSidebar()
    useEffect(()=>{
        const down = (e: KeyboardEvent) =>{
        if(e.key === "k" && (e.metaKey || e.ctrlKey) ){
                e.preventDefault()
                setCommandOpen((open)=> !open)
            }
        }

        document.addEventListener("keydown", down)
        return ()=> document.removeEventListener("keydown", down)
    }, [])

  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
    <nav className="flex gap-x-2 border-b px-4 py-3 bg-background items-center w-full">
        <Button onClick={toggleSidebar} className="size-9" variant="outline">
            {state === "collapsed" || isMobile ? 
                <PanelLeftIcon className="size-4" />
                : <PanelLeftCloseIcon className="size-4" />
            }
        </Button>

        <Button 
            className="h-9 w-60 justify-start text-muted-foreground hover:text-muted-foreground font-normal"
            variant="outline"
            size="sm"
            onClick={()=> setCommandOpen((open) => !open)}
        >
            <SearchIcon className="size-4" />
            Search
            <kbd className="ml-auto">
                <span>&#8984;K</span>
            </kbd>
        </Button>
    </nav>
</>
  )
}

export default DashboardNavbar
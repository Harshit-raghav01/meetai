"use client"


import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { BotIcon, StarIcon, VideoIcon } from "lucide-react"

import DashboardUserButton from "./DashboardUserButton"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenu,
    SidebarSeparator,
    SidebarGroupContent
} from "@/components/ui/sidebar"



const DashboardSidebar = () => {

    const pathName = usePathname()

    const firstSection = [
        {
            icon : VideoIcon,
            label : "Meetings",
            href : "/meetings"
        },
        {
            icon : BotIcon,
            label : "Agents",
            href : "/agents"
        },    
    ]


    const secondSection = [
        {
            icon : StarIcon,
            label : "Upgrade",
            href : "/upgrade"
        },  
    ]
    
  return (
    <Sidebar className="text-sidebar-accent-foreground">
        <SidebarHeader>
            <Link href='/' className="flex items-center gap-2 px-2 pt-2 ">
                <Image src={'/Logo.svg'} alt="Logo" height={36} width={36} />
                <h1 className="text-3xl">Meet.AI</h1>
            </Link>
        </SidebarHeader>

        <div className="px-4 py-2">
            <SidebarSeparator className="-ml-0.5 opacity-10 text-[#5D6B68]"  />
        </div>

        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {firstSection.map((item) => (
                            <SidebarMenuItem  key={item.href}>
                                <Link  href={item.href}>
                                    <SidebarMenuButton 
                                    isActive={pathName === item.href}
                                    className={cn("h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 cursor-pointer text-sm font-medium tracking-tigh", 
                                        pathName === item.href && "bg-linear-to-r/oklch border-[#5D6b68]/10"
                                    )}> 
                                        <item.icon className="size-5" />             
                                        {item.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
                        <div className="px-4 py-2">
            <SidebarSeparator className="-ml-0.5 opacity-10 text-[#5D6B68]"  />
        </div>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {secondSection.map((item) => (
                            <SidebarMenuItem  key={item.href}>
                                <Link  href={item.href}>
                                    <SidebarMenuButton 
                                    isActive={pathName === item.href}
                                    className={cn("h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 cursor-pointer text-sm font-medium tracking-tigh", 
                                        pathName === item.href && "bg-linear-to-r/oklch border-[#5D6b68]/10"
                                    )}> 
                                        <item.icon className="size-5" />             
                                        {item.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <DashboardUserButton />
        </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
"use client"
import GeneratedAvatar from "@/components/GeneratedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const DashboardUserButton = () => {
    const isMobile = useIsMobile()

    const { data, isPending } = authClient.useSession();

    if(!data?.user || isPending) {
        return null
    }

    const handleLogout = () => authClient.signOut()


    if(isMobile) return (
        <Drawer showSwipeHandle>
            <DrawerTrigger className="flex w-full gap-3 rounded-lg bg-white/5 hover:bg-white/10 p-3 border border-border/10 items-center justify-between overflow-hidden">
                {data.user.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image} />        
                </Avatar>
            ) : (
            <GeneratedAvatar 
                seed={data.user.name} 
                variant="initials"
                className="size-9"
            />
            )}

            <div className="flex flex-col flex-1 gap-0.5 text-left overflow-hidden min-w-0">
                <p className="text-sm truncate w-full" >{data.user.name}</p>
                <p className="text-xs truncate w-full" >{data.user.email}</p>
            </div>        

            <ChevronDownIcon className="size-4 shrink-0" />
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader className="mb-4">
                   
                    <DrawerTitle>
                        <p className="text-xl font-semibold w-full text-left">{data.user.name}</p>
                    </DrawerTitle>
                    <DrawerDescription className="text-sm w-full text-left">
                        {data.user.email}
                    </DrawerDescription>
                </DrawerHeader>
                
                <DrawerFooter>
                    <Button variant="outline">
                        <CreditCardIcon />
                        Billing
                    </Button>
                    
                    <Button onClick={handleLogout} variant="outline">
                        <LogOutIcon />
                        Log Out
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full gap-3 rounded-lg bg-white/5 hover:bg-white/10 p-3 border border-border/10 items-center justify-between overflow-hidden">
            {data.user.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image} />        
                </Avatar>
            ) : (
            <GeneratedAvatar 
                seed={data.user.name} 
                variant="initials"
                className="size-9"
            />
            )}

            <div className="flex flex-col flex-1 gap-0.5 text-left overflow-hidden min-w-0">
                <p className="text-sm truncate w-full" >{data.user.name}</p>
                <p className="text-xs truncate w-full" >{data.user.email}</p>
            </div>        

            <ChevronDownIcon className="size-4 shrink-0" />
        </DropdownMenuTrigger>
    
        <DropdownMenuContent side="left" align="end">
            <DropdownMenuGroup>
            <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-black text-sm truncate">{data.user.name}</span>  
                  <span className="text-xs font-normal text-muted-foreground truncate">{data.user.email}</span>
                </div>
            </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                Billing 
                <CreditCardIcon className="size-4"/>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center justify-between">
                Log Out 
                <LogOutIcon className="size-4" />
            </DropdownMenuItem>
            
        </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default DashboardUserButton
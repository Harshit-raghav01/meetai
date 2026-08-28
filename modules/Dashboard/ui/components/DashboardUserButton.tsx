import { user } from "@/auth-schema";
import GeneratedAvatar from "@/components/GeneratedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();

    if(!data?.user || isPending) {
        return null
    }

    const handleLogout = () => authClient.signOut()

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
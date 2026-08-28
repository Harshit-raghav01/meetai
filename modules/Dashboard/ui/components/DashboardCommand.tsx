"use client"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react";

interface Props {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen} : Props) => {
    
  return (
    <CommandDialog open={open} onOpenChange={setOpen} >
          <CommandInput placeholder="Find a meeting or agent"  />
          <CommandEmpty>No Result Found...</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem>Meeting: 01</CommandItem>
              <CommandItem>Agent: 01 </CommandItem>
            </CommandGroup>
          </CommandList>
      </CommandDialog>
  )
}

export default DashboardCommand
"use client"

import { Bell, Search, Zap, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"

export function TopNav() {
  const avatar = PlaceHolderImages?.find(img => img.id === "chef-avatar")

  return (
    <header className="h-16 border-b border-border/40 bg-white/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="h-10 w-10 hover:bg-primary/5 text-primary rounded-xl" />
        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search tickets, inventory, staff..."
            className="pl-12 bg-muted/40 border-none h-10 rounded-xl focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100/50">
          <Zap className="h-3 w-3 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">Kitchen Status: Optimal</span>
        </div>

        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-primary/5">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-primary border-2 border-white rounded-full" />
        </Button>
        
        <div className="h-8 w-px bg-border/40 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-11 w-11 rounded-2xl p-0 hover:scale-105 transition-transform">
              <Avatar className="h-11 w-11 border-2 border-primary/20 p-0.5">
                <AvatarImage src={avatar?.imageUrl} alt="Chef" className="rounded-xl" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">Chef</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-2xl p-2 border-none shadow-2xl" align="end" forceMount>
            <DropdownMenuLabel className="p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-black leading-none uppercase tracking-tight">Chef Sanjeev</p>
                <p className="text-xs leading-none text-muted-foreground font-medium">Head of Gastronomy</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="p-3 rounded-xl gap-3 cursor-pointer"><User className="h-4 w-4" /> Personal Profile</DropdownMenuItem>
            <DropdownMenuItem className="p-3 rounded-xl gap-3 cursor-pointer">Service Statistics</DropdownMenuItem>
            <DropdownMenuItem className="p-3 rounded-xl gap-3 cursor-pointer">Shift Schedule</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="p-3 rounded-xl gap-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 font-bold">End Shift & Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

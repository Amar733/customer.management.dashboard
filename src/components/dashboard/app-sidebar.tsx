
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Users, 
  BarChart3, 
  Settings, 
  ChefHat,
  TicketPercent,
  PartyPopper,
  ShieldCheck,
  Receipt
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useUser, useFirestore } from "@/firebase/provider"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { doc } from "firebase/firestore"
import { Label } from "@/components/ui/label"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"

const navItems = [
  {
    title: "Executive Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "staff", "customer"]
  },
  {
    title: "Products & Menu",
    url: "/dashboard/products",
    icon: UtensilsCrossed,
    roles: ["admin", "staff", "customer"]
  },
  {
    title: "Orders & Service",
    url: "/dashboard/orders",
    icon: Receipt,
    badge: "8",
    roles: ["admin", "staff"]
  },
  {
    title: "Guest Directory",
    url: "/dashboard/customers",
    icon: Users,
    roles: ["admin", "staff"]
  },
  {
    title: "Festive Hub",
    url: "/dashboard/offers",
    icon: PartyPopper,
    roles: ["admin", "staff", "customer"]
  },
  {
    title: "Promo Codes",
    url: "/dashboard/coupons",
    icon: TicketPercent,
    roles: ["admin"]
  },
  {
    title: "Deep Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["admin"]
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, role } = useUser()
  const firestore = useFirestore()

  // During loading or if role is missing, default to customer for prototyping visibility
  const currentRole = role || 'customer'

  const filteredItems = navItems.filter(item => 
    !item.roles || item.roles.includes(currentRole)
  )

  const handleRoleChange = (newRole: string) => {
    if (!user || !firestore) return;

    // Use non-blocking write to update the user's role in the prototype metadata
    setDocumentNonBlocking(
      doc(firestore, 'user_roles', user.uid),
      {
        role: newRole,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40 bg-card/80 backdrop-blur-xl">
      <SidebarHeader className="border-b h-16 flex items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-3 font-black text-2xl text-primary tracking-tighter">
          <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">Gusto<span className="text-foreground/80">Manager</span></span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-3 pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
            Restaurant Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-11 px-3 rounded-xl transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary group/item"
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <item.icon className="transition-transform group-hover/item:scale-110" />
                      <span className="flex-1 font-bold text-sm tracking-tight">{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-primary text-[10px] h-5 px-1.5 border-none group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 space-y-4">
        <SidebarMenu>
          {(currentRole === 'admin' || currentRole === 'staff') && (
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/dashboard/settings"}
                tooltip="Configurations"
                className="h-11 px-3 rounded-xl transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
              >
                <Link href="/dashboard/settings">
                  <Settings />
                  <span className="font-bold text-sm tracking-tight">Configurations</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>

        <div className="group-data-[collapsible=icon]:hidden pt-2">
          <div className="bg-muted/30 rounded-2xl p-3 border border-border/40 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              <ShieldCheck className="h-3.5 w-3.5" />
              Prototype Identity
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role-select" className="text-[10px] font-bold text-muted-foreground px-1">Active Role</Label>
              <Select value={currentRole} onValueChange={handleRoleChange}>
                <SelectTrigger id="role-select" className="h-9 bg-background border-none shadow-sm font-bold text-xs rounded-xl focus:ring-primary/20">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-2xl">
                  <SelectItem value="admin" className="rounded-lg font-bold text-xs">
                    Administrator
                  </SelectItem>
                  <SelectItem value="staff" className="rounded-lg font-bold text-xs">
                    Kitchen Staff
                  </SelectItem>
                  <SelectItem value="customer" className="rounded-lg font-bold text-xs">
                    Guest View
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

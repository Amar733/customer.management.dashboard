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
  Flame
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
import { useUser } from "@/firebase/provider"

const navItems = [
  {
    title: "Executive Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "staff", "customer"]
  },
  {
    title: "Culinary Catalog",
    url: "/dashboard/products",
    icon: UtensilsCrossed,
    roles: ["admin", "staff", "customer"]
  },
  {
    title: "Kitchen Feed",
    url: "/dashboard/orders",
    icon: Flame,
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
  const { role } = useUser()

  const filteredItems = navItems.filter(item => 
    !item.roles || (role && item.roles.includes(role))
  )

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
            {role === 'customer' ? 'Guest Lounge' : 'Back of House'}
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
      <SidebarFooter className="p-3 border-t border-border/40">
        <SidebarMenu>
          {role === 'admin' && (
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
      </SidebarFooter>
    </Sidebar>
  )
}

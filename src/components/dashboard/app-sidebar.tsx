"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings, 
  ChefHat,
  TicketPercent,
  PartyPopper,
  Flame,
  ArrowRight
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

const navItems = [
  {
    title: "Executive Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Culinary Catalog",
    url: "/dashboard/products",
    icon: UtensilsCrossed,
  },
  {
    title: "Kitchen Feed",
    url: "/dashboard/orders",
    icon: Flame,
    badge: "8"
  },
  {
    title: "Guest Directory",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Festive Hub",
    url: "/dashboard/offers",
    icon: PartyPopper,
  },
  {
    title: "Promo Codes",
    url: "/dashboard/coupons",
    icon: TicketPercent,
  },
  {
    title: "Deep Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

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
          <SidebarGroupLabel className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Back of House</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
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
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

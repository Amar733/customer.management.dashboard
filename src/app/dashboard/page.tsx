"use client"

import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 1700 },
  { name: "Jun", total: 2800 },
]

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: TrendingUp,
    trend: "up"
  },
  {
    title: "New Orders",
    value: "+2,350",
    change: "+18.1%",
    icon: ShoppingCart,
    trend: "up"
  },
  {
    title: "Active Customers",
    value: "+12,234",
    change: "+19%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Inventory Alert",
    value: "12 Items",
    change: "-4%",
    icon: Package,
    trend: "down"
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening in your shop today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={stat.title} className="shadow-sm border-none bg-card hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <div className="p-2 bg-primary/5 rounded-full">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-sm flex items-center gap-1 mt-2 font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>{stat.change}</span>
                <span className="text-muted-foreground font-normal ml-1">vs last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm border-none bg-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Revenue</CardTitle>
              <CardDescription>Performance trends over the last 6 months.</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted)/0.3)'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Bar
                    dataKey="total"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm border-none bg-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Total of 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
              ].map((sale) => (
                <div key={sale.email} className="flex items-center group cursor-pointer hover:bg-muted/30 p-2 rounded-lg transition-colors">
                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sale.name}`} alt={sale.name} />
                    <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-bold text-emerald-600">{sale.amount}</div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View All Transactions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { 
  TrendingUp, 
  Users, 
  Utensils, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChefHat
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
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 2100 },
  { name: "Wed", total: 1800 },
  { name: "Thu", total: 2400 },
  { name: "Fri", total: 3200 },
  { name: "Sat", total: 4800 },
]

const stats = [
  {
    title: "Daily Revenue",
    value: "$4,231.89",
    change: "+12.1%",
    icon: TrendingUp,
    trend: "up"
  },
  {
    title: "Active Tables",
    value: "18 / 25",
    change: "72% Occupancy",
    icon: Utensils,
    trend: "up"
  },
  {
    title: "Total Guests",
    value: "142",
    change: "+8%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Wait Time",
    value: "15 min",
    change: "-5 min",
    icon: Clock,
    trend: "down"
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground/90">Restaurant Briefing</h1>
        <p className="text-muted-foreground text-lg">Service is running smoothly. Here's tonight's performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={stat.title} className="shadow-sm border-none bg-card hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-sm flex items-center gap-1 mt-2 font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-primary'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>{stat.change}</span>
                <span className="text-muted-foreground font-normal ml-1">vs yesterday</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm border-none bg-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Velocity</CardTitle>
              <CardDescription>Revenue by service hour.</CardDescription>
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
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <CardTitle>Kitchen Queue</CardTitle>
            </div>
            <CardDescription>Active tickets awaiting service.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Table 4", detail: "2x Carbonara, 1x House Red", status: "Prep" },
                { name: "Table 12", detail: "1x Margherita (No Onions)", status: "Firing" },
                { name: "Table 7", detail: "3x Garden Salad, 2x Sparkling", status: "Ready" },
                { name: "Table 2", detail: "1x Ribeye (Medium Rare)", status: "Prep" },
                { name: "Table 9", detail: "4x Espresso, 2x Tiramisu", status: "Ready" },
              ].map((ticket) => (
                <div key={ticket.name} className="flex items-center group cursor-pointer hover:bg-muted/30 p-2 rounded-lg transition-colors border-l-4 border-primary/20 hover:border-primary">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary/5 rounded-full font-bold text-primary">
                    {ticket.name.split(' ')[1]}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none">{ticket.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">{ticket.detail}</p>
                  </div>
                  <div className={`ml-auto text-xs px-2 py-1 rounded-full font-bold ${
                    ticket.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ticket.status}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View POS System</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
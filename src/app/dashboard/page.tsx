"use client"

import { 
  TrendingUp, 
  Users, 
  Utensils, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChefHat,
  Flame,
  Star,
  Zap
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
  Cell
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const data = [
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 2100 },
  { name: "Wed", total: 1800 },
  { name: "Thu", total: 2400 },
  { name: "Fri", total: 3200 },
  { name: "Sat", total: 4800 },
  { name: "Sun", total: 4200 },
]

const stats = [
  {
    title: "Tonight's Revenue",
    value: "$4,231.89",
    change: "+12.1%",
    icon: TrendingUp,
    trend: "up",
    description: "Peak: 8:00 PM"
  },
  {
    title: "Table Occupancy",
    value: "18 / 25",
    change: "72%",
    icon: Utensils,
    trend: "up",
    description: "4 parties waiting"
  },
  {
    title: "Daily Diners",
    value: "142",
    change: "+8%",
    icon: Users,
    trend: "up",
    description: "22 VIP members"
  },
  {
    title: "Kitchen Speed",
    value: "14 min",
    change: "-2 min",
    icon: Clock,
    trend: "down",
    description: "Target: 15 min"
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-foreground/90">Namaste, Manager</h1>
          <p className="text-muted-foreground text-lg">Gusto Indian Bistro is humming beautifully this evening.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="shadow-sm border-primary/20 text-primary">Live View</Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">Kitchen Panic Mode</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={stat.title} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up relative overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="h-20 w-20" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.title}</CardTitle>
              <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={`px-1.5 py-0 border-none font-bold text-[10px] ${
                  stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 inline mr-0.5" /> : <ArrowDownRight className="h-3 w-3 inline mr-0.5" />}
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm animate-slide-up bg-white/50 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Revenue Velocity</CardTitle>
              <CardDescription>Visualizing performance across service hours.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--primary)/0.05)'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                  />
                  <Bar
                    dataKey="total"
                    radius={[10, 10, 0, 0]}
                    barSize={45}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === data.length - 2 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.3)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary animate-pulse" />
              <CardTitle className="text-xl font-bold">Live Kitchen Feed</CardTitle>
            </div>
            <CardDescription>Hot tickets currently in production.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { table: "T-4", items: "Butter Chicken, Garlic Naan", time: "12m", status: "Plating", priority: "High" },
                { table: "T-12", items: "Mutton Biryani, Raita", time: "18m", status: "Firing", priority: "Normal" },
                { table: "T-7", items: "Pani Puri (x3), Mango Lassi", time: "4m", status: "Ready", priority: "Urgent" },
                { table: "T-2", items: "Indori Poha, Masala Chai", time: "8m", status: "Prep", priority: "Normal" },
              ].map((ticket, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border group">
                  <div className="h-12 w-12 flex flex-col items-center justify-center bg-primary/5 rounded-2xl font-black text-primary border border-primary/10">
                    <span className="text-[10px] leading-none opacity-50 uppercase">Tbl</span>
                    {ticket.table.split('-')[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold truncate">{ticket.items}</p>
                      {ticket.priority === 'High' && <Badge className="h-2 w-2 rounded-full p-0 bg-primary border-none shadow-glow" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Kitchen: {ticket.time}</span>
                      <div className="h-1 w-1 rounded-full bg-border" />
                      <span className="text-[10px] font-bold text-primary/80 uppercase">{ticket.status}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">3 Chefs Active</span>
              </div>
              <Button variant="link" className="text-xs text-primary font-bold">Manage Stations</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

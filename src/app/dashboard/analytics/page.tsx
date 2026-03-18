"use client"

import { 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  Pizza,
  Wine,
  Coffee,
  Utensils
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts"

const areaData = [
  { name: "Mon", revenue: 4000, covers: 240 },
  { name: "Tue", revenue: 3000, covers: 139 },
  { name: "Wed", revenue: 2000, covers: 980 },
  { name: "Thu", revenue: 2780, covers: 390 },
  { name: "Fri", revenue: 5890, covers: 480 },
  { name: "Sat", revenue: 7390, covers: 780 },
  { name: "Sun", revenue: 6490, covers: 630 },
]

const categoryData = [
  { name: "Mains", value: 450, icon: Utensils },
  { name: "Beverages", value: 300, icon: Wine },
  { name: "Desserts", value: 150, icon: Coffee },
  { name: "Starters", value: 200, icon: Pizza },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground/90">Hospitality Insights</h1>
          <p className="text-muted-foreground">Deep dive into your restaurant's revenue and service efficiency.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-card border-none shadow-sm">
            <Calendar className="h-4 w-4 text-primary" /> Last 7 Days
          </Button>
          <Button variant="outline" className="gap-2 bg-card border-none shadow-sm">
            <Filter className="h-4 w-4 text-primary" /> Segment
          </Button>
          <Button className="gap-2 shadow-sm bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" /> Export P&L
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Avg Check Size", value: "$42.24", change: "+4.2%", trend: "up" },
          { title: "Table Turnover", value: "1.4h", change: "-15m", trend: "down" },
          { title: "Waste Margin", value: "3.2%", change: "-1.1%", trend: "down" },
          { title: "Repeat Guests", value: "28.4%", change: "+5.2%", trend: "up" }
        ].map((item, idx) => (
          <Card key={item.title} className="border-none shadow-sm animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{item.value}</div>
              <p className={`text-xs flex items-center gap-1 mt-1 font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-primary'}`}>
                {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {item.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Revenue Forecast</CardTitle>
            <CardDescription>Daily intake across peak and off-peak hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Category Mix</CardTitle>
            <CardDescription>Contribution to total billables.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-8">
              {categoryData.map((cat, idx) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[idx]}} />
                    <span className="font-bold">{cat.name}</span>
                  </div>
                  <span className="text-muted-foreground font-medium">{((cat.value / 1100) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
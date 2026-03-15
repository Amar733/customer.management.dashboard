"use client"

import { 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter
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
  { name: "Mon", sales: 4000, orders: 240 },
  { name: "Tue", sales: 3000, orders: 139 },
  { name: "Wed", sales: 2000, orders: 980 },
  { name: "Thu", sales: 2780, orders: 390 },
  { name: "Fri", sales: 1890, orders: 480 },
  { name: "Sat", sales: 2390, orders: 380 },
  { name: "Sun", sales: 3490, orders: 430 },
]

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Wearables", value: 300 },
  { name: "Furniture", value: 300 },
  { name: "Accessories", value: 200 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Business Intelligence</h1>
          <p className="text-muted-foreground">Comprehensive insights into your store's performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-card border-none shadow-sm">
            <Calendar className="h-4 w-4" /> This Week
          </Button>
          <Button variant="outline" className="gap-2 bg-card border-none shadow-sm">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2 shadow-sm">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Conversion Rate", value: "3.24%", change: "+1.2%", trend: "up" },
          { title: "Avg Order Value", value: "$124.50", change: "-2.4%", trend: "down" },
          { title: "Returning Customers", value: "42%", change: "+5%", trend: "up" },
          { title: "Bounce Rate", value: "28.4%", change: "-4.2%", trend: "down" }
        ].map((item, idx) => (
          <Card key={item.title} className="border-none shadow-sm animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className={`text-xs flex items-center gap-1 mt-1 font-medium ${item.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {item.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Growth Projection</CardTitle>
            <CardDescription>Comparison of daily revenue and order volume targets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Market Segmentation</CardTitle>
            <CardDescription>Revenue distribution across core categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
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
            <div className="space-y-4 mt-6">
              {categoryData.map((cat, idx) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[idx]}} />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="text-muted-foreground">{((cat.value / 1200) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
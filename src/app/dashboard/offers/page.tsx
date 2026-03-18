"use client"

import { 
  PartyPopper, 
  Gift, 
  Calendar, 
  Sparkles, 
  Zap, 
  Clock,
  ArrowRight,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const activeOffers = [
  {
    id: "FEST-001",
    title: "Diwali Grand Feast",
    description: "Family platter with complimentary dessert and traditional sweets.",
    discount: "25% OFF",
    validUntil: "Nov 15, 2024",
    redemptions: 450,
    maxRedemptions: 1000,
    status: "Active",
    color: "bg-orange-500"
  },
  {
    id: "FEST-002",
    title: "Weekend Holi Blast",
    description: "Special Thandai and vibrant snack combo for groups of 4+.",
    discount: "BUY 1 GET 1",
    validUntil: "Mar 28, 2024",
    redemptions: 890,
    maxRedemptions: 900,
    status: "Expiring Soon",
    color: "bg-pink-500"
  },
  {
    id: "FEST-003",
    title: "Eid Mubarak Special",
    description: "Complimentary Sheer Khurma with every Biryani purchase.",
    discount: "FREE ITEM",
    validUntil: "Apr 20, 2024",
    redemptions: 120,
    maxRedemptions: 500,
    status: "Active",
    color: "bg-emerald-500"
  }
]

export default function FestiveOffersPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground/90 flex items-center gap-3">
            <PartyPopper className="h-8 w-8 text-primary" />
            Festive Season Hub
          </h1>
          <p className="text-muted-foreground">Manage limited-time holiday promotions and seasonal menu highlights.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg">
          <Plus className="h-4 w-4" />
          Create Festive Deal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeOffers.map((offer, idx) => (
          <Card key={offer.id} className="overflow-hidden border-none shadow-md animate-slide-up hover:shadow-xl transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className={`h-2 ${offer.color}`} />
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="font-code text-[10px] uppercase tracking-tighter">
                  {offer.id}
                </Badge>
                <Badge className={offer.status === "Expiring Soon" ? "bg-rose-500" : "bg-emerald-500"}>
                  {offer.status}
                </Badge>
              </div>
              <CardTitle className="text-xl font-black">{offer.title}</CardTitle>
              <CardDescription className="line-clamp-2">{offer.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-black text-2xl">
                  <Zap className="h-5 w-5 fill-current" />
                  {offer.discount}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Calendar className="h-3 w-3" />
                  Expires: {offer.validUntil}
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Redemption Progress</span>
                  <span>{Math.round((offer.redemptions / offer.maxRedemptions) * 100)}%</span>
                </div>
                <Progress value={(offer.redemptions / offer.maxRedemptions) * 100} className="h-2" />
                <p className="text-[10px] text-muted-foreground text-right">{offer.redemptions} / {offer.maxRedemptions} redeemed</p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4">
              <Button variant="ghost" className="w-full gap-2 group text-primary font-bold">
                Edit Offer Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-indigo-50/50 overflow-hidden relative">
          <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-indigo-500/10 rotate-12" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Gift className="h-5 w-5" />
              Festive Menu Builder
            </CardTitle>
            <CardDescription className="text-indigo-700/70">Create seasonal sub-menus that automatically activate during festivals.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Diwali Sweets Platter", items: 8, status: "Ready" },
                { name: "Ramadan Iftar Box", items: 12, status: "Draft" },
                { name: "Monsoon Chai Specials", items: 5, status: "Active" }
              ].map((menu) => (
                <div key={menu.name} className="flex items-center justify-between p-3 bg-white/80 rounded-lg shadow-sm">
                  <div>
                    <p className="font-bold text-indigo-900">{menu.name}</p>
                    <p className="text-xs text-indigo-700/60">{menu.items} Culinary Items</p>
                  </div>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    {menu.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100">Configure Seasonal Menus</Button>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-sm bg-orange-50/50 overflow-hidden relative">
          <Clock className="absolute -right-4 -top-4 h-24 w-24 text-orange-500/10 -rotate-12" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <PartyPopper className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription className="text-orange-700/70">Auto-schedule marketing and decor updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-orange-500 text-white h-12 w-12 rounded-xl flex flex-col items-center justify-center shadow-sm">
                  <span className="text-xs font-bold leading-none">NOV</span>
                  <span className="text-lg font-black leading-tight">12</span>
                </div>
                <div>
                  <p className="font-bold text-orange-900">Diwali Night Decoration</p>
                  <p className="text-xs text-orange-700/60">Automated ambient lighting change at 6:00 PM</p>
                </div>
              </div>
              <div className="flex gap-4 opacity-60">
                <div className="bg-slate-400 text-white h-12 w-12 rounded-xl flex flex-col items-center justify-center shadow-sm">
                  <span className="text-xs font-bold leading-none">DEC</span>
                  <span className="text-lg font-black leading-tight">25</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Christmas Brunch</p>
                  <p className="text-xs text-slate-700/60">Holiday carols & special breakfast menu</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-100">Open Event Calendar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

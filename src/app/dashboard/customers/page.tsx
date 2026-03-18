"use client"

import { Search, Mail, Phone, ArrowRight, Star, History, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

const guests = [
  { id: "GUEST-001", name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 890", visits: 12, spent: 2450.00, tier: "Gold", lastVisit: "2 days ago" },
  { id: "GUEST-002", name: "Bob Smith", email: "bob@example.com", phone: "+1 234 567 891", visits: 5, spent: 890.50, tier: "Silver", lastVisit: "1 week ago" },
  { id: "GUEST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+1 234 567 892", visits: 2, spent: 120.00, tier: "New", lastVisit: "3 weeks ago" },
  { id: "GUEST-004", name: "Diana Prince", email: "diana@example.com", phone: "+1 234 567 893", visits: 8, spent: 1560.75, tier: "Silver", lastVisit: "Yesterday" },
  { id: "GUEST-005", name: "Edward Norton", email: "edward@example.com", phone: "+1 234 567 894", visits: 15, spent: 3120.20, tier: "Gold", lastVisit: "Tonight" },
]

export default function GuestManagementPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Guest Directory & Loyalty</h1>
        <p className="text-muted-foreground">Monitor guest frequency, visit history, and reward eligibility.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <History className="h-4 w-4" /> Repeat Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">64%</div>
            <p className="text-xs text-muted-foreground mt-1">Customers with 3+ visits this month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-amber-700 uppercase tracking-widest flex items-center gap-2">
              <Star className="h-4 w-4" /> Top Tier Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-amber-900">12</div>
            <p className="text-xs text-muted-foreground mt-1">Gold tier members actively dining</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-indigo-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-2">
              <Gift className="h-4 w-4" /> Coupons Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-indigo-900">42</div>
            <p className="text-xs text-muted-foreground mt-1">Discounts applied in the last 24h</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search guests by name or phone..." className="pl-9 border-none bg-muted/50" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-primary text-primary">Export CSV</Button>
          <Button className="bg-primary hover:bg-primary/90">Add New Guest</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Guest Profile</TableHead>
              <TableHead>Loyalty Tier</TableHead>
              <TableHead>Total Visits</TableHead>
              <TableHead>Lifetime Spend</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id} className="hover:bg-muted/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border-2 border-primary/20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${guest.name}`} />
                      <AvatarFallback className="bg-primary/10 text-primary">{guest.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-base">{guest.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" /> {guest.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`gap-1 ${
                    guest.tier === 'Gold' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                    guest.tier === 'Silver' ? 'bg-slate-100 text-slate-700 hover:bg-slate-100' :
                    'bg-blue-100 text-blue-700 hover:bg-blue-100'
                  }`}>
                    <Star className="h-3 w-3 fill-current" />
                    {guest.tier}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-lg">{guest.visits}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Total Visits</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-primary">${guest.spent.toFixed(2)}</TableCell>
                <TableCell>
                  <span className="text-sm font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {guest.lastVisit}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      <Gift className="h-4 w-4 mr-1" /> Coupon
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 group">
                      Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
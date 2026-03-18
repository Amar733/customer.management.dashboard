"use client"

import { Search, Mail, Phone, Calendar, ArrowRight, Star } from "lucide-react"
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

const guests = [
  { id: "GUEST-001", name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 890", visits: 12, spent: 2450.00, tier: "Gold" },
  { id: "GUEST-002", name: "Bob Smith", email: "bob@example.com", phone: "+1 234 567 891", visits: 5, spent: 890.50, tier: "Silver" },
  { id: "GUEST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+1 234 567 892", visits: 2, spent: 120.00, tier: "New" },
  { id: "GUEST-004", name: "Diana Prince", email: "diana@example.com", phone: "+1 234 567 893", visits: 8, spent: 1560.75, tier: "Silver" },
  { id: "GUEST-005", name: "Edward Norton", email: "edward@example.com", phone: "+1 234 567 894", visits: 15, spent: 3120.20, tier: "Gold" },
]

export default function GuestManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Guest Directory</h1>
        <p className="text-muted-foreground">Manage reservations, preferences, and loyalty data.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search guests by name or phone..." className="pl-9 border-none bg-muted/50" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-primary text-primary">Preferences</Button>
          <Button className="bg-primary hover:bg-primary/90">New Reservation</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Guest Profile</TableHead>
              <TableHead>Loyalty Tier</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Total Visits</TableHead>
              <TableHead>Lifetime Spend</TableHead>
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
                      <div className="text-xs text-muted-foreground font-code">{guest.id}</div>
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
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3 text-primary" /> {guest.email}</div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3 text-primary" /> {guest.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-center">{guest.visits}</TableCell>
                <TableCell className="font-bold text-primary">${guest.spent.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary hover:text-white group">
                    Dining History
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
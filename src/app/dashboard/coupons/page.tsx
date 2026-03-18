"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  TicketPercent, 
  Calendar, 
  Copy, 
  MoreVertical,
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

const initialCoupons = [
  { id: "CPN-001", code: "WELCOME10", type: "Percentage", value: "10%", status: "Active", expiry: "2024-12-31", usage: 145 },
  { id: "CPN-002", code: "BIRYANI50", type: "Fixed", value: "$5.00", status: "Active", expiry: "2024-08-15", usage: 89 },
  { id: "CPN-003", code: "FREEDRINK", type: "Item", value: "Beverage", status: "Expired", expiry: "2024-05-01", usage: 230 },
  { id: "CPN-004", code: "LOYALTY20", type: "Percentage", value: "20%", status: "Active", expiry: "2025-01-01", usage: 42 },
]

export default function CouponsPage() {
  const [coupons] = useState(initialCoupons)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground/90">Discount Management</h1>
          <p className="text-muted-foreground">Create and monitor promotional codes for your guests.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Promotional Code</DialogTitle>
              <DialogDescription>
                Define a new discount rule for checkout.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="coupon-code">Coupon Code</Label>
                <Input id="coupon-code" placeholder="e.g. GUSTO25" className="uppercase font-bold tracking-widest bg-muted/30 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger className="bg-muted/30 border-none">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      <SelectItem value="item">Free Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount-value">Value</Label>
                  <Input id="discount-value" placeholder="10 or 5.00" className="bg-muted/30 border-none" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" className="bg-muted/30 border-none" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary">Activate Coupon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Total Redemptions", value: "506", change: "+12%", trend: "up" },
          { title: "Active Campaigns", value: "3", change: "2 expiring soon", trend: "neutral" },
          { title: "Revenue Savings", value: "$1,240", change: "+$240 this month", trend: "up" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-card p-6 rounded-xl border shadow-sm animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
            <p className="text-3xl font-black mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search codes..." className="pl-10 bg-muted/50 border-none h-10" />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Coupon Details</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usage Count</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TicketPercent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold font-code tracking-wider">{coupon.code}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{coupon.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{coupon.value}</span>
                    <span className="text-xs text-muted-foreground">{coupon.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`gap-1 ${
                    coupon.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                  }`}>
                    {coupon.status === 'Active' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{coupon.usage} Redemptions</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {coupon.expiry}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Coupon Options</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" /> Copy Code</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
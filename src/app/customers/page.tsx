
"use client"

import { Search, Mail, Phone, Calendar, ArrowRight } from "lucide-react"
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

const customers = [
  { id: "CUST-001", name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 890", joinDate: "2023-01-15", orders: 12, spent: 2450.00 },
  { id: "CUST-002", name: "Bob Smith", email: "bob@example.com", phone: "+1 234 567 891", joinDate: "2023-02-20", orders: 5, spent: 890.50 },
  { id: "CUST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+1 234 567 892", joinDate: "2023-03-05", orders: 2, spent: 120.00 },
  { id: "CUST-004", name: "Diana Prince", email: "diana@example.com", phone: "+1 234 567 893", joinDate: "2023-04-12", orders: 8, spent: 1560.75 },
  { id: "CUST-005", name: "Edward Norton", email: "edward@example.com", phone: "+1 234 567 894", joinDate: "2023-05-30", orders: 15, spent: 3120.20 },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">Manage your customer relationships and view their history.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline">Filter</Button>
          <Button>Add Customer</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground font-code">{customer.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {customer.email}</div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3" /> {customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {customer.joinDate}
                  </div>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell className="font-medium">${customer.spent.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Profile
                    <ArrowRight className="h-4 w-4" />
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

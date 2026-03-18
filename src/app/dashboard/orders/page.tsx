"use client"

import { 
  Search, 
  Eye, 
  ChefHat, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Flame
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const orders = [
  { id: "TKT-401", table: "Table 4", time: "12:30 PM", total: 85.00, status: "Serving", waiter: "Marco" },
  { id: "TKT-402", table: "Table 12", time: "12:45 PM", total: 42.50, status: "In Kitchen", waiter: "Sofia" },
  { id: "TKT-403", table: "Table 7", time: "01:05 PM", total: 112.00, status: "Pending", waiter: "Luca" },
  { id: "TKT-404", table: "Bar 2", time: "01:10 PM", total: 24.00, status: "Ready", waiter: "Elena" },
  { id: "TKT-405", table: "Table 9", time: "01:15 PM", total: 55.20, status: "Voided", waiter: "Marco" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management</h1>
          <p className="text-muted-foreground">Monitor service flow and table status.</p>
        </div>
        <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/5">
          <Download className="h-4 w-4" />
          Export Service Log
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="bg-card shadow-sm">
            <TabsTrigger value="all">All Tables</TabsTrigger>
            <TabsTrigger value="pending">Waitlist</TabsTrigger>
            <TabsTrigger value="kitchen">In Kitchen</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search table or ticket..." className="pl-9 bg-card" />
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Table / Guest</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Total Bill</TableHead>
                <TableHead>Service Status</TableHead>
                <TableHead>Server</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-code font-medium">{order.id}</TableCell>
                  <TableCell className="font-semibold">{order.table}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`gap-1 flex w-fit items-center px-3 py-1 ${
                        order.status === "Serving" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        order.status === "In Kitchen" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        order.status === "Pending" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        order.status === "Ready" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {order.status === "Serving" && <CheckCircle className="h-3 w-3" />}
                      {order.status === "In Kitchen" && <Flame className="h-3 w-3" />}
                      {order.status === "Pending" && <Clock className="h-3 w-3" />}
                      {order.status === "Voided" && <AlertCircle className="h-3 w-3" />}
                      {order.status === "Ready" && <ChefHat className="h-3 w-3" />}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-muted-foreground">{order.waiter}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-2 text-primary">
                      <Eye className="h-4 w-4" />
                      View Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  )
}
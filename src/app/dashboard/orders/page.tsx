
"use client"

import { 
  Search, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download
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
  { id: "ORD-9281", customer: "Alice Johnson", date: "2023-11-20", total: 450.00, status: "Delivered", payment: "Paid" },
  { id: "ORD-9282", customer: "Bob Smith", date: "2023-11-21", total: 120.50, status: "Shipped", payment: "Paid" },
  { id: "ORD-9283", customer: "Charlie Davis", date: "2023-11-21", total: 890.00, status: "Pending", payment: "Unpaid" },
  { id: "ORD-9284", customer: "Diana Prince", date: "2023-11-22", total: 299.99, status: "Processing", payment: "Paid" },
  { id: "ORD-9285", customer: "Edward Norton", date: "2023-11-22", total: 55.20, status: "Cancelled", payment: "Refunded" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and fulfill your customer orders.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-code font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`gap-1 flex w-fit items-center ${
                        order.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" :
                        order.status === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        order.status === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {order.status === "Delivered" && <CheckCircle className="h-3 w-3" />}
                      {order.status === "Shipped" && <Truck className="h-3 w-3" />}
                      {order.status === "Pending" && <Clock className="h-3 w-3" />}
                      {order.status === "Cancelled" && <AlertCircle className="h-3 w-3" />}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={order.payment === "Paid" ? "text-green-600" : "text-amber-600"}>
                      {order.payment}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
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

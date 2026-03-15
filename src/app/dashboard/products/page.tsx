"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  Image as ImageIcon,
  ArrowUpDown
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

const initialProducts = [
  { id: "PROD-001", name: "Premium Wireless Headphones", category: "Electronics", price: 299.00, stock: 45, status: "Active" },
  { id: "PROD-002", name: "Leather Smart Watch", category: "Wearables", price: 199.00, stock: 12, status: "Low Stock" },
  { id: "PROD-003", name: "Ergonomic Desk Chair", category: "Furniture", price: 349.00, stock: 0, status: "Out of Stock" },
  { id: "PROD-004", name: "Mechanical Keyboard", category: "Accessories", price: 129.00, stock: 89, status: "Active" },
  { id: "PROD-005", name: "4K Monitor 27\"", category: "Electronics", price: 449.00, stock: 23, status: "Active" },
]

export default function ProductsPage() {
  const [products] = useState(initialProducts)
  const productImages = PlaceHolderImages.filter(img => img.id.startsWith("product"))

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Catalog Management</h1>
          <p className="text-muted-foreground">Monitor inventory levels and manage product listings.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the core details for your new catalog item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g. Ultra HD Monitor" className="bg-muted/30 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Electronics" className="bg-muted/30 border-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" className="bg-muted/30 border-none" />
                </div>
              </div>
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 transition-all">
                <div className="p-3 bg-primary/5 rounded-full">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Click to upload assets</span>
                <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">Create Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search catalog..." className="pl-10 bg-muted/50 border-none h-10" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-transparent border-input"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button variant="outline" className="bg-transparent border-input">Export Data</Button>
        </div>
      </div>

      <div className="rounded-xl border-none shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[80px]">Preview</TableHead>
              <TableHead className="cursor-pointer hover:text-foreground">
                <div className="flex items-center gap-2">Product Name <ArrowUpDown className="h-3 w-3" /></div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => (
              <TableRow key={product.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="relative h-12 w-12 rounded-lg border overflow-hidden shadow-sm">
                    <Image 
                      src={productImages[idx % productImages.length]?.imageUrl || "https://picsum.photos/seed/product/100/100"} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-[10px] text-muted-foreground font-code mt-0.5">{product.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium bg-muted/30">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${product.stock > 20 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                    <span>{product.stock} units</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      product.status === "Active" ? "default" : 
                      product.status === "Low Stock" ? "secondary" : "destructive"
                    }
                    className="shadow-sm"
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Product Options</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Modify Details</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Plus className="h-4 w-4" /> Restock Item</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600"><Trash2 className="h-4 w-4" /> Remove from Catalog</DropdownMenuItem>
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
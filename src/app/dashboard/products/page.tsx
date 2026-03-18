"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  Utensils,
  ArrowUpDown,
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

const initialMenu = [
  { id: "MENU-001", name: "Gourmet Pasta Carbonara", category: "Mains", price: 18.50, prepTime: "15m", status: "Available" },
  { id: "MENU-002", name: "Wood-fired Margherita", category: "Pizza", price: 14.00, prepTime: "10m", status: "Popular" },
  { id: "MENU-003", name: "Fresh Garden Salad", category: "Starters", price: 9.50, prepTime: "5m", status: "Available" },
  { id: "MENU-004", name: "Grilled Ribeye Steak", category: "Mains", price: 32.00, prepTime: "25m", status: "Chef Pick" },
  { id: "MENU-005", name: "Classic Tiramisu", category: "Desserts", price: 8.00, prepTime: "3m", status: "Low Stock" },
]

export default function MenuManagementPage() {
  const [menuItems] = useState(initialMenu)
  const dishImages = PlaceHolderImages.filter(img => img.id.startsWith("dish"))

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground/90">Menu Engineering</h1>
          <p className="text-muted-foreground">Curate your dishes and monitor item performance.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Dish
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Details for the new culinary addition.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="dish-name">Dish Name</Label>
                <Input id="dish-name" placeholder="e.g. Lobster Risotto" className="bg-muted/30 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dish-category">Category</Label>
                  <Input id="dish-category" placeholder="Appetizers" className="bg-muted/30 border-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dish-price">Price ($)</Label>
                  <Input id="dish-price" type="number" placeholder="0.00" className="bg-muted/30 border-none" />
                </div>
              </div>
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Upload Food Photography</span>
                <span className="text-xs text-muted-foreground">High-res JPG/PNG</span>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary">Save to Menu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search dishes..." className="pl-10 bg-muted/50 border-none h-10" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-transparent border-input"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button variant="outline" className="bg-transparent border-input">Export Menu</Button>
        </div>
      </div>

      <div className="rounded-xl border-none shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[80px]">Preview</TableHead>
              <TableHead className="cursor-pointer hover:text-foreground">
                <div className="flex items-center gap-2">Dish Name <ArrowUpDown className="h-3 w-3" /></div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Avg Prep</TableHead>
              <TableHead>Kitchen Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item, idx) => (
              <TableRow key={item.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="relative h-12 w-12 rounded-lg border overflow-hidden shadow-sm">
                    <Image 
                      src={dishImages[idx % dishImages.length]?.imageUrl || "https://picsum.photos/seed/food/100/100"} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-[10px] text-muted-foreground font-code mt-0.5">{item.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium bg-muted/30">{item.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.prepTime}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      item.status === "Popular" ? "default" : 
                      item.status === "Available" ? "secondary" : "destructive"
                    }
                    className={`shadow-sm ${item.status === 'Popular' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                  >
                    {item.status}
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
                      <DropdownMenuLabel>Menu Options</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Recipe</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Utensils className="h-4 w-4" /> Stock Check</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600"><Trash2 className="h-4 w-4" /> Remove from Menu</DropdownMenuItem>
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
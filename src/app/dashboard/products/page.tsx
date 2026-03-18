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
  Flame,
  Coffee,
  ChefHat,
  Leaf,
  Beef,
  Clock,
  Sun,
  Moon,
  Zap
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const initialMenu = [
  // Chappatis & Breads
  { id: "CHAP-001", name: "Butter Naan", category: "Chappatis", type: "Veg", price: 2.50, prepTime: "5m", status: "Popular" },
  { id: "CHAP-002", name: "Garlic Naan", category: "Chappatis", type: "Veg", price: 3.00, prepTime: "5m", status: "Available" },
  { id: "CHAP-008", name: "Keema Naan", category: "Chappatis", type: "Non-Veg", price: 7.50, prepTime: "15m", status: "Popular" },
  
  // Biryani & Rice
  { id: "BIRY-001", name: "Hyderabadi Chicken Biryani", category: "Biryani", type: "Non-Veg", price: 14.99, prepTime: "20m", status: "Popular" },
  { id: "BIRY-002", name: "Mutton Dum Biryani", category: "Biryani", type: "Non-Veg", price: 17.50, prepTime: "25m", status: "Chef Pick" },
  
  // Curries
  { id: "CURY-001", name: "Paneer Butter Masala", category: "Curry", type: "Veg", price: 13.99, prepTime: "15m", status: "Popular" },
  { id: "CURY-002", name: "Butter Chicken", category: "Curry", type: "Non-Veg", price: 15.50, prepTime: "18m", status: "Best Seller" },

  // Breakfast (New)
  { id: "BRKF-001", name: "Indori Poha", category: "Breakfast", type: "Veg", price: 6.50, prepTime: "10m", status: "Light" },
  { id: "BRKF-002", name: "Masala Dosa with Sambhar", category: "Breakfast", type: "Veg", price: 9.99, prepTime: "12m", status: "Best Seller" },
  { id: "BRKF-003", name: "Aloo Paratha with Curd", category: "Breakfast", type: "Veg", price: 8.50, prepTime: "15m", status: "Popular" },
  { id: "BRKF-004", name: "Vada Pav (2pcs)", category: "Breakfast", type: "Veg", price: 5.50, prepTime: "8m", status: "Quick" },
  { id: "BRKF-005", name: "Egg Bhurji Pav", category: "Breakfast", type: "Non-Veg", price: 8.00, prepTime: "12m", status: "Available" },

  // Lunch (New)
  { id: "LNCH-001", name: "Executive Veg Thali", category: "Lunch", type: "Veg", price: 15.00, prepTime: "15m", status: "Complete Meal" },
  { id: "LNCH-002", name: "Non-Veg Special Thali", category: "Lunch", type: "Non-Veg", price: 18.50, prepTime: "18m", status: "Chef Pick" },
  { id: "LNCH-003", name: "Dal Khichdi & Curd", category: "Lunch", type: "Veg", price: 10.50, prepTime: "12m", status: "Healthy" },
  { id: "LNCH-004", name: "Rajma Chawal Platter", category: "Lunch", type: "Veg", price: 12.00, prepTime: "10m", status: "Popular" },

  // Dinner (New)
  { id: "DINN-001", name: "Tandoori Platter (Mixed)", category: "Dinner", type: "Non-Veg", price: 24.99, prepTime: "25m", status: "Shared" },
  { id: "DINN-002", name: "Mutton Rogan Josh Special", category: "Dinner", type: "Non-Veg", price: 19.50, prepTime: "22m", status: "Signature" },
  { id: "DINN-003", name: "Baingan Bharta (Roasted)", category: "Dinner", type: "Veg", price: 13.00, prepTime: "18m", status: "Available" },
  { id: "DINN-004", name: "Slow Cooked Dal Makhani", category: "Dinner", type: "Veg", price: 12.50, prepTime: "20m", status: "Popular" },

  // Combos (New)
  { id: "CMBO-001", name: "Biryani & Lassi Combo", category: "Combos", type: "Non-Veg", price: 17.99, prepTime: "18m", status: "Value Pack" },
  { id: "CMBO-002", name: "Naan, Curry & Drink", category: "Combos", type: "Veg", price: 15.99, prepTime: "15m", status: "Saver" },
  { id: "CMBO-003", name: "Samosa & Masala Chai Combo", category: "Combos", type: "Veg", price: 7.50, prepTime: "8m", status: "Tea Time" },
  { id: "CMBO-004", name: "Family Pack (Serves 4)", category: "Combos", type: "Non-Veg", price: 55.00, prepTime: "35m", status: "Bulk" },

  // Snacks & Appetizers
  { id: "SNACK-001", name: "Vegetable Samosa (2pcs)", category: "Snacks", type: "Veg", price: 5.50, prepTime: "8m", status: "Available" },
  { id: "SNACK-005", name: "Pani Puri (6pcs)", category: "Snacks", type: "Veg", price: 7.00, prepTime: "5m", status: "Street Favorite" },

  // Drinks & Beverages
  { id: "DRINK-001", name: "Mango Lassi", category: "Drinks", type: "Veg", price: 4.50, prepTime: "3m", status: "Popular" },
  { id: "DRINK-002", name: "Masala Chai", category: "Drinks", type: "Veg", price: 2.50, prepTime: "4m", status: "Available" },
]

export default function MenuManagementPage() {
  const [menuItems] = useState(initialMenu)
  const categories = [
    { id: "Breakfast", label: "Light Breakfast", icon: Coffee },
    { id: "Lunch", label: "Lunch", icon: Sun },
    { id: "Dinner", label: "Dinner", icon: Moon },
    { id: "Combos", label: "Combo Food", icon: Zap },
    { id: "Curry", label: "Curry", icon: Flame },
    { id: "Biryani", label: "Biryani", icon: ChefHat },
    { id: "Chappatis", label: "Chappatis", icon: Utensils },
    { id: "Snacks", label: "Snacks", icon: Utensils },
    { id: "Drinks", label: "Drinks", icon: Coffee },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground/90">Culinary Catalog</h1>
          <p className="text-muted-foreground">Manage your restaurant sections, specialized meals, and dish availability.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Menu Entry</DialogTitle>
              <DialogDescription>
                Add a new dish to your restaurant selection.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="dish-name">Item Name</Label>
                <Input id="dish-name" placeholder="e.g. Garlic Naan" className="bg-muted/30 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dish-category">Section</Label>
                  <Input id="dish-category" placeholder="e.g. Lunch" className="bg-muted/30 border-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dish-type">Dietary Type</Label>
                  <Input id="dish-type" placeholder="Veg or Non-Veg" className="bg-muted/30 border-none" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dish-price">Price ($)</Label>
                <Input id="dish-price" type="number" placeholder="0.00" className="bg-muted/30 border-none" />
              </div>
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Upload Presentation Photo</span>
                <span className="text-xs text-muted-foreground">High-res JPG/PNG</span>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary">Save to Kitchen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search culinary items..." className="pl-10 bg-muted/50 border-none h-10" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-transparent border-input"><Filter className="h-4 w-4 mr-2" /> Sort By</Button>
          <Button variant="outline" className="bg-transparent border-input">Print Menu</Button>
        </div>
      </div>

      <Tabs defaultValue="Breakfast" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6 flex-wrap h-auto">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id} className="px-6 py-2 gap-2">
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-4">
            <div className="rounded-xl border shadow-sm bg-card overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[80px]">Preview</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground">
                      <div className="flex items-center gap-2">Dish Name <ArrowUpDown className="h-3 w-3" /></div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Avg Prep</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.filter(item => item.category === cat.id).map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-lg border overflow-hidden shadow-sm bg-muted/20 flex items-center justify-center">
                          {cat.id === "Drinks" ? <Coffee className="h-6 w-6 text-muted-foreground/50" /> : 
                           cat.id === "Biryani" ? <ChefHat className="h-6 w-6 text-muted-foreground/50" /> :
                           cat.id === "Curry" ? <Flame className="h-6 w-6 text-muted-foreground/50" /> :
                           cat.id === "Breakfast" ? <Clock className="h-6 w-6 text-muted-foreground/50" /> :
                           cat.id === "Combos" ? <Zap className="h-6 w-6 text-muted-foreground/50" /> :
                           <Utensils className="h-6 w-6 text-muted-foreground/50" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[10px] text-muted-foreground font-code mt-0.5">{item.id}</div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`gap-1.5 ${
                            item.type === 'Veg' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'
                          }`}
                        >
                          {item.type === 'Veg' ? <Leaf className="h-3 w-3" /> : <Beef className="h-3 w-3" />}
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-primary">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground">{item.prepTime}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            item.status === "Popular" || item.status === "Chef Pick" || item.status === "Hot" || item.status === "Best Seller" || item.status === "Value Pack" ? "default" : "secondary"
                          }
                          className={`shadow-sm ${
                            item.status === 'Popular' || item.status === 'Hot' || item.status === 'Best Seller' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 
                            item.status === 'Chef Pick' || item.status === 'Value Pack' ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 
                            item.status === 'Street Favorite' || item.status === 'Signature' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : ''
                          }`}
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
                            <DropdownMenuLabel>Item Options</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Dish</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Flame className="h-4 w-4" /> Prep Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600"><Trash2 className="h-4 w-4" /> Out of Stock</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {menuItems.filter(item => item.category === cat.id).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                        No items found in the {cat.label} section.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

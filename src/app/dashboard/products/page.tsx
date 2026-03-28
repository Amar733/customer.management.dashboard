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
  Flame,
  Coffee,
  ChefHat,
  Leaf,
  Beef,
  Clock,
  Sun,
  Moon,
  Zap,
  Star,
  Sparkles,
  Loader2
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
import { Textarea } from "@/components/ui/textarea"
import { generateMenuDescription } from "@/ai/flows/menu-description-flow"
import { useToast } from "@/hooks/use-toast"

const initialMenu = [
  { id: "CHAP-001", name: "Butter Naan", category: "Chappatis", type: "Veg", price: 2.50, prepTime: "5m", status: "Best Seller" },
  { id: "CHAP-002", name: "Garlic Naan", category: "Chappatis", type: "Veg", price: 3.00, prepTime: "5m", status: "Available" },
  { id: "CHAP-008", name: "Keema Naan", category: "Chappatis", type: "Non-Veg", price: 7.50, prepTime: "15m", status: "Signature" },
  { id: "BIRY-001", name: "Chicken Biryani", category: "Biryani", type: "Non-Veg", price: 14.99, prepTime: "20m", status: "Hot" },
  { id: "BIRY-002", name: "Mutton Dum Biryani", category: "Biryani", type: "Non-Veg", price: 17.50, prepTime: "25m", status: "Chef Pick" },
  { id: "CURY-001", name: "Paneer Butter Masala", category: "Curry", type: "Veg", price: 13.99, prepTime: "15m", status: "Classic" },
  { id: "CURY-002", name: "Butter Chicken", category: "Curry", type: "Non-Veg", price: 15.50, prepTime: "18m", status: "Best Seller" },
  { id: "BRKF-001", name: "Indori Poha", category: "Breakfast", type: "Veg", price: 6.50, prepTime: "10m", status: "Morning Fav" },
  { id: "CMBO-001", name: "Biryani & Lassi Combo", category: "Combos", type: "Non-Veg", price: 17.99, prepTime: "18m", status: "Value Pack" },
]

export default function MenuManagementPage() {
  const [menuItems] = useState(initialMenu)
  const [isGenerating, setIsGenerating] = useState(false)
  const [dishName, setDishName] = useState("")
  const [category, setCategory] = useState("Curry")
  const [isVeg, setIsVeg] = useState(true)
  const [aiDescription, setAiDescription] = useState("")
  const { toast } = useToast()

  const categories = [
    { id: "Curry", label: "Curry", icon: Flame },
    { id: "Biryani", label: "Biryani", icon: ChefHat },
    { id: "Breakfast", label: "Breakfast", icon: Coffee },
    { id: "Lunch", label: "Lunch", icon: Sun },
    { id: "Dinner", label: "Dinner", icon: Moon },
    { id: "Combos", label: "Combos", icon: Zap },
    { id: "Chappatis", label: "Breads", icon: Utensils },
    { id: "Drinks", label: "Drinks", icon: Coffee },
  ]

  const handleAiSuggest = async () => {
    if (!dishName) {
      toast({
        variant: "destructive",
        title: "Missing Name",
        description: "Please enter a dish name first.",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateMenuDescription({ dishName, category, isVeg })
      setAiDescription(result.description)
    } catch (e) {
      console.error(e)
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate description.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground/90 tracking-tight">Culinary Catalog</h1>
          <p className="text-muted-foreground text-lg">Engineering the finest Indian dining experience.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-12 px-6 gap-2 shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">New Culinary Entry</DialogTitle>
              <DialogDescription>
                Define the characteristics of your latest dish.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dish Name</Label>
                <Input 
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g. Royal Shahi Paneer" 
                  className="bg-muted/50 border-none h-12 rounded-xl" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Section</Label>
                  <Input 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Curry" 
                    className="bg-muted/50 border-none h-12 rounded-xl" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Type</Label>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsVeg(!isVeg)}
                    className={`h-12 rounded-xl border-none ${isVeg ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                  >
                    {isVeg ? <Leaf className="h-4 w-4 mr-2" /> : <Beef className="h-4 w-4 mr-2" />}
                    {isVeg ? "Veg" : "Non-Veg"}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAiSuggest}
                    disabled={isGenerating}
                    className="text-primary hover:bg-primary/10 h-8 gap-2"
                  >
                    {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    AI Suggest
                  </Button>
                </div>
                <Textarea 
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="Describe your dish..." 
                  className="bg-muted/50 border-none min-h-[100px] rounded-xl" 
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Price ($)</Label>
                <Input type="number" placeholder="14.99" className="bg-muted/50 border-none h-12 rounded-xl" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full h-12 bg-primary font-bold text-lg rounded-xl">Commit to Kitchen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass-card p-5 rounded-3xl shadow-sm">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search dishes, ingredients..." className="pl-12 bg-muted/40 border-none h-11 rounded-2xl" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-11 px-4 rounded-2xl border-primary/10 hover:bg-primary/5"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button variant="outline" className="h-11 px-4 rounded-2xl border-primary/10 hover:bg-primary/5">P&L Export</Button>
        </div>
      </div>

      <Tabs defaultValue="Curry" className="w-full">
        <TabsList className="bg-muted/30 p-1.5 mb-8 flex-wrap h-auto gap-1 rounded-2xl overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id} className="px-6 py-2.5 gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary transition-all">
              <cat.icon className="h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-wider">{cat.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="animate-in fade-in-50 duration-500">
            <div className="rounded-3xl border shadow-sm bg-card overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40 h-14">
                  <TableRow>
                    <TableHead className="w-[80px] px-6">ID</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Dish Details</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Classification</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Unit Price</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Prep Efficiency</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Kitchen Status</TableHead>
                    <TableHead className="text-right px-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.filter(item => item.category === cat.id).map((item) => (
                    <TableRow key={item.id} className="h-20 hover:bg-primary/[0.02] transition-colors border-b-border/40">
                      <TableCell className="px-6">
                        <span className="text-[10px] font-black font-code text-primary bg-primary/10 px-2 py-1 rounded-md">{item.id.split('-')[1]}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-base text-foreground/80">{item.name}</span>
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{item.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`gap-1.5 border-none shadow-sm px-3 py-1 text-[10px] font-black uppercase ${
                            item.type === 'Veg' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {item.type === 'Veg' ? <Leaf className="h-3 w-3" /> : <Beef className="h-3 w-3" />}
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-black text-lg text-primary">${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-bold text-muted-foreground">{item.prepTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`shadow-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
                            item.status === 'Best Seller' || item.status === 'Hot' ? 'bg-primary text-white' : 
                            item.status === 'Signature' || item.status === 'Chef Pick' ? 'bg-indigo-600 text-white' : 
                            'bg-muted text-muted-foreground'
                          }`}
                        >
                          {item.status === 'Best Seller' && <Star className="h-2.5 w-2.5 fill-current mr-1" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-none shadow-2xl">
                            <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest opacity-50">Operational Controls</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer"><Edit className="h-4 w-4" /> Modify Recipe</DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer"><Flame className="h-4 w-4" /> Station Config</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border/50" />
                            <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"><Trash2 className="h-4 w-4" /> Mark Out-of-Stock</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {menuItems.filter(item => item.category === cat.id).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center opacity-30 grayscale">
                          <ChefHat className="h-16 w-16 mb-4" />
                          <p className="text-sm font-black uppercase tracking-widest">No culinary data in {cat.label}</p>
                        </div>
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
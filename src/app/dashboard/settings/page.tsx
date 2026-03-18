"use client"

import { 
  CreditCard, 
  Shield, 
  Store, 
  ChefHat, 
  Bell, 
  UtensilsCrossed,
  Save,
  Clock,
  Lock,
  Pizza
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground/90">Venue Configuration</h1>
        <p className="text-muted-foreground">Adjust restaurant hours, service zones, and security.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-card shadow-sm rounded-xl mb-6">
          <TabsTrigger value="general" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><Store className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="service" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><UtensilsCrossed className="h-4 w-4" /> Service</TabsTrigger>
          <TabsTrigger value="payment" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><CreditCard className="h-4 w-4" /> POS Integration</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><Shield className="h-4 w-4" /> Privacy</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><Bell className="h-4 w-4" /> Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Configure your restaurant's profile for guest-facing apps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="venue-name">Restaurant Name</Label>
                  <Input id="venue-name" defaultValue="Gusto Italian Bistro" className="bg-muted/30 border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Management Contact</Label>
                  <Input id="support-email" type="email" defaultValue="manager@gusto.com" className="bg-muted/30 border-none" />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Main Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency" className="bg-muted/30 border-none">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-charge">Default Service Charge (%)</Label>
                  <Input id="service-charge" type="number" defaultValue="15" className="bg-muted/30 border-none" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 px-6 py-4 flex justify-end">
              <Button className="gap-2 shadow-sm bg-primary hover:bg-primary/90"><Save className="h-4 w-4" /> Save Venue Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Kitchen & Floor Management</CardTitle>
              <CardDescription>Operational settings for your back and front of house.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Kitchen Display System (KDS)</Label>
                  <p className="text-sm text-muted-foreground">Automatically route orders to prep stations.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">QR Table Ordering</Label>
                  <p className="text-sm text-muted-foreground">Allow guests to order from their smartphones.</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Automatic Table Assignment</Label>
                  <p className="text-sm text-muted-foreground">AI-driven table rotation to maximize covers.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>POS & Terminal Links</CardTitle>
              <CardDescription>Securely connect your payment processing hardware.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-6 border rounded-xl hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl">T</div>
                  <div>
                    <p className="font-semibold text-lg">Toast Integration</p>
                    <p className="text-sm text-muted-foreground">Standard POS and kitchen hardware link.</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-lg border-primary text-primary">Connect</Button>
              </div>
              <div className="flex items-center justify-between p-6 border rounded-xl bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-600/10 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl">S</div>
                  <div>
                    <p className="font-semibold text-lg">Square for Restaurants</p>
                    <p className="text-sm text-muted-foreground">Primary payment gateway connected.</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-3 py-1">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
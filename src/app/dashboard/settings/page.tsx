"use client"

import { 
  CreditCard, 
  Shield, 
  Store, 
  Truck, 
  Bell, 
  Globe,
  Save,
  User,
  Mail,
  Lock
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
        <h1 className="text-3xl font-bold">Preferences & Configuration</h1>
        <p className="text-muted-foreground">Customize your shop's behavior and your account settings.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-card shadow-sm rounded-xl mb-6">
          <TabsTrigger value="general" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Store className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="payment" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><CreditCard className="h-4 w-4" /> Payments</TabsTrigger>
          <TabsTrigger value="shipping" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Truck className="h-4 w-4" /> Logistics</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Shield className="h-4 w-4" /> Privacy</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Shop Identity</CardTitle>
              <CardDescription>Configure how your brand appears to customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Store Display Name</Label>
                  <Input id="shop-name" defaultValue="Lumina Premium Gear" className="bg-muted/30 border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-email">Customer Support Email</Label>
                  <Input id="shop-email" type="email" defaultValue="hello@lumina.com" className="bg-muted/30 border-none" />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Transactional Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency" className="bg-muted/30 border-none">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                      <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Shop Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone" className="bg-muted/30 border-none">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 px-6 py-4 flex justify-end">
              <Button className="gap-2 shadow-sm"><Save className="h-4 w-4" /> Update Settings</Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Advanced Locality</CardTitle>
              <CardDescription>Fine-tune regional settings for international customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Geographic Optimization</Label>
                  <p className="text-sm text-muted-foreground">Adjust tax and shipping rates based on customer IP address.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Localization Engine</Label>
                  <p className="text-sm text-muted-foreground">Allow automatic translation for store interface.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Processing Channels</CardTitle>
              <CardDescription>Manage your financial connections and transaction flow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-6 border rounded-xl hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl">S</div>
                  <div>
                    <p className="font-semibold text-lg">Stripe Infrastructure</p>
                    <p className="text-sm text-muted-foreground">Standard credit card and Apple Pay processing.</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-lg">Connect</Button>
              </div>
              <div className="flex items-center justify-between p-6 border rounded-xl bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-600/10 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl">P</div>
                  <div>
                    <p className="font-semibold text-lg">PayPal Merchant</p>
                    <p className="text-sm text-muted-foreground">Connected to primary business account.</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-3 py-1">Active Connection</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Account Authentication</CardTitle>
              <CardDescription>Manage your login credentials and security layers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Lock className="h-4 w-4" /> Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Min. 8 chars" className="bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Match new password" className="bg-muted/30 border-none" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require mobile verification for sensitive operations.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 px-6 py-4 flex justify-end">
              <Button variant="outline" className="mr-2">Reset to Defaults</Button>
              <Button className="shadow-sm">Update Security</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
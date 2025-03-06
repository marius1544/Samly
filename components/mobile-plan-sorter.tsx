"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Wifi, Phone, MessageSquare, Clock, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample mobile plan data
const mobilePlans = [
  {
    id: 1,
    provider: "Telenor",
    name: "Frihet S",
    price: 329,
    data: 15,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS Roaming"],
    color: "#00857C",
  },
  {
    id: 2,
    provider: "Telia",
    name: "Ubegrenset M",
    price: 399,
    data: 100,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS Roaming", "Datarulling"],
    color: "#990AE3",
  },
  {
    id: 3,
    provider: "ice",
    name: "Fri Data 10GB",
    price: 279,
    data: 10,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["4G+", "EU/EØS 10GB"],
    color: "#0099FF",
  },
  {
    id: 4,
    provider: "OneCall",
    name: "Stor+",
    price: 349,
    data: 30,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS 15GB"],
    color: "#FF5C39",
  },
  {
    id: 5,
    provider: "Chilimobil",
    name: "Fri+",
    price: 299,
    data: 20,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS 10GB", "Datarulling"],
    color: "#E30613",
  },
  {
    id: 6,
    provider: "Telenor",
    name: "Frihet M",
    price: 429,
    data: 50,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS Roaming", "Datarulling"],
    color: "#00857C",
  },
  {
    id: 7,
    provider: "Telia",
    name: "Ubegrenset S",
    price: 329,
    data: 15,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["5G", "EU/EØS Roaming"],
    color: "#990AE3",
  },
  {
    id: 8,
    provider: "ice",
    name: "Fri Data 15GB",
    price: 329,
    data: 15,
    callMinutes: "Ubegrenset",
    sms: "Ubegrenset",
    bindingPeriod: 0,
    features: ["4G+", "EU/EØS 15GB"],
    color: "#0099FF",
  },
]

export default function MobilePlanSorter() {
  const [sortBy, setSortBy] = useState("price-asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPlans, setFilteredPlans] = useState(mobilePlans)
  const [activeTab, setActiveTab] = useState("all")

  // Sort and filter plans when sort criteria or search term changes
  useEffect(() => {
    let result = [...mobilePlans]

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (plan) =>
          plan.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by provider tab
    if (activeTab !== "all") {
      result = result.filter((plan) => plan.provider.toLowerCase() === activeTab.toLowerCase())
    }

    // Sort the plans
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "data-asc":
          return a.data - b.data
        case "data-desc":
          return b.data - a.data
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    setFilteredPlans(result)
  }, [sortBy, searchTerm, activeTab])

  // Get unique providers for tabs
  const providers = ["all", ...new Set(mobilePlans.map((plan) => plan.provider.toLowerCase()))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søk etter abonnement..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sorter etter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="price-asc">Pris: Lav til høy</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-desc">Pris: Høy til lav</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="data-asc">Data: Lav til høy</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="data-desc">Data: Høy til lav</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-asc">Navn: A til Å</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-desc">Navn: Å til A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          {providers.map((provider) => (
            <TabsTrigger key={provider} value={provider} className="capitalize">
              {provider === "all" ? "Alle" : provider}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <div className="h-2" style={{ backgroundColor: plan.color }}></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{plan.provider}</h3>
                      <p className="text-muted-foreground">{plan.name}</p>
                    </div>
                    <p className="text-2xl font-bold">{plan.price} kr</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">{plan.data} GB</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{plan.callMinutes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{plan.sms}</span>
                    </div>
                    {plan.bindingPeriod > 0 && (
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{plan.bindingPeriod} mnd. binding</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-4" style={{ backgroundColor: plan.color }}>
                    Velg abonnement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredPlans.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Ingen abonnementer funnet. Prøv å endre søket ditt.</p>
        </div>
      )}
    </div>
  )
}


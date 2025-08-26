"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MusicStreamingCard, { type MusicStreamingService } from "./music-streaming-card"

// Sample music streaming service data
const musicStreamingServices: MusicStreamingService[] = [
  {
    id: 1,
    provider: "Spotify",
    name: "Premium",
    price: 109,
    audioQuality: "320 kbps",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["Ingen reklame", "Ubegrenset hopp", "Podcasts"],
    color: "#1DB954",
  },
  {
    id: 2,
    provider: "Apple Music",
    name: "Individual",
    price: 109,
    audioQuality: "Lossless (ALAC)",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["Lossless Audio", "Spatial Audio", "Apple One"],
    color: "#FA243C",
  },
  {
    id: 3,
    provider: "TIDAL",
    name: "HiFi",
    price: 109,
    audioQuality: "HiFi (FLAC)",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["HiFi Kvalitet", "Eksklusive innhold", "Artiststøtte"],
    color: "#000000",
  },
  {
    id: 4,
    provider: "TIDAL",
    name: "HiFi Plus",
    price: 219,
    audioQuality: "Master (MQA)",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["Master Kvalitet", "Dolby Atmos", "Sony 360 Reality Audio"],
    color: "#000000",
  },
  {
    id: 5,
    provider: "Deezer",
    name: "Premium",
    price: 99,
    audioQuality: "320 kbps",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["Flow personalisering", "Lyrics", "Podcasts"],
    color: "#00C7F2",
  },
  {
    id: 6,
    provider: "YouTube Music",
    name: "Premium",
    price: 99,
    audioQuality: "256 kbps",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["Bakgrunnsspilling", "YouTube Premium", "Ingen reklame"],
    color: "#FF0000",
  },
  {
    id: 7,
    provider: "Amazon Music",
    name: "Unlimited",
    price: 99,
    audioQuality: "HD (FLAC)",
    offlineListening: true,
    familyPlan: true,
    studentDiscount: true,
    features: ["HD Audio", "Ultra HD", "Spatial Audio"],
    color: "#00A8E1",
  },
  {
    id: 8,
    provider: "SoundCloud",
    name: "Go+",
    price: 99,
    audioQuality: "256 kbps",
    offlineListening: true,
    familyPlan: false,
    studentDiscount: true,
    features: ["Indie artister", "DJ miks", "Ubegrenset nedlastinger"],
    color: "#FF7700",
  },
]

export default function MusicStreamingSorter() {
  const [sortBy, setSortBy] = useState("price-asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredServices, setFilteredServices] = useState(musicStreamingServices)
  const [activeTab, setActiveTab] = useState("all")

  // Sort and filter services when sort criteria or search term changes
  useEffect(() => {
    let result = [...musicStreamingServices]

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (service) =>
          service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by provider tab
    if (activeTab !== "all") {
      result = result.filter((service) => service.provider.toLowerCase() === activeTab.toLowerCase())
    }

    // Sort the services
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.provider.localeCompare(b.provider)
        case "name-desc":
          return b.provider.localeCompare(a.provider)
        default:
          return 0
      }
    })

    setFilteredServices(result)
  }, [sortBy, searchTerm, activeTab])

  // Get unique providers for tabs
  const providers = ["all", ...new Set(musicStreamingServices.map((service) => service.provider.toLowerCase()))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søk etter tjeneste..."
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
            {filteredServices.map((service) => (
              <MusicStreamingCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredServices.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Ingen tjenester funnet. Prøv å endre søket ditt.</p>
        </div>
      )}
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import MusicStreamingCard, { type MusicStreamingService } from "./music-streaming-card"

// Sample featured music streaming services
const featuredServices: MusicStreamingService[] = [
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
]

export default function FeaturedMusicStreaming() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Populære musikkstrømmetjenester</h2>
        <Link href="/musikkstromming">
          <Button variant="outline">Se alle tjenester</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredServices.map((service) => (
          <MusicStreamingCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

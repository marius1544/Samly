import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedMobilePlans from "@/components/featured-mobile-plans"
import FeaturedMusicStreaming from "@/components/featured-music-streaming"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#00b8e0] py-8 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Samly</h1>

          <div className="relative max-w-xl mb-6">
            <Input type="text" placeholder="Hva er du på jakt etter?" className="pr-10 bg-white border-none" />

            <Button
              size="icon"
              className="absolute right-0 top-0 h-full bg-[#ffcc33] hover:bg-[#e6b82e] rounded-l-none"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Background icons/illustrations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <div className="w-20 h-20 rounded-full border-4 border-white"></div>
          </div>
          <div className="absolute bottom-10 right-10">
            <div className="w-32 h-32 rounded-lg border-4 border-white"></div>
          </div>
          <div className="absolute top-1/4 right-1/4">
            <div className="w-16 h-16 rounded-full border-4 border-white"></div>
          </div>
        </div>
      </section>

      {/* Featured Mobile Plans */}
      <section className="py-12 container mx-auto px-4 bg-gray-50">
        <FeaturedMobilePlans />
      </section>

      {/* Featured Music Streaming Services */}
      <section className="py-12 container mx-auto px-4">
        <FeaturedMusicStreaming />
      </section>

      {/* Services Navigation */}
      <section className="py-12 container mx-auto px-4 bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Utforsk flere tjenester</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/mobilabonnementer">
              <Button variant="outline" size="lg">
                Mobilabonnementer
              </Button>
            </Link>
            <Link href="/musikkstromming">
              <Button variant="outline" size="lg">
                Musikkstrømming
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

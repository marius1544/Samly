import MusicStreamingSorter from "@/components/music-streaming-sorter"

export default function MusicStreamingPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Musikkstrømmetjenester</h1>
      <MusicStreamingSorter />
    </main>
  )
}

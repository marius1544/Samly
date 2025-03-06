import MobilePlanSorter from "@/components/mobile-plan-sorter"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mobilabonnementer</h1>
      <MobilePlanSorter />
    </main>
  )
}


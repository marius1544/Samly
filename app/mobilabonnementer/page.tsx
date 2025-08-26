"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MobilePlanFilters, { type FilterState } from "@/components/mobile-plan-filters"
import { MobileSubscriptionResults } from "@/components/mobile-subscription-results"
import MobilePlanFinder from "@/components/mobile-plan-finder"

export default function MobilabonnementerPage() {
  const [activeTab, setActiveTab] = useState<"billigste" | "beste">("billigste")
  const [filters, setFilters] = useState<FilterState>({
    dataAmount: [1],
    minRating: "all",
    networks: [],
    simTypes: ["physical"],
    features: [],
    sortBy: "price-asc",
  })

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mobilabonnementer</h1>

      {/* Simple Plan Finder */}
      <div className="mb-12">
        <MobilePlanFinder />
      </div>

      {/* Detailed Plan Comparison */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Sammenlign alle mobilabonnementer</h2>

        <Tabs
          defaultValue="billigste"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "billigste" | "beste")}
          className="space-y-8"
        >
          <TabsList className="w-full justify-start h-12 bg-white border-b rounded-none p-0 space-x-8">
            <TabsTrigger
              value="billigste"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none h-full"
            >
              Billigste mobilabonnement
            </TabsTrigger>
            <TabsTrigger
              value="beste"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none h-full"
            >
              Beste mobilabonnement
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
            <MobilePlanFilters onFiltersChange={handleFiltersChange} />
            <TabsContent value="billigste" className="mt-0">
              <MobileSubscriptionResults filters={filters} sortType="billigste" />
            </TabsContent>
            <TabsContent value="beste" className="mt-0">
              <MobileSubscriptionResults filters={filters} sortType="beste" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}

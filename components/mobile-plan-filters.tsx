"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface FilterState {
  dataAmount: number[]
  minRating: string
  networks: string[]
  simTypes: string[]
  features: string[]
  sortBy: string
}

interface FilterProps {
  onFiltersChange: (filters: FilterState) => void
}

export default function MobilePlanFilters({ onFiltersChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    dataAmount: [1],
    minRating: "all",
    networks: [],
    simTypes: ["physical"],
    features: [],
    sortBy: "price-asc",
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  return (
    <div className="bg-white p-6 border rounded-lg space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">DATA PR. MND</h3>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">GB</span>
            <span className="font-medium">{filters.dataAmount[0]} GB</span>
          </div>
          <Slider
            value={filters.dataAmount}
            onValueChange={(value) => updateFilters({ dataAmount: value })}
            min={0}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 GB</span>
            <div className="flex items-center">
              <span>Fri Data</span>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hover:text-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>
                      Fri Data betyr at du har ubegrenset databruk, men hastigheten kan bli redusert etter en viss
                      mengde forbrukt data (typisk 100GB).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">VURDERINGER</h3>
        <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-md">
          {[
            { label: "Alle", value: "all", description: "Vis alle abonnementer uavhengig av kundevurdering" },
            {
              label: "3.5+",
              value: "3.5",
              description: "Vis abonnementer med god kundetilfredshet (3.5 stjerner eller høyere)",
            },
            {
              label: "4.5+",
              value: "4.5",
              description: "Vis kun topprangerte abonnementer (4.5 stjerner eller høyere)",
            },
          ].map((rating) => (
            <TooltipProvider key={rating.value} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => updateFilters({ minRating: rating.value })}
                    className={`px-4 py-2 rounded text-sm ${
                      filters.minRating === rating.value ? "bg-white shadow" : "hover:bg-white/50"
                    }`}
                  >
                    {rating.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p>{rating.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">MOBILNETTVERK</h3>
        <div className="space-y-3">
          {[
            { label: "Telenor-dekning", value: "telenor" },
            { label: "Telia-dekning", value: "telia" },
            { label: "Ice-dekning", value: "ice" },
          ].map((network) => (
            <div key={network.value} className="flex items-center space-x-2">
              <Checkbox
                id={network.value}
                checked={filters.networks.includes(network.value)}
                onCheckedChange={(checked) => {
                  updateFilters({
                    networks: checked
                      ? [...filters.networks, network.value]
                      : filters.networks.filter((n) => n !== network.value),
                  })
                }}
              />
              <div className="flex items-center">
                <label htmlFor={network.value} className="text-sm cursor-pointer">
                  {network.label}
                </label>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        {network.value === "telenor"
                          ? "Telenor har Norges største mobilnett med 99,9% befolkningsdekning. Gir god dekning i hele Norge, inkludert i fjellområder og langs kysten."
                          : network.value === "telia"
                            ? "Telia har det nest største mobilnettet i Norge med 98% befolkningsdekning. Spesielt god dekning i byområder og tettbygde strøk."
                            : "Ice har et eget 4G-nett som dekker over 90% av befolkningen. I områder uten egen dekning brukes Telias nett som backup."}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">SIM TYPE</h3>
        <div className="space-y-3">
          {[
            { label: "SIM-kort", value: "physical" },
            { label: "eSIM", value: "esim" },
          ].map((simType) => (
            <div key={simType.value} className="flex items-center space-x-2">
              <input
                type="radio"
                id={simType.value}
                name="simType"
                checked={filters.simTypes.includes(simType.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilters({ simTypes: [simType.value] })
                  }
                }}
                className="text-blue-500 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <label htmlFor={simType.value} className="text-sm cursor-pointer">
                  {simType.label}
                </label>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        {simType.value === "physical"
                          ? "Tradisjonelt fysisk SIM-kort som må settes inn i telefonen. Kommer i tre størrelser: standard, micro og nano."
                          : "eSIM er et digitalt SIM-kort som er innebygd i enheten. Krever ikke fysisk kort og kan aktiveres ved å skanne en QR-kode. Støttes av nyere smarttelefoner."}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">VIS KUN ABONNEMENT SOM</h3>
        <div className="space-y-3">
          {[
            { label: "Inkluderer data rollover", value: "data-rollover" },
            { label: "Inkluderer bruk i EU/EØS", value: "eu-roaming" },
            { label: "Inkluderer fri SMS/MMS/tale", value: "free-messaging" },
          ].map((feature) => (
            <div key={feature.value} className="flex items-center space-x-2">
              <Checkbox
                id={feature.value}
                checked={filters.features.includes(feature.value)}
                onCheckedChange={(checked) => {
                  updateFilters({
                    features: checked
                      ? [...filters.features, feature.value]
                      : filters.features.filter((f) => f !== feature.value),
                  })
                }}
              />
              <div className="flex items-center">
                <label htmlFor={feature.value} className="text-sm cursor-pointer">
                  {feature.label}
                </label>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        {feature.value === "data-rollover"
                          ? "Data rollover lar deg ta med ubrukt data fra én måned til den neste. Dette betyr at du ikke mister data du har betalt for men ikke brukt."
                          : feature.value === "eu-roaming"
                            ? "EU/EØS roaming lar deg bruke abonnementet ditt i EU/EØS-land uten ekstra kostnader. Inkluderer data, samtaler og SMS innenfor rimelig bruk."
                            : "Fri SMS/MMS/tale betyr at du kan ringe og sende meldinger ubegrenset uten å bekymre deg for ekstra kostnader."}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

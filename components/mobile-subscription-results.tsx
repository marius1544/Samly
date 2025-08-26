"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, Phone, MessageSquare } from "lucide-react"
import { mobilePlans, type MobilePlan } from "@/data/mobile-plans"
import type { FilterState } from "./mobile-plan-filters"

interface ResultsProps {
  filters: FilterState
  sortType: "billigste" | "beste"
}

export function MobileSubscriptionResults({ filters, sortType }: ResultsProps) {
  const [filteredPlans, setFilteredPlans] = useState<MobilePlan[]>([])

  useEffect(() => {
    let result = [...mobilePlans]

    // Filter by data amount
    if (filters.dataAmount[0] > 0) {
      result = result.filter((plan) => plan.data >= filters.dataAmount[0])
    }

    // Filter by rating
    if (filters.minRating !== "all") {
      const minRating = Number.parseFloat(filters.minRating)
      result = result.filter((plan) => plan.rating >= minRating)
    }

    // Filter by network
    if (filters.networks.length > 0) {
      result = result.filter((plan) => filters.networks.includes(plan.network))
    }

    // Filter by SIM type
    if (filters.simTypes.length > 0) {
      result = result.filter((plan) => plan.simTypes.some((type) => filters.simTypes.includes(type)))
    }

    // Filter by features
    if (filters.features.length > 0) {
      result = result.filter((plan) => {
        let match = true
        if (filters.features.includes("data-rollover") && !plan.dataRollover) {
          match = false
        }
        if (filters.features.includes("eu-roaming") && !plan.euRoaming) {
          match = false
        }
        if (filters.features.includes("free-messaging") && !plan.freeMessaging) {
          match = false
        }
        return match
      })
    }

    // Sort the plans
    if (sortType === "billigste") {
      result.sort((a, b) => a.price - b.price)
    } else {
      // For "beste", sort by a combination of rating and features
      result.sort((a, b) => {
        const scoreA = a.rating * 10 + a.features.length * 2
        const scoreB = b.rating * 10 + b.features.length * 2
        return scoreB - scoreA
      })
    }

    setFilteredPlans(result)
  }, [filters, sortType])

  if (filteredPlans.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground">Ingen abonnementer funnet. Prøv å endre filtrene dine.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredPlans.map((plan) => (
        <Card key={plan.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{plan.provider}</h3>
                <p className="text-muted-foreground">{plan.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{plan.price} kr</p>
                <p className="text-sm text-muted-foreground">per måned</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
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
              </div>

              <div className="flex flex-wrap gap-2">
                {plan.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="w-full md:w-auto" style={{ backgroundColor: plan.color }}>
                  Velg abonnement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

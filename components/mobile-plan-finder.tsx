"use client"

import { useState, useEffect } from "react"
import { Wifi, Phone, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { mobilePlans } from "@/data/mobile-plans"

export default function MobilePlanFinder() {
  // State for slider values
  const [budget, setBudget] = useState([350])
  const [dataUsage, setDataUsage] = useState([20])
  const [bindingTime, setBindingTime] = useState([0])
  const [bestMatch, setBestMatch] = useState(mobilePlans[0])

  // Find the best matching plan based on user preferences
  useEffect(() => {
    // Calculate a score for each plan based on how well it matches the criteria
    const scoredPlans = mobilePlans.map((plan) => {
      let score = 0

      // Price score (closer to budget is better)
      const priceDiff = Math.abs(plan.price - budget[0])
      score -= priceDiff

      // Data score (closer to desired data usage is better)
      const dataDiff = Math.abs(plan.data - dataUsage[0])
      score -= dataDiff * 2 // Weight data more heavily

      // Binding time score (exact match is best)
      if (plan.bindingPeriod === bindingTime[0]) {
        score += 50 // Bonus for matching binding time
      } else {
        score -= Math.abs(plan.bindingPeriod - bindingTime[0]) * 10
      }

      return { plan, score }
    })

    // Sort by score and get the best match
    scoredPlans.sort((a, b) => b.score - a.score)
    setBestMatch(scoredPlans[0]?.plan)
  }, [budget, dataUsage, bindingTime])

  return (
    <div className="bg-white p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Finn ditt perfekte mobilabonnement</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">Månedlig budsjett</label>
              <span className="font-bold">{budget[0]} kr</span>
            </div>
            <Slider value={budget} min={100} max={500} step={10} onValueChange={setBudget} className="py-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>100 kr</span>
              <span>500 kr</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">Databruk per måned</label>
              <span className="font-bold">{dataUsage[0]} GB</span>
            </div>
            <Slider value={dataUsage} min={1} max={100} step={1} onValueChange={setDataUsage} className="py-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 GB</span>
              <span>100 GB</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">Bindingstid</label>
              <span className="font-bold">{bindingTime[0]} måneder</span>
            </div>
            <Slider value={bindingTime} min={0} max={12} step={3} onValueChange={setBindingTime} className="py-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Ingen binding</span>
              <span>12 måneder</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Ditt beste match:</h3>
            <Card className="overflow-hidden">
              <div className="h-2" style={{ backgroundColor: bestMatch.color }}></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{bestMatch.provider}</h3>
                    <p className="text-muted-foreground">{bestMatch.name}</p>
                  </div>
                  <p className="text-2xl font-bold">{bestMatch.price} kr</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{bestMatch.data} GB</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{bestMatch.callMinutes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{bestMatch.sms}</span>
                  </div>
                  {bestMatch.bindingPeriod > 0 && (
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{bestMatch.bindingPeriod} mnd. binding</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {bestMatch.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full mt-4" style={{ backgroundColor: bestMatch.color }}>
                  Velg abonnement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

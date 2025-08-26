import { Wifi, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample mobile plan data (using the same data structure as in mobile-plan-sorter.tsx)
const featuredPlans = [
  {
    id: 1,
    provider: "Telenor",
    name: "Frihet S",
    price: 529,
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
]

export default function FeaturedMobilePlans() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Populære mobilabonnementer</h2>
        <Link href="/mobilabonnementer">
          <Button variant="outline">Se alle abonnementer</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredPlans.map((plan) => (
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
    </div>
  )
}

import { Music, Headphones, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface MusicStreamingService {
  id: number
  provider: string
  name: string
  price: number
  audioQuality: string
  offlineListening: boolean
  familyPlan: boolean
  studentDiscount: boolean
  features: string[]
  color: string
}

interface MusicStreamingCardProps {
  service: MusicStreamingService
}

export default function MusicStreamingCard({ service }: MusicStreamingCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: service.color }}></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{service.provider}</h3>
            <p className="text-muted-foreground">{service.name}</p>
          </div>
          <p className="text-2xl font-bold">{service.price} kr</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Music className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="font-medium">{service.audioQuality}</span>
          </div>
          <div className="flex items-center">
            <Headphones className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{service.offlineListening ? "Offline lytting" : "Kun online"}</span>
          </div>
          {service.familyPlan && (
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Familieabonnement tilgjengelig</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.features.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>

        <Button className="w-full mt-4" style={{ backgroundColor: service.color }}>
          Velg tjeneste
        </Button>
      </CardContent>
    </Card>
  )
}

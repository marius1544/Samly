import { Percent, Smartphone, Headphones, Watch } from "lucide-react"

interface CategoryCardProps {
  icon: string
  title: string
  color: string
  bgColor: string
}

export default function CategoryCard({ icon, title, color, bgColor }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "percent":
        return <Percent size={24} color={color} />
      case "smartphone":
        return <Smartphone size={24} color={color} />
      case "headphones":
        return <Headphones size={24} color={color} />
      case "watch":
        return <Watch size={24} color={color} />
      default:
        return <Percent size={24} color={color} />
    }
  }

  return (
    <div
      className="flex items-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mr-3 p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
        {getIcon()}
      </div>
      <span className="font-medium">{title}</span>
    </div>
  )
}

import {
  Compass,
  Map,
  Waves,
  Sun,
  Mountain,
  Landmark,
  Utensils,
  Users,
  Ship,
  Fish,
  type LucideProps,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  compass: Compass,
  map: Map,
  waves: Waves,
  sun: Sun,
  mountain: Mountain,
  landmark: Landmark,
  utensils: Utensils,
  users: Users,
  ship: Ship,
  fish: Fish,
};

export default function CategoryIcon({
  icon,
  size = 20,
  ...props
}: { icon: string } & LucideProps) {
  const Icon = ICONS[icon] || Compass;
  return <Icon size={size} {...props} />;
}

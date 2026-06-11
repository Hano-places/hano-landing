import {
  Calendar03Icon,
  Clock01Icon,
  FavouriteIcon,
  GridIcon,
  HelpCircleIcon,
  Location01Icon,
  Message01Icon,
  Restaurant01Icon,
  Search01Icon,
  SecurityCheckIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

export const iconMap = {
  search: Search01Icon,
  message: Message01Icon,
  location: Location01Icon,
  clock: Clock01Icon,
  star: StarIcon,
  restaurant: Restaurant01Icon,
  grid: GridIcon,
  shield: SecurityCheckIcon,
  heart: FavouriteIcon,
  sparkles: SparklesIcon,
  calendar: Calendar03Icon,
  users: UserGroupIcon,
  help: HelpCircleIcon,
} as const;

export type IconName = keyof typeof iconMap;

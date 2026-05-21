import type { BrandLogoStyle } from "./components/BrandLogo";

export type View = "landing" | "profile" | "dashboard" | "brands";

// PocketBase real data types

export interface Rider {
  id: string;
  username: string;
  display_name: string;
  discipline?: string;
  city?: string;
  bio?: string;
  quote?: string;
  avatar_url?: string;
  cover_url?: string;
  is_active: boolean;
  collectionId: string;
  collectionName: string;
}

export interface RiderLink {
  id: string;
  rider: string;
  label: string;
  sublabel?: string;
  url: string;
  icon?: string;
  position: number;
  click_count: number;
  is_active: boolean;
}

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
  icon: "instagram" | "strava" | "youtube" | "mail" | "heart";
  brand?: BrandLogoStyle;
}

export interface PublicLink {
  label: string;
  sublabel?: string;
  url: string;
  icon: "instagram" | "strava" | "youtube" | "mail" | "heart" | "store" | "star";
  brand?: BrandLogoStyle;
}

export interface MerchItem {
  name: string;
  tag: string;
  price: string;
  image: string;
  ctaLabel: string;
  url: string;
}

export interface PalmaresEntry {
  year: string;
  race: string;
  position: string;
  category: string;
  type: "XCM" | "Gravel" | "Enduro" | "Ruta" | "DH" | "Open";
  podium: boolean;
}

export interface Tip {
  title: string;
  body: string;
  image: string;
  tag: string;
}

export interface BioStats {
  label: string;
  value: string;
}

export interface Sponsor {
  name: string;
  category: string;
  initials: string;
  accent: string;
  image: string;
}

export interface Gear {
  category: string;
  item: string;
  brand: string;
  logo: BrandLogoStyle;
}

export interface UpcomingRace {
  name: string;
  date: string;
  location: string;
}

export interface Cyclist {
  name: string;
  discipline: string;
  city: string;
  initials: string;
  coverImage: string;
  avatar: string;
  quote: string;
  bio: string;
  bioStats: BioStats[];
  socials: SocialLink[];
  publicLinks: PublicLink[];
  sponsors: Sponsor[];
  upcomingRaces: UpcomingRace[];
  gear: Gear[];
  palmares: PalmaresEntry[];
  tips: Tip[];
  merch: MerchItem[];
}

export interface MetricRow {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  hint: string;
}

export interface ReferralRow {
  date: string;
  origin: string;
  action: string;
  status: "Pendiente" | "Pagado" | "En revisión";
  commission: string;
}

export interface ProfileExample {
  name: string;
  discipline: string;
  city: string;
  initials: string;
  sponsors: number;
  cover: string;
  avatar: string;
}

export type LinkTag = "Link referido" | "Comisión activa" | "Descuento disponible";

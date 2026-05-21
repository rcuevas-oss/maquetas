export interface Rider {
  id: string;
  username: string;
  email: string;
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
  created: string;
  updated: string;
  verified?: boolean;
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
  created: string;
  updated: string;
}

export type LinkIcon = "instagram" | "strava" | "youtube" | "mail" | "store" | "star" | "heart" | "link";

export interface ProfilePatch {
  display_name?: string;
  discipline?: string;
  city?: string;
  bio?: string;
  quote?: string;
  avatar_url?: string;
  cover_url?: string;
}

export interface NewLink {
  label: string;
  sublabel?: string;
  url: string;
  icon?: LinkIcon;
  position?: number;
  is_active?: boolean;
}

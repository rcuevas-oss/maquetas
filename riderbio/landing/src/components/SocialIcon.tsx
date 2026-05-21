import { Instagram, Mail, Heart, Youtube, Activity, ShoppingBag, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { PublicLink, SocialLink } from "../types";

type IconName = SocialLink["icon"] | PublicLink["icon"];

const map: Record<IconName, ReactNode> = {
  instagram: <Instagram size={18} />,
  strava: <Activity size={18} />,
  youtube: <Youtube size={18} />,
  mail: <Mail size={18} />,
  heart: <Heart size={18} />,
  store: <ShoppingBag size={18} />,
  star: <Star size={18} />,
};

export function SocialIcon({ name }: { name: IconName }) {
  return <>{map[name]}</>;
}

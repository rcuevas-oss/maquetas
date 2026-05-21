import PocketBase from "pocketbase";
import type { Rider, RiderLink } from "../types";

// PocketBase 8094 — product (riders, links, campaigns)
export const pb = new PocketBase(
  (import.meta.env.VITE_PB_URL as string | undefined) ?? "https://pb-riderbio.larefactoria.cl"
);

// PocketBase 8090 — agency core (leads)
const pbCore = new PocketBase(
  (import.meta.env.VITE_PB_CORE_URL as string | undefined) ?? "https://pb.larefactoria.cl"
);

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  type: "ciclista" | "tienda" | "marca";
  message?: string;
  source?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  await pbCore.collection("interested_leads").create({
    ...payload,
    source: payload.source ?? "riderbio-landing",
  });
}

export async function getRiderByUsername(username: string): Promise<Rider | null> {
  try {
    const record = await pb.collection("riders").getFirstListItem<Rider>(
      `username = "${username}" && is_active = true`
    );
    return record;
  } catch {
    return null;
  }
}

export async function getPublicLinks(riderId: string): Promise<RiderLink[]> {
  const result = await pb.collection("rider_links").getFullList<RiderLink>({
    filter: `rider = "${riderId}" && is_active = true`,
    sort: "position",
  });
  return result;
}

export function trackClick(linkId: string): void {
  pb.collection("link_clicks").create({
    link: linkId,
    ua_hint: navigator.userAgent.slice(0, 80),
  }).catch(() => {});
}

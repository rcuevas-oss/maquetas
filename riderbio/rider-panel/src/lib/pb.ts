import PocketBase from "pocketbase";
import type { Rider, RiderLink, ProfilePatch, NewLink } from "./types";

export const pb = new PocketBase(
  (import.meta.env.VITE_PB_URL as string | undefined) ?? "https://pb-riderbio.larefactoria.cl"
);

export const PUBLIC_BASE =
  (import.meta.env.VITE_PUBLIC_BASE as string | undefined) ?? "https://riderbio.larefactoria.cl";

// ── Auth ─────────────────────────────────────────────────────────

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  display_name: string;
  discipline?: string;
  city?: string;
}

export async function registerRider(p: RegisterPayload): Promise<Rider> {
  const record = await pb.collection("riders").create<Rider>({
    email: p.email,
    password: p.password,
    passwordConfirm: p.password,
    username: p.username,
    display_name: p.display_name,
    discipline: p.discipline ?? "",
    city: p.city ?? "",
    is_active: false,
  });
  return record;
}

export async function loginRider(identity: string, password: string): Promise<Rider> {
  const auth = await pb.collection("riders").authWithPassword<Rider>(identity, password);
  return auth.record;
}

export function logoutRider(): void {
  pb.authStore.clear();
}

export function currentRider(): Rider | null {
  if (!pb.authStore.isValid) return null;
  return pb.authStore.record as unknown as Rider;
}

export function onAuthChange(cb: (rider: Rider | null) => void): () => void {
  return pb.authStore.onChange(() => {
    cb(currentRider());
  });
}

// ── Profile ─────────────────────────────────────────────────────

export async function updateProfile(id: string, patch: ProfilePatch): Promise<Rider> {
  return pb.collection("riders").update<Rider>(id, patch);
}

export async function changePassword(
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  await pb.collection("riders").update(id, {
    oldPassword,
    password: newPassword,
    passwordConfirm: newPassword,
  });
}

// ── Links ──────────────────────────────────────────────────────

export async function listLinks(riderId: string): Promise<RiderLink[]> {
  return pb.collection("rider_links").getFullList<RiderLink>({
    filter: `rider = "${riderId}"`,
    sort: "position,created",
  });
}

export async function createLink(riderId: string, data: NewLink): Promise<RiderLink> {
  return pb.collection("rider_links").create<RiderLink>({
    rider: riderId,
    label: data.label,
    sublabel: data.sublabel ?? "",
    url: data.url,
    icon: data.icon ?? "link",
    position: data.position ?? 0,
    click_count: 0,
    is_active: data.is_active ?? true,
  });
}

export async function updateLink(linkId: string, patch: Partial<NewLink>): Promise<RiderLink> {
  return pb.collection("rider_links").update<RiderLink>(linkId, patch);
}

export async function deleteLink(linkId: string): Promise<void> {
  await pb.collection("rider_links").delete(linkId);
}

export async function reorderLinks(linkIds: string[]): Promise<void> {
  await Promise.all(
    linkIds.map((id, index) =>
      pb.collection("rider_links").update(id, { position: index })
    )
  );
}

// ── Metrics ────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalClicks: number;
  activeLinks: number;
  totalLinks: number;
  topLink: { label: string; clicks: number } | null;
  clicksLast30Days: number;
}

export async function getDashboardMetrics(riderId: string): Promise<DashboardMetrics> {
  const links = await listLinks(riderId);
  const totalLinks = links.length;
  const activeLinks = links.filter((l) => l.is_active).length;
  const totalClicks = links.reduce((sum, l) => sum + (l.click_count ?? 0), 0);

  const top = links
    .filter((l) => l.click_count > 0)
    .sort((a, b) => b.click_count - a.click_count)[0];

  // Clicks últimos 30 días — query directa a link_clicks
  // Solo accesible por admin (listRule=null), así que usamos una aproximación:
  // sumamos click_count de todos los links del rider.
  // En el futuro, cuando agreguemos createdAt en link_clicks visible al rider,
  // refinamos esto.
  const clicksLast30Days = totalClicks; // TODO: filtrar por fecha cuando rules permitan

  return {
    totalClicks,
    activeLinks,
    totalLinks,
    topLink: top ? { label: top.label, clicks: top.click_count } : null,
    clicksLast30Days,
  };
}

export function publicProfileUrl(username: string): string {
  return `${PUBLIC_BASE}/p/${username}`;
}

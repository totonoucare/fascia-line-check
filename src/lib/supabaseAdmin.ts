import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { defaultClinic } from "./defaultClinic";
import type { ClinicConfig } from "./types";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return cachedClient;
}

export function mapClinicRow(row: any): ClinicConfig {
  return {
    id: row.id,
    slug: row.slug,
    clinicName: row.clinic_name,
    logoUrl: row.logo_url,
    themeColor: row.theme_color ?? "#14213D",
    accentColor: row.accent_color ?? "#F59E0B",
    bookingUrl: row.booking_url ?? "https://example.com/reservation",
    isActive: Boolean(row.is_active)
  };
}

export async function getClinicBySlug(slug: string): Promise<ClinicConfig> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ...defaultClinic, slug };
  }

  const { data, error } = await supabase
    .from("clinics")
    .select("id, slug, clinic_name, logo_url, theme_color, accent_color, booking_url, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return { ...defaultClinic, slug };
  }

  return mapClinicRow(data);
}

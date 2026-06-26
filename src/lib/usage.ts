import { getSupabaseAdmin } from "./supabaseAdmin";

export type AdminUsageRow = {
  clinicId: string;
  clinicName: string;
  slug: string;
  resultCount: number;
  bookingClicks: number;
  estimatedAmount: number;
};

export function calculateBillingAmount(resultCount: number): number {
  if (resultCount <= 0) return 0;
  if (resultCount <= 30) return 980;
  if (resultCount <= 100) return 1980;
  if (resultCount <= 300) return 3980;
  if (resultCount <= 700) return 6980;
  if (resultCount <= 1500) return 9980;
  return 14980;
}

export async function getAdminUsage(): Promise<AdminUsageRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [
      {
        clinicId: "demo",
        clinicName: "デモ整体院",
        slug: "demo",
        resultCount: 42,
        bookingClicks: 7,
        estimatedAmount: calculateBillingAmount(42)
      }
    ];
  }

  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data: clinics } = await supabase
    .from("clinics")
    .select("id, clinic_name, slug")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const { data: results } = await supabase
    .from("check_results")
    .select("clinic_id")
    .eq("billable", true)
    .gte("created_at", start.toISOString());

  const { data: events } = await supabase
    .from("events")
    .select("clinic_id, event_type")
    .eq("event_type", "booking_clicked")
    .gte("created_at", start.toISOString());

  const resultCountByClinic = new Map<string, number>();
  for (const row of results ?? []) {
    resultCountByClinic.set(row.clinic_id, (resultCountByClinic.get(row.clinic_id) ?? 0) + 1);
  }

  const bookingCountByClinic = new Map<string, number>();
  for (const row of events ?? []) {
    bookingCountByClinic.set(row.clinic_id, (bookingCountByClinic.get(row.clinic_id) ?? 0) + 1);
  }

  return (clinics ?? []).map((clinic) => {
    const resultCount = resultCountByClinic.get(clinic.id) ?? 0;
    return {
      clinicId: clinic.id,
      clinicName: clinic.clinic_name,
      slug: clinic.slug,
      resultCount,
      bookingClicks: bookingCountByClinic.get(clinic.id) ?? 0,
      estimatedAmount: calculateBillingAmount(resultCount)
    };
  });
}

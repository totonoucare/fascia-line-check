import { NextResponse } from "next/server";
import { getClinicBySlug, getSupabaseAdmin } from "@/lib/supabaseAdmin";

const allowedEvents = new Set(["booking_clicked", "check_started", "embed_loaded"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clinicSlug, sessionId, eventType, payload } = body;

    if (!clinicSlug || !sessionId || !eventType || !allowedEvents.has(eventType)) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const clinic = await getClinicBySlug(clinicSlug);
    const supabase = getSupabaseAdmin();

    if (!supabase || !clinic.id) {
      return NextResponse.json({ ok: true, mock: true });
    }

    const { error } = await supabase.from("events").insert({
      clinic_id: clinic.id,
      session_id: sessionId,
      event_type: eventType,
      payload_json: payload ?? {}
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "unknown_error" }, { status: 500 });
  }
}

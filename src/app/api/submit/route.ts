import { NextResponse } from "next/server";
import { getClinicBySlug, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clinicSlug, sessionId, answers, scores, primaryLine, secondaryLine } = body;

    if (!clinicSlug || !sessionId || !answers || !scores || !primaryLine) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const clinic = await getClinicBySlug(clinicSlug);
    const supabase = getSupabaseAdmin();

    if (!supabase || !clinic.id) {
      return NextResponse.json({ resultId: `mock-${Date.now()}`, mock: true });
    }

    await supabase.from("check_sessions").upsert(
      {
        clinic_id: clinic.id,
        session_id: sessionId,
        status: "completed",
        completed_at: new Date().toISOString()
      },
      { onConflict: "clinic_id,session_id" }
    );

    const { data, error } = await supabase
      .from("check_results")
      .upsert(
        {
          clinic_id: clinic.id,
          session_id: sessionId,
          module_key: "fascia_line",
          answers_json: answers,
          scores_json: scores,
          primary_line: primaryLine,
          secondary_line: secondaryLine ?? null,
          billable: true
        },
        { onConflict: "clinic_id,session_id,module_key" }
      )
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("events").insert({
      clinic_id: clinic.id,
      session_id: sessionId,
      event_type: "check_completed",
      payload_json: { resultId: data.id, primaryLine, secondaryLine }
    });

    return NextResponse.json({ resultId: data.id });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "unknown_error" }, { status: 500 });
  }
}

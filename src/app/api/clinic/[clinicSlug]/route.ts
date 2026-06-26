import { NextResponse } from "next/server";
import { getClinicBySlug } from "@/lib/supabaseAdmin";

export async function GET(_request: Request, { params }: { params: { clinicSlug: string } }) {
  const clinic = await getClinicBySlug(params.clinicSlug);
  return NextResponse.json({ clinic });
}

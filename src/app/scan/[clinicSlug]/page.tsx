import { CheckWidget } from "@/components/CheckWidget";
import { getClinicBySlug } from "@/lib/supabaseAdmin";

export default async function ScanPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await getClinicBySlug(params.clinicSlug);
  return <CheckWidget clinic={clinic} />;
}

import { CheckWidget } from "@/components/CheckWidget";
import { getClinicBySlug } from "@/lib/supabaseAdmin";

export default async function EmbedPage({ params }: { params: { clinicSlug: string } }) {
  const clinic = await getClinicBySlug(params.clinicSlug);
  return (
    <div className="bg-transparent">
      <CheckWidget clinic={clinic} embed />
    </div>
  );
}

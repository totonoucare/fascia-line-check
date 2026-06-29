import Link from "next/link";
import { ResultCard } from "@/components/ResultCard";
import { defaultClinic } from "@/lib/defaultClinic";
import { scoreAnswers } from "@/lib/scoring";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import type { AnswerMap, ClinicConfig } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ResultPage({ params }: { params: { resultId: string } }) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-navy-900">結果ページ</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Supabase環境変数が未設定のため、保存済み結果は表示できません。デモは <Link className="font-bold text-amberline-500" href="/scan/demo">/scan/demo</Link> で確認できます。
          </p>
        </div>
      </main>
    );
  }

  const { data } = await supabase
    .from("check_results")
    .select("id, answers_json, created_at, clinics(id, slug, clinic_name, logo_url, theme_color, accent_color, booking_url, is_active)")
    .eq("id", params.resultId)
    .maybeSingle();

  if (!data?.answers_json) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-navy-900">結果が見つかりません</h1>
          <p className="mt-4 text-sm text-slate-600">URLをご確認ください。</p>
        </div>
      </main>
    );
  }

  const clinicRow = Array.isArray(data.clinics) ? data.clinics[0] : data.clinics;
  const clinic: ClinicConfig = clinicRow
    ? {
        id: clinicRow.id,
        slug: clinicRow.slug,
        clinicName: clinicRow.clinic_name,
        logoUrl: clinicRow.logo_url,
        themeColor: clinicRow.theme_color ?? "#14213D",
        accentColor: clinicRow.accent_color ?? "#F59E0B",
        bookingUrl: clinicRow.booking_url ?? "https://example.com/reservation",
        isActive: Boolean(clinicRow.is_active)
      }
    : defaultClinic;

  const result = scoreAnswers(data.answers_json as AnswerMap);

  return (
    <main className="px-4 py-10">
      <ResultCard clinic={clinic} result={result} resultId={data.id} />
    </main>
  );
}

import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { lineDefinitions } from "@/lib/scoring";
import type { FasciaLine } from "@/lib/types";

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
    .select("id, primary_line, secondary_line, scores_json, created_at, clinics(clinic_name, booking_url)")
    .eq("id", params.resultId)
    .maybeSingle();

  if (!data) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-navy-900">結果が見つかりません</h1>
          <p className="mt-4 text-sm text-slate-600">URLをご確認ください。</p>
        </div>
      </main>
    );
  }

  const primary = lineDefinitions[data.primary_line as FasciaLine];

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-[30px] bg-white p-8 shadow-soft ring-1 ring-slate-200">
        <p className="mb-3 inline-flex rounded-full bg-amberline-100 px-3 py-1 text-xs font-bold text-navy-900">保存済み結果</p>
        <h1 className="text-2xl font-black text-navy-900">{primary.resultTitle}</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">{primary.description}</p>
      </div>
    </main>
  );
}

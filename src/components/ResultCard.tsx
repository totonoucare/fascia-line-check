import { lineDefinitions } from "@/lib/scoring";
import type { ClinicConfig, FasciaLine, ScoreResult } from "@/lib/types";
import { LineScoreBars } from "./LineScoreBars";

export function ResultCard({
  clinic,
  result,
  resultId,
  onBookingClick
}: {
  clinic: ClinicConfig;
  result: ScoreResult;
  resultId?: string | null;
  onBookingClick?: () => void;
}) {
  const primary = lineDefinitions[result.primaryLine];
  const secondary = lineDefinitions[result.secondaryLine];

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-soft ring-1 ring-slate-200/70">
      <div className="bg-navy-900 px-6 py-7 text-white sm:px-8">
        <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amberline-100 ring-1 ring-white/15">
          結果が出ました
        </p>
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{primary.resultTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-200">{primary.catch}</p>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <section className="rounded-[24px] bg-ivory p-5 ring-1 ring-amberline-100">
            <p className="text-xs font-bold text-amberline-500">MAIN LINE</p>
            <h3 className="mt-1 text-xl font-bold text-navy-900">{primary.label}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{primary.description}</p>
          </section>

          <section className="rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-xs font-bold text-slate-500">関係しやすい範囲</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-navy-900">{primary.route}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {primary.commonSigns.map((sign) => (
                <span key={sign} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                  {sign}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] bg-white p-5 ring-1 ring-slate-200">
            <p className="text-xs font-bold text-slate-500">この院で見るポイント</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{primary.clinicPoint}</p>
          </section>
        </div>

        <div className="space-y-5">
          <div className="rounded-[24px] bg-white p-5 ring-1 ring-slate-200">
            <p className="mb-4 text-xs font-bold text-slate-500">つっぱりライン傾向</p>
            <LineScoreBars percentages={result.percentages as Record<FasciaLine, number>} primaryLine={result.primaryLine} />
          </div>

          <div className="rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-xs font-bold text-slate-500">サブ傾向</p>
            <h3 className="mt-1 font-bold text-navy-900">{secondary.label}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{secondary.catch}</p>
          </div>

          <a
            href={clinic.bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onBookingClick}
            className="block rounded-[22px] bg-amberline-500 px-5 py-4 text-center text-base font-bold text-white shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-500"
          >
            {clinic.clinicName}に相談・予約する
          </a>

          <p className="rounded-[18px] bg-white p-4 text-xs leading-6 text-slate-500 ring-1 ring-slate-200">
            このチェックは、現在の体の使い方や負担の傾向を知るためのセルフチェックです。医学的な診断や治療効果を保証するものではありません。
            強い痛み、しびれ、発熱、外傷後の痛み、安静時痛、急な筋力低下などがある場合は、医療機関への相談をご検討ください。
          </p>

          {resultId ? <p className="text-center text-[11px] text-slate-400">result id: {resultId}</p> : null}
        </div>
      </div>
    </div>
  );
}

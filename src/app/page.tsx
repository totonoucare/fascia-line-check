import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const features = [
  "既存の予約システムはそのまま",
  "院のHPにiframeで埋め込み",
  "結果生成数を自動カウント",
  "患者さんに全身を見る理由を伝える",
  "筋膜・姿勢・全身連動系の院向け"
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:py-16">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-soft ring-1 ring-slate-200/70">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <BrandMark className="h-14 w-14" />
              <div>
                <p className="text-xs font-bold tracking-[0.25em] text-amberline-500">FOR CLINIC</p>
                <h1 className="text-2xl font-black text-navy-900">つっぱりラインチェック</h1>
              </div>
            </div>

            <p className="mb-5 inline-flex rounded-full bg-amberline-100 px-4 py-2 text-xs font-bold text-navy-900">
              治療院HP拡張ツール / MVP v0.1
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-navy-950 sm:text-5xl">
              “なぜ全身を見るのか”が、予約前に伝わるチェック体験を。
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              肩こり・腰痛などの悩みを、痛い場所だけでなく、足・骨盤・背中・肩甲骨・首のつながりから見える化。予約システムを置き換えず、院のHPに診断型CVパーツを追加します。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/scan/demo" className="rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
                デモを試す
              </Link>
              <Link href="/admin" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-900 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50">
                管理画面サンプル
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] bg-navy-900 p-6 text-white sm:p-8">
            <p className="text-sm font-bold text-amberline-400">このツールでできること</p>
            <div className="mt-6 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl bg-white/7 p-4 ring-1 ring-white/10">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amberline-500" />
                  <p className="text-sm font-semibold leading-6 text-slate-100">{feature}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[24px] bg-white p-5 text-navy-900">
              <p className="text-xs font-bold text-slate-500">埋め込み例</p>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-700 ring-1 ring-slate-200">
                {`<iframe\n  src="https://your-domain.com/embed/demo"\n  width="100%"\n  height="820"\n  style="border:0;border-radius:24px;"\n></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

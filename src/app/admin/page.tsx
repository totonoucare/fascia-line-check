import Link from "next/link";
import { getAdminUsage } from "@/lib/usage";

export default async function AdminPage() {
  const rows = await getAdminUsage();

  return (
    <main className="min-h-screen px-4 py-10">
      <section className="mx-auto max-w-5xl rounded-[34px] bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-amberline-500">ADMIN SAMPLE</p>
            <h1 className="mt-2 text-3xl font-black text-navy-900">利用数確認</h1>
            <p className="mt-2 text-sm text-slate-500">MVPではここで月間結果生成数・予約クリック数を確認します。</p>
          </div>
          <Link href="/scan/demo" className="rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white">
            デモへ
          </Link>
        </div>

        <div className="overflow-hidden rounded-[24px] ring-1 ring-slate-200">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">院名</th>
                <th className="px-4 py-3">slug</th>
                <th className="px-4 py-3 text-right">結果生成</th>
                <th className="px-4 py-3 text-right">予約クリック</th>
                <th className="px-4 py-3 text-right">概算請求</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.clinicId} className="border-t border-slate-100">
                  <td className="px-4 py-4 font-bold text-navy-900">{row.clinicName}</td>
                  <td className="px-4 py-4 text-slate-500">{row.slug}</td>
                  <td className="px-4 py-4 text-right font-semibold">{row.resultCount}</td>
                  <td className="px-4 py-4 text-right font-semibold">{row.bookingClicks}</td>
                  <td className="px-4 py-4 text-right font-bold text-amberline-500">¥{row.estimatedAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

import { lineDefinitions } from "@/lib/scoring";
import type { FasciaLine } from "@/lib/types";

const order: FasciaLine[] = ["back_line", "front_line", "lateral_line", "spiral_line", "deep_core_line", "arm_line"];

export function LineScoreBars({ percentages, primaryLine }: { percentages: Record<FasciaLine, number>; primaryLine: FasciaLine }) {
  return (
    <div className="space-y-3">
      {order.map((line) => {
        const isPrimary = line === primaryLine;
        return (
          <div key={line}>
            <div className="mb-1 flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
              <span>{lineDefinitions[line].shortLabel}</span>
              <span>{percentages[line]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={isPrimary ? "h-full rounded-full bg-amberline-500" : "h-full rounded-full bg-navy-800/45"}
                style={{ width: `${Math.max(percentages[line], 4)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

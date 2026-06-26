"use client";

import { useEffect, useMemo, useState } from "react";
import { questions, scoreAnswers } from "@/lib/scoring";
import type { AnswerMap, ClinicConfig, ScoreResult } from "@/lib/types";
import { BrandMark } from "./BrandMark";
import { ResultCard } from "./ResultCard";

function getOrCreateSessionId(clinicSlug: string) {
  if (typeof window === "undefined") return crypto.randomUUID();
  const key = `fascia-line-check:${clinicSlug}:session`;
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.sessionStorage.setItem(key, next);
  return next;
}

export function CheckWidget({ clinic, embed = false }: { clinic: ClinicConfig; embed?: boolean }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    setSessionId(getOrCreateSessionId(clinic.slug));
  }, [clinic.slug]);

  const currentQuestion = questions[currentIndex];
  const completedCount = Object.keys(answers).length;
  const progress = Math.round((completedCount / questions.length) * 100);
  const selected = answers[currentQuestion?.id ?? ""];

  const canGoNext = Boolean(currentQuestion && answers[currentQuestion.id]);
  const isLast = currentIndex === questions.length - 1;

  const headerStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${clinic.themeColor}, #0F172A)`,
      color: "white"
    }),
    [clinic.themeColor]
  );

  function choose(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  async function finish() {
    const scored = scoreAnswers(answers);
    setResult(scored);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicSlug: clinic.slug,
          sessionId,
          answers,
          scores: scored.scores,
          primaryLine: scored.primaryLine,
          secondaryLine: scored.secondaryLine
        })
      });
      const json = await response.json();
      setResultId(json.resultId ?? null);
    } catch {
      setResultId(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function trackBookingClick() {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicSlug: clinic.slug,
          sessionId,
          eventType: "booking_clicked",
          payload: { resultId }
        })
      });
    } catch {
      // no-op for MVP
    }
  }

  if (result) {
    return (
      <div className={embed ? "p-2" : "px-4 py-10"}>
        <ResultCard clinic={clinic} result={result} resultId={resultId} onBookingClick={trackBookingClick} />
        {isSubmitting ? <p className="mt-4 text-center text-xs text-slate-500">結果を保存しています…</p> : null}
      </div>
    );
  }

  return (
    <main className={embed ? "mx-auto max-w-3xl p-2" : "mx-auto max-w-4xl px-4 py-10"}>
      <section className="overflow-hidden rounded-[34px] bg-white shadow-soft ring-1 ring-slate-200/80">
        <div className="p-6 sm:p-8" style={headerStyle}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {clinic.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={clinic.logoUrl} alt={`${clinic.clinicName}ロゴ`} className="h-12 w-12 rounded-2xl bg-white object-contain p-1" />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/95">
                  <BrandMark className="h-10 w-10" />
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-white/70">{clinic.clinicName}</p>
                <h1 className="text-xl font-bold sm:text-2xl">つっぱりラインチェック</h1>
              </div>
            </div>
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15 sm:inline-flex">
              約30秒
            </span>
          </div>

          <div className="mt-8">
            <p className="text-2xl font-bold leading-tight sm:text-4xl">
              痛い場所だけでなく、体の“つながり”から見てみましょう。
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              肩こり・腰痛が戻りやすい人へ。いくつかの質問から、負担が集まりやすいラインの傾向をセルフチェックできます。
            </p>
          </div>
        </div>

        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              Q{currentIndex + 1} / {questions.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
            <div className="h-full rounded-full bg-amberline-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold leading-tight text-navy-900">{currentQuestion.title}</h2>
            {currentQuestion.subtitle ? <p className="mt-2 text-sm text-slate-500">{currentQuestion.subtitle}</p> : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const isSelected = selected === option.id;
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => choose(currentQuestion.id, option.id)}
                  className={[
                    "rounded-[22px] border p-4 text-left transition hover:-translate-y-0.5",
                    isSelected
                      ? "border-amberline-500 bg-amberline-100/75 shadow-md shadow-amber-500/10"
                      : "border-slate-200 bg-white hover:border-navy-800/25 hover:bg-slate-50"
                  ].join(" ")}
                >
                  <span className="block text-sm font-bold text-navy-900">{option.label}</span>
                  {option.helper ? <span className="mt-1 block text-xs text-slate-500">{option.helper}</span> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="rounded-full px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
            >
              戻る
            </button>
            {isLast ? (
              <button
                type="button"
                onClick={finish}
                disabled={!canGoNext || isSubmitting}
                className="rounded-full bg-amberline-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 disabled:opacity-40"
              >
                結果を見る
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                disabled={!canGoNext}
                className="rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 disabled:opacity-40"
              >
                次へ
              </button>
            )}
          </div>
        </div>
      </section>

      <p className="mt-5 text-center text-xs text-slate-500">
        提供：TOTONOUケアデザイン / このチェックは医学的な診断ではありません。
      </p>
    </main>
  );
}

export type FasciaLine =
  | "back_line"
  | "front_line"
  | "lateral_line"
  | "spiral_line"
  | "deep_core_line"
  | "arm_line";

export type MainComplaint =
  | "neck_shoulder"
  | "back"
  | "low_back"
  | "hip"
  | "leg"
  | "sole"
  | "arm_wrist";

export type ClinicConfig = {
  id?: string;
  slug: string;
  clinicName: string;
  logoUrl?: string | null;
  themeColor: string;
  accentColor: string;
  bookingUrl: string;
  isActive: boolean;
};

export type QuestionOption = {
  id: string;
  label: string;
  helper?: string;
  weights: Partial<Record<FasciaLine, number>>;
  complaint?: MainComplaint;
  evidence?: string;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  shortTitle: string;
  intent: "complaint" | "movement" | "lifestyle" | "comeback";
  options: QuestionOption[];
};

export type AnswerMap = Record<string, string>;

export type EvidenceCard = {
  questionId: string;
  title: string;
  answer: string;
  text: string;
  relatedLines: FasciaLine[];
};

export type ScoreResult = {
  scores: Record<FasciaLine, number>;
  adjustedScores: Record<FasciaLine, number>;
  percentages: Record<FasciaLine, number>;
  primaryLine: FasciaLine;
  secondaryLine: FasciaLine | null;
  primaryScore: number;
  secondaryScore: number;
  mainComplaint: MainComplaint;
  mainComplaintLabel: string;
  title: string;
  summary: string;
  movementSummary: string;
  secondarySummary: string | null;
  lifestyleSummary: string | null;
  comebackSummary: string;
  clinicPoint: string;
  evidenceCards: EvidenceCard[];
};

export type LineDefinition = {
  key: FasciaLine;
  label: string;
  shortLabel: string;
  internalModel: string;
  catch: string;
  route: string;
  commonSigns: string[];
  description: string;
  clinicPointBase: string;
};

export type FasciaLine = "back_line" | "front_line" | "lateral_line" | "spiral_line" | "arm_line";

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
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
};

export type AnswerMap = Record<string, string>;

export type ScoreResult = {
  scores: Record<FasciaLine, number>;
  percentages: Record<FasciaLine, number>;
  primaryLine: FasciaLine;
  secondaryLine: FasciaLine;
  primaryScore: number;
  secondaryScore: number;
};

export type LineDefinition = {
  key: FasciaLine;
  label: string;
  shortLabel: string;
  catch: string;
  route: string;
  commonSigns: string[];
  resultTitle: string;
  description: string;
  clinicPoint: string;
};

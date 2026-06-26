import type { AnswerMap, FasciaLine, LineDefinition, Question, ScoreResult } from "./types";

export const lineDefinitions: Record<FasciaLine, LineDefinition> = {
  back_line: {
    key: "back_line",
    label: "背面つっぱりライン",
    shortLabel: "背面",
    catch: "足裏〜ふくらはぎ〜背中〜首が、ひとつながりに突っ張りやすい傾向",
    route: "足裏・ふくらはぎ・太もも裏・腰・背中・首の後ろ",
    commonSigns: ["首こり", "肩こり", "腰の重さ", "前屈の硬さ", "ふくらはぎの張り", "足裏の疲れ"],
    resultTitle: "あなたは「背面つっぱりライン」タイプかもしれません",
    description:
      "背中側のラインが、1枚のタイツのようにつながって突っ張りやすいタイプです。首や肩がつらくても、足裏・ふくらはぎ・腰まわりの硬さが関係していることがあります。",
    clinicPoint:
      "つらい場所だけでなく、足元・骨盤・背中・肩甲骨・首まで含めて、背面側のつながりを確認する視点が合いやすい傾向です。"
  },
  front_line: {
    key: "front_line",
    label: "前面つまりライン",
    shortLabel: "前面",
    catch: "股関節前面〜お腹〜胸〜首前が縮こまりやすい傾向",
    route: "股関節前面・お腹・胸・首前側",
    commonSigns: ["反り腰", "呼吸の浅さ", "胸のつまり", "猫背", "首前側の張り", "デスクワーク後のだるさ"],
    resultTitle: "あなたは「前面つまりライン」タイプかもしれません",
    description:
      "体の前側が縮こまりやすく、胸や股関節まわりが詰まりやすいタイプです。肩や首のつらさも、胸・お腹・股関節前面の硬さと関係していることがあります。",
    clinicPoint:
      "肩や腰だけでなく、胸郭・お腹・股関節前面の使い方まで確認すると、負担の出方が見えやすい傾向です。"
  },
  lateral_line: {
    key: "lateral_line",
    label: "側面かたよりライン",
    shortLabel: "側面",
    catch: "外もも〜骨盤横〜脇腹〜首横に偏りが出やすい傾向",
    route: "外もも・骨盤横・脇腹・首横",
    commonSigns: ["片側の腰痛", "肩の高さの違い", "片足重心", "外ももの張り", "首横のこり", "骨盤の左右差感"],
    resultTitle: "あなたは「側面かたよりライン」タイプかもしれません",
    description:
      "体の横側に負担が偏りやすいタイプです。片足重心や左右差が続くと、外もも・骨盤横・脇腹・首横までつながって張りやすくなります。",
    clinicPoint:
      "左右差や片足重心のクセを含めて、横側のラインを確認することで、首肩・腰まわりの負担を整理しやすい傾向です。"
  },
  spiral_line: {
    key: "spiral_line",
    label: "ねじれライン",
    shortLabel: "ねじれ",
    catch: "骨盤・肋骨・肩甲骨・首の左右差や回旋のクセが出やすい傾向",
    route: "骨盤・肋骨・肩甲骨・首の左右差",
    commonSigns: ["振り向きにくい", "片側だけ肩がこる", "背中の片側が張る", "歩くと左右差を感じる", "片側の腰だけ重い"],
    resultTitle: "あなたは「ねじれライン」タイプかもしれません",
    description:
      "骨盤・肋骨・肩甲骨・首のあいだで、ねじれのクセが出やすいタイプです。痛い場所だけでなく、体の回旋や左右差を見ることで、負担の出方が見えやすくなります。",
    clinicPoint:
      "首や腰の局所だけでなく、骨盤・肋骨・肩甲骨の回旋バランスを確認する視点が合いやすい傾向です。"
  },
  arm_line: {
    key: "arm_line",
    label: "腕肩ライン",
    shortLabel: "腕肩",
    catch: "手首〜前腕〜肩〜肩甲骨〜首に負担がつながりやすい傾向",
    route: "手首・前腕・肘・肩・肩甲骨・首",
    commonSigns: ["スマホ首", "PC作業後の肩こり", "腕のだるさ", "手首の疲れ", "肩甲骨まわりの張り", "首肩の慢性こり"],
    resultTitle: "あなたは「腕肩ライン」タイプかもしれません",
    description:
      "手・腕・肩甲骨・首がつながって負担を受けやすいタイプです。スマホやPC作業が多い人は、首や肩だけでなく、手首や前腕の疲れも関係していることがあります。",
    clinicPoint:
      "首肩だけでなく、手首・前腕・肘・肩甲骨の疲れを含めて確認すると、作業姿勢による負担が整理しやすい傾向です。"
  }
};

export const questions: Question[] = [
  {
    id: "main_area",
    title: "今いちばん気になる場所は？",
    subtitle: "直感で一番近いものを選んでください。",
    options: [
      { id: "neck_shoulder", label: "首・肩", weights: { arm_line: 2, back_line: 1, spiral_line: 1 } },
      { id: "back", label: "背中", weights: { back_line: 2, spiral_line: 1 } },
      { id: "low_back", label: "腰", weights: { back_line: 2, front_line: 1, lateral_line: 1 } },
      { id: "hip", label: "股関節", weights: { front_line: 2, lateral_line: 1, spiral_line: 1 } },
      { id: "leg", label: "膝・脚", weights: { lateral_line: 2, back_line: 1 } },
      { id: "sole", label: "足裏", weights: { back_line: 3 } },
      { id: "arm_wrist", label: "腕・手首", weights: { arm_line: 3 } },
      { id: "whole", label: "全体的に重だるい", weights: { front_line: 1, back_line: 1, lateral_line: 1 } }
    ]
  },
  {
    id: "trigger_scene",
    title: "つらくなりやすい場面は？",
    options: [
      { id: "long_sitting", label: "長時間座ったあと", weights: { front_line: 2, back_line: 1, arm_line: 1 } },
      { id: "standing", label: "立ちっぱなしのあと", weights: { lateral_line: 2, back_line: 1 } },
      { id: "walking", label: "歩いたあと", weights: { lateral_line: 1, spiral_line: 2 } },
      { id: "pc_phone", label: "スマホやPC作業のあと", weights: { arm_line: 3, front_line: 1 } },
      { id: "morning", label: "朝起きたとき", weights: { back_line: 1, front_line: 1 } },
      { id: "evening", label: "夕方以降", weights: { arm_line: 1, lateral_line: 1, back_line: 1 } },
      { id: "after_exercise", label: "運動後", weights: { spiral_line: 2, lateral_line: 1 } },
      { id: "unclear", label: "特に決まっていない", weights: { back_line: 1, front_line: 1 } }
    ]
  },
  {
    id: "forward_bend",
    title: "前屈したとき、どこが突っ張りやすいですか？",
    options: [
      { id: "calf_ham", label: "ふくらはぎ・太もも裏", weights: { back_line: 3 } },
      { id: "waist", label: "腰", weights: { back_line: 2, spiral_line: 1 } },
      { id: "upper_back", label: "背中", weights: { back_line: 2, arm_line: 1 } },
      { id: "neck_back", label: "首の後ろ", weights: { back_line: 2, arm_line: 1 } },
      { id: "not_much", label: "あまり突っ張らない", weights: { front_line: 1 } },
      { id: "unknown", label: "わからない", weights: {} }
    ]
  },
  {
    id: "rotation",
    title: "体を左右に振り向いたとき、違和感はありますか？",
    options: [
      { id: "right", label: "右に向きにくい", weights: { spiral_line: 3, arm_line: 1 } },
      { id: "left", label: "左に向きにくい", weights: { spiral_line: 3, arm_line: 1 } },
      { id: "both", label: "どちらも向きにくい", weights: { spiral_line: 2, back_line: 1 } },
      { id: "no_diff", label: "左右差はあまりない", weights: { front_line: 1 } },
      { id: "unknown", label: "わからない", weights: {} }
    ]
  },
  {
    id: "posture",
    title: "普段の姿勢で当てはまるものは？",
    options: [
      { id: "one_leg", label: "片足重心が多い", weights: { lateral_line: 2, spiral_line: 1 } },
      { id: "cross_leg", label: "足を組みやすい", weights: { spiral_line: 2, lateral_line: 1 } },
      { id: "rounded_back", label: "猫背になりやすい", weights: { front_line: 2, arm_line: 1 } },
      { id: "sway_back", label: "反り腰と言われる", weights: { front_line: 2, back_line: 1 } },
      { id: "rounded_shoulder", label: "肩が内に入りやすい", weights: { arm_line: 2, front_line: 1 } },
      { id: "none", label: "特にない", weights: {} }
    ]
  },
  {
    id: "daily_work",
    title: "仕事や生活で多い動作は？",
    options: [
      { id: "desk", label: "デスクワーク", weights: { arm_line: 2, front_line: 1 } },
      { id: "phone", label: "スマホ操作", weights: { arm_line: 3 } },
      { id: "standing_work", label: "立ち仕事", weights: { lateral_line: 2, back_line: 1 } },
      { id: "walk_many", label: "歩くことが多い", weights: { spiral_line: 1, lateral_line: 1, back_line: 1 } },
      { id: "carry", label: "重いものを持つ", weights: { arm_line: 1, back_line: 2 } },
      { id: "car", label: "車移動が多い", weights: { front_line: 2, back_line: 1 } },
      { id: "housework", label: "家事・育児が多い", weights: { arm_line: 1, front_line: 1, spiral_line: 1 } }
    ]
  },
  {
    id: "tight_area",
    title: "張りやすい場所は？",
    options: [
      { id: "calf", label: "ふくらはぎ", weights: { back_line: 3 } },
      { id: "outer_thigh", label: "外もも", weights: { lateral_line: 3 } },
      { id: "front_hip", label: "股関節前", weights: { front_line: 3 } },
      { id: "chest", label: "胸まわり", weights: { front_line: 2, arm_line: 1 } },
      { id: "scapula", label: "肩甲骨まわり", weights: { arm_line: 2, spiral_line: 1 } },
      { id: "forearm", label: "前腕・手首", weights: { arm_line: 3 } },
      { id: "side_neck", label: "首の横", weights: { lateral_line: 2, arm_line: 1 } },
      { id: "none", label: "特にない", weights: {} }
    ]
  },
  {
    id: "comes_back",
    title: "痛い場所だけをほぐしても戻りやすい感覚はありますか？",
    options: [
      { id: "often", label: "よくある", weights: { back_line: 1, front_line: 1, lateral_line: 1, spiral_line: 1, arm_line: 1 } },
      { id: "sometimes", label: "ときどきある", weights: { back_line: 1, spiral_line: 1 } },
      { id: "rarely", label: "あまりない", weights: {} },
      { id: "unknown", label: "わからない", weights: {} }
    ]
  }
];

const allLines: FasciaLine[] = ["back_line", "front_line", "lateral_line", "spiral_line", "arm_line"];

export function scoreAnswers(answers: AnswerMap): ScoreResult {
  const scores = Object.fromEntries(allLines.map((line) => [line, 0])) as Record<FasciaLine, number>;

  for (const question of questions) {
    const answerId = answers[question.id];
    const option = question.options.find((item) => item.id === answerId);
    if (!option) continue;

    for (const [line, value] of Object.entries(option.weights) as Array<[FasciaLine, number]>) {
      scores[line] += value;
    }
  }

  const ranked = [...allLines].sort((a, b) => scores[b] - scores[a]);
  const maxScore = Math.max(...Object.values(scores), 1);
  const percentages = Object.fromEntries(
    allLines.map((line) => [line, Math.round((scores[line] / maxScore) * 100)])
  ) as Record<FasciaLine, number>;

  return {
    scores,
    percentages,
    primaryLine: ranked[0],
    secondaryLine: ranked[1],
    primaryScore: scores[ranked[0]],
    secondaryScore: scores[ranked[1]]
  };
}

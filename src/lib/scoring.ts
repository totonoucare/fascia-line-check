import type {
  AnswerMap,
  EvidenceCard,
  FasciaLine,
  LineDefinition,
  MainComplaint,
  Question,
  ScoreResult
} from "./types";

export const allLines: FasciaLine[] = [
  "back_line",
  "front_line",
  "lateral_line",
  "spiral_line",
  "deep_core_line",
  "arm_line"
];

export const lineDefinitions: Record<FasciaLine, LineDefinition> = {
  back_line: {
    key: "back_line",
    label: "背面つっぱりライン",
    shortLabel: "背面",
    internalModel: "表層後面ライン / Superficial Back Line",
    catch: "足元〜太もも裏〜骨盤〜背中〜首の後ろに、ひとつながりの突っ張りが出やすい傾向",
    route: "足元・ふくらはぎ・太もも裏・骨盤・背中・首の後ろ",
    commonSigns: ["前屈で突っ張る", "腰背部が重い", "首の後ろが張る", "ふくらはぎの張り", "足裏の疲れ"],
    description:
      "背中側のつながりにサインが集まっています。つらい場所そのものだけでなく、足元・ふくらはぎ・太もも裏・骨盤・背中側の負担が残ると、同じ場所に張りが戻りやすいことがあります。",
    clinicPointBase:
      "つらい場所だけでなく、足元・ふくらはぎ・太もも裏・骨盤・背中・首の後ろまで含めて、背面側のつながりを確認する視点が合いやすい傾向です。"
  },
  front_line: {
    key: "front_line",
    label: "前面つまりライン",
    shortLabel: "前面",
    internalModel: "表層前面ライン / Superficial Front Line",
    catch: "股関節の前〜お腹〜胸〜首の前側が縮こまり、前側のつまりとして出やすい傾向",
    route: "股関節の前・お腹・胸まわり・首の前側",
    commonSigns: ["股関節前が詰まる", "胸が開きにくい", "反り腰", "首の前が張る", "上を向きにくい"],
    description:
      "体の前側のつまりにサインが集まっています。股関節の前・お腹・胸まわりが縮こまりやすいと、腰・首肩・背中のつらさにも影響することがあります。",
    clinicPointBase:
      "つらい場所だけでなく、股関節前面・お腹・胸郭・首の前側まで含めて、前側のつまりを確認する視点が合いやすい傾向です。"
  },
  lateral_line: {
    key: "lateral_line",
    label: "側面かたよりライン",
    shortLabel: "側面",
    internalModel: "側面ライン / Lateral Line",
    catch: "外もも〜骨盤横〜脇腹〜首横に、左右差や片側負担が出やすい傾向",
    route: "外もも・骨盤の横・脇腹・肋骨の横・首の横",
    commonSigns: ["片足重心", "外ももの張り", "片側の腰や首", "肩の高さの差", "体側の伸びにくさ"],
    description:
      "体の横側のかたよりにサインが集まっています。片足重心や左右差が続くと、外もも・骨盤の横・脇腹・首横まで負担がつながりやすくなります。",
    clinicPointBase:
      "つらい場所だけでなく、外もも・骨盤横・脇腹・肋骨横・首横まで含めて、横側の偏りや左右差を確認する視点が合いやすい傾向です。"
  },
  spiral_line: {
    key: "spiral_line",
    label: "ねじれライン",
    shortLabel: "ねじれ",
    internalModel: "らせんライン / Spiral Line",
    catch: "骨盤・肋骨・肩甲骨・首の左右差や回旋のクセが出やすい傾向",
    route: "骨盤・肋骨・肩甲骨・首の左右差や回旋",
    commonSigns: ["振り向きにくい", "片側だけつらい", "足を組む", "背中の片側が張る", "歩くと左右差"],
    description:
      "骨盤・肋骨・肩甲骨・首のねじれにサインが集まっています。片側だけに出るつらさや、振り向きにくさ、左右差のある張りと関係しやすいパターンです。",
    clinicPointBase:
      "つらい場所だけでなく、骨盤・肋骨・肩甲骨・首の回旋や左右差まで含めて確認する視点が合いやすい傾向です。"
  },
  deep_core_line: {
    key: "deep_core_line",
    label: "深部体幹ライン",
    shortLabel: "深部体幹",
    internalModel: "深層前面ライン / Deep Front Line",
    catch: "呼吸・股関節の奥・お腹まわり・体幹の支えにサインが出やすい傾向",
    route: "股関節の奥・お腹まわり・横隔膜・呼吸・体幹の支え",
    commonSigns: ["呼吸が浅い", "みぞおちが固い", "股関節の奥が詰まる", "立位が疲れる", "腰や首が力む"],
    description:
      "表面の張りだけでなく、呼吸・股関節の奥・お腹まわりなど、体を内側から支えるラインにサインが集まっています。姿勢保持や腰・首の力みと関係することがあります。",
    clinicPointBase:
      "つらい場所だけでなく、呼吸・股関節の奥・お腹まわり・横隔膜・体幹の支えまで含めて確認する視点が合いやすい傾向です。"
  },
  arm_line: {
    key: "arm_line",
    label: "腕肩ライン",
    shortLabel: "腕肩",
    internalModel: "腕前面ライン・腕後面ライン / Front & Back Arm Lines",
    catch: "手首・前腕・肩甲骨・首肩に、作業姿勢由来の負担がつながりやすい傾向",
    route: "手首・前腕・肘・肩甲骨・首肩",
    commonSigns: ["PC・スマホが多い", "前腕が疲れる", "肩甲骨が張る", "巻き肩", "腕を上げにくい"],
    description:
      "手首・前腕・肩甲骨・首肩のつながりにサインが集まっています。PCやスマホ、腕を前に出す作業が続くと、首肩だけでなく腕まわりの負担も関係しやすくなります。",
    clinicPointBase:
      "つらい場所だけでなく、手首・前腕・肘・肩甲骨・首肩まで含めて、腕から肩まわりのつながりを確認する視点が合いやすい傾向です。"
  }
};

export const complaintLabels: Record<MainComplaint, string> = {
  neck_shoulder: "首・肩",
  back: "背中",
  low_back: "腰",
  hip: "股関節",
  leg: "膝・脚",
  sole: "足裏",
  arm_wrist: "腕・手首"
};

const complaintPhrases: Record<MainComplaint, string> = {
  neck_shoulder: "首肩のこり・重さ",
  back: "背中の張り・重さ",
  low_back: "腰の重さ・張り",
  hip: "股関節まわりの詰まり・違和感",
  leg: "膝・脚の負担感",
  sole: "足裏の疲れ・突っ張り",
  arm_wrist: "腕・手首の疲れや首肩へのつながり"
};

const defaultLineByComplaint: Record<MainComplaint, FasciaLine> = {
  neck_shoulder: "arm_line",
  back: "back_line",
  low_back: "back_line",
  hip: "front_line",
  leg: "lateral_line",
  sole: "back_line",
  arm_wrist: "arm_line"
};

const complaintMultipliers: Record<MainComplaint, Record<FasciaLine, number>> = {
  neck_shoulder: {
    arm_line: 1.25,
    back_line: 1.15,
    front_line: 1.1,
    spiral_line: 1.1,
    lateral_line: 1,
    deep_core_line: 0.95
  },
  back: {
    spiral_line: 1.2,
    back_line: 1.15,
    deep_core_line: 1.05,
    lateral_line: 1.05,
    front_line: 1,
    arm_line: 0.95
  },
  low_back: {
    back_line: 1.2,
    front_line: 1.15,
    deep_core_line: 1.15,
    spiral_line: 1.15,
    lateral_line: 1.05,
    arm_line: 0.75
  },
  hip: {
    front_line: 1.25,
    deep_core_line: 1.15,
    lateral_line: 1.15,
    spiral_line: 1.05,
    back_line: 1,
    arm_line: 0.6
  },
  leg: {
    lateral_line: 1.2,
    back_line: 1.15,
    spiral_line: 1.1,
    front_line: 1.05,
    deep_core_line: 0.95,
    arm_line: 0.5
  },
  sole: {
    back_line: 1.3,
    lateral_line: 1.05,
    deep_core_line: 0.95,
    spiral_line: 0.9,
    front_line: 0.8,
    arm_line: 0.5
  },
  arm_wrist: {
    arm_line: 1.35,
    front_line: 1.05,
    spiral_line: 1,
    back_line: 0.9,
    lateral_line: 0.8,
    deep_core_line: 0.75
  }
};

export const questions: Question[] = [
  {
    id: "main_area",
    shortTitle: "気になる場所",
    intent: "complaint",
    title: "今いちばん気になる場所は？",
    subtitle: "ここで選んだ場所を、結果文の中心として扱います。",
    options: [
      { id: "neck_shoulder", label: "首・肩", complaint: "neck_shoulder", weights: {}, evidence: "首肩のつらさを中心に、腕・肩甲骨・背中・胸まわりとのつながりを確認する入口として扱います。" },
      { id: "back", label: "背中", complaint: "back", weights: {}, evidence: "背中の張りや重さを中心に、肋骨・肩甲骨・背面側のつながりを確認する入口として扱います。" },
      { id: "low_back", label: "腰", complaint: "low_back", weights: {}, evidence: "腰まわりのつらさを中心に、骨盤・太もも裏・股関節・体幹の支えとの関係を確認する入口として扱います。" },
      { id: "hip", label: "股関節", complaint: "hip", weights: {}, evidence: "股関節まわりの詰まりや違和感を中心に、前面・側面・深部体幹のつながりを確認する入口として扱います。" },
      { id: "leg", label: "膝・脚", complaint: "leg", weights: {}, evidence: "膝・脚の負担感を中心に、外もも・太もも裏・足元からのつながりを確認する入口として扱います。" },
      { id: "sole", label: "足裏", complaint: "sole", weights: {}, evidence: "足裏の疲れや突っ張りを中心に、ふくらはぎ・太もも裏・背面側のつながりを確認する入口として扱います。" },
      { id: "arm_wrist", label: "腕・手首", complaint: "arm_wrist", weights: {}, evidence: "腕・手首の疲れを中心に、前腕・肩甲骨・首肩へのつながりを確認する入口として扱います。" }
    ]
  },
  {
    id: "forward_bend",
    shortTitle: "前屈チェック",
    intent: "movement",
    title: "立ったまま前屈したとき、どこが一番突っ張りますか？",
    subtitle: "無理に深く曲げず、突っ張りを感じる場所だけ確認してください。",
    options: [
      { id: "sole_calf", label: "足裏・ふくらはぎ", weights: { back_line: 3 }, evidence: "足裏・ふくらはぎの突っ張りは、背面つっぱりラインのサインとして反映しています。" },
      { id: "hamstring", label: "太もも裏", weights: { back_line: 3 }, evidence: "太もも裏の突っ張りは、骨盤や腰まわりにつながる背面つっぱりラインのサインとして反映しています。" },
      { id: "waist", label: "腰", weights: { back_line: 2, spiral_line: 1 }, evidence: "前屈時の腰の突っ張りは、背面つっぱりラインを中心に、骨盤まわりの左右差も確認したい回答です。" },
      { id: "upper_back", label: "背中", weights: { back_line: 2, arm_line: 1 }, evidence: "前屈時の背中の張りは、背面つっぱりラインと肩甲骨まわりのつながりとして反映しています。" },
      { id: "neck_back", label: "首の後ろ", weights: { back_line: 2, arm_line: 1 }, evidence: "首の後ろの突っ張りは、背面つっぱりラインと腕肩ラインの両方に関係しやすいサインとして反映しています。" },
      { id: "not_much", label: "あまり突っ張らない", weights: {}, evidence: "前屈で強い突っ張りが少ないため、背面ライン以外のサインも合わせて見ています。" }
    ]
  },
  {
    id: "extension",
    shortTitle: "反る・上向きチェック",
    intent: "movement",
    title: "体を軽く反らす、または上を向いたとき、どこが詰まりやすいですか？",
    subtitle: "痛みが出るほど反らさず、軽く確認してください。",
    options: [
      { id: "front_hip", label: "股関節の前", weights: { front_line: 2, deep_core_line: 2 }, evidence: "股関節前面の詰まりは、前面つまりラインと深部体幹ラインのサインとして反映しています。" },
      { id: "epigastric", label: "お腹・みぞおち", weights: { deep_core_line: 3, front_line: 1 }, evidence: "お腹・みぞおちの固さは、呼吸や体幹の支えに関わる深部体幹ラインのサインとして反映しています。" },
      { id: "chest_front", label: "胸の前", weights: { front_line: 3 }, evidence: "胸の前のつまりは、前面つまりラインのサインとして反映しています。" },
      { id: "front_neck", label: "首の前", weights: { front_line: 2, deep_core_line: 1 }, evidence: "首の前側の張りは、前面つまりラインと深部体幹ラインのサインとして反映しています。" },
      { id: "low_back_jam", label: "腰が詰まる", weights: { front_line: 2, deep_core_line: 2 }, evidence: "反ったときの腰の詰まりは、股関節前面や体幹の支えも確認したいサインとして反映しています。" },
      { id: "none", label: "特にない", weights: {}, evidence: "反る・上を向く動きでは大きなつまりが少ない回答として扱います。" }
    ]
  },
  {
    id: "side_bend",
    shortTitle: "体側チェック",
    intent: "movement",
    title: "片手を上げて体を横に倒したとき、左右差や突っ張りはありますか？",
    subtitle: "安全な範囲で、左右の伸びやすさを比べてください。",
    options: [
      { id: "right_hard", label: "右側が伸びにくい", weights: { lateral_line: 3 }, evidence: "右側の伸びにくさは、側面かたよりラインの左右差サインとして反映しています。" },
      { id: "left_hard", label: "左側が伸びにくい", weights: { lateral_line: 3 }, evidence: "左側の伸びにくさは、側面かたよりラインの左右差サインとして反映しています。" },
      { id: "both", label: "両方つっぱる", weights: { lateral_line: 2 }, evidence: "両側の体側の突っ張りは、側面かたよりラインのサインとして反映しています。" },
      { id: "side_outer_thigh", label: "脇腹・外ももが突っ張る", weights: { lateral_line: 3 }, evidence: "脇腹・外ももの突っ張りは、外側のつながりを見る側面かたよりラインのサインとして反映しています。" },
      { id: "none", label: "特にない", weights: {}, evidence: "横に倒す動きでは大きな左右差が少ない回答として扱います。" }
    ]
  },
  {
    id: "rotation",
    shortTitle: "振り向きチェック",
    intent: "movement",
    title: "首や体を左右に振り向いたとき、差はありますか？",
    options: [
      { id: "right", label: "右に向きにくい", weights: { spiral_line: 3 }, evidence: "右に向きにくい回答は、骨盤・肋骨・首の回旋に関わるねじれラインのサインとして反映しています。" },
      { id: "left", label: "左に向きにくい", weights: { spiral_line: 3 }, evidence: "左に向きにくい回答は、骨盤・肋骨・首の回旋に関わるねじれラインのサインとして反映しています。" },
      { id: "both", label: "どちらも向きにくい", weights: { spiral_line: 2, back_line: 1 }, evidence: "両方の振り向きにくさは、ねじれラインに加えて背面側の硬さも確認したい回答です。" },
      { id: "trunk_follows", label: "背中や腰も一緒についてくる感じがある", weights: { spiral_line: 3, deep_core_line: 1 }, evidence: "背中や腰ごと動く感じは、ねじれラインと深部体幹ラインのサインとして反映しています。" },
      { id: "none", label: "特にない", weights: {}, evidence: "振り向きでは大きな左右差が少ない回答として扱います。" }
    ]
  },
  {
    id: "arm_raise",
    shortTitle: "腕上げチェック",
    intent: "movement",
    title: "両腕を上げたとき、どこに引っかかりを感じますか？",
    options: [
      { id: "front_shoulder", label: "肩の前", weights: { arm_line: 2, front_line: 2 }, evidence: "肩の前の引っかかりは、腕肩ラインと前面つまりラインのサインとして反映しています。" },
      { id: "side_rib", label: "脇・肋骨まわり", weights: { lateral_line: 2, arm_line: 1 }, evidence: "脇・肋骨まわりの引っかかりは、側面かたよりラインと腕肩ラインのサインとして反映しています。" },
      { id: "scapula", label: "肩甲骨まわり", weights: { arm_line: 3, back_line: 1 }, evidence: "肩甲骨まわりの張りは、腕肩ラインを中心に、背面側のつながりも確認したいサインとして反映しています。" },
      { id: "neck", label: "首", weights: { arm_line: 2, back_line: 1 }, evidence: "腕上げ時の首の負担は、腕肩ラインと背面つっぱりラインのサインとして反映しています。" },
      { id: "low_back_arch", label: "腰が反る", weights: { front_line: 2, deep_core_line: 2 }, evidence: "腕を上げると腰が反る回答は、前面つまりラインと深部体幹ラインのサインとして反映しています。" },
      { id: "none", label: "特にない", weights: {}, evidence: "腕上げでは大きな引っかかりが少ない回答として扱います。" }
    ]
  },
  {
    id: "breathing",
    shortTitle: "呼吸・体幹チェック",
    intent: "movement",
    title: "深呼吸したとき、どこが広がりにくい感じがありますか？",
    subtitle: "わからない場合は「わからない」で大丈夫です。",
    options: [
      { id: "chest", label: "胸が広がりにくい", weights: { front_line: 2, deep_core_line: 2 }, evidence: "胸の広がりにくさは、前面つまりラインと深部体幹ラインのサインとして反映しています。" },
      { id: "epigastric", label: "みぞおちが固い", weights: { deep_core_line: 3 }, evidence: "みぞおちの固さは、呼吸や体幹の支えに関わる深部体幹ラインのサインとして反映しています。" },
      { id: "flank", label: "脇腹が広がりにくい", weights: { lateral_line: 2, deep_core_line: 2 }, evidence: "脇腹の広がりにくさは、側面かたよりラインと深部体幹ラインのサインとして反映しています。" },
      { id: "back_tense", label: "腰や背中が力む", weights: { deep_core_line: 2, back_line: 1 }, evidence: "呼吸時に腰や背中が力む回答は、深部体幹ラインと背面つっぱりラインのサインとして反映しています。" },
      { id: "none", label: "特にない", weights: {}, evidence: "呼吸では大きな広がりにくさが少ない回答として扱います。" },
      { id: "unknown", label: "わからない", weights: {}, evidence: "呼吸の感覚がわかりにくい場合は、ほかの動作チェックを中心に見ています。" }
    ]
  },
  {
    id: "lifestyle",
    shortTitle: "姿勢・生活背景",
    intent: "lifestyle",
    title: "普段いちばん当てはまるものは？",
    subtitle: "今回はMVPのため、最も近いものを1つ選んでください。",
    options: [
      { id: "long_sitting", label: "長時間座る", weights: { back_line: 1, front_line: 1, deep_core_line: 1 }, evidence: "長時間座る背景は、骨盤・股関節・背面側に負担が残りやすい要素として反映しています。" },
      { id: "pc_phone", label: "PC・スマホが多い", weights: { arm_line: 2, front_line: 1 }, evidence: "PC・スマホが多い背景は、腕肩ラインと前面つまりラインに負担が乗りやすい要素として反映しています。" },
      { id: "standing", label: "立ちっぱなしが多い", weights: { lateral_line: 1, back_line: 1 }, evidence: "立ちっぱなしが多い背景は、側面かたよりラインや背面つっぱりラインに負担が残りやすい要素として反映しています。" },
      { id: "one_leg", label: "片足重心が多い", weights: { lateral_line: 2, spiral_line: 1 }, evidence: "片足重心は、側面かたよりラインとねじれラインの背景として反映しています。" },
      { id: "cross_leg", label: "足を組む", weights: { spiral_line: 2, lateral_line: 1 }, evidence: "足を組むクセは、骨盤・肋骨・首のねじれラインに関係しやすい背景として反映しています。" },
      { id: "sway_back", label: "反り腰と言われる", weights: { front_line: 2, deep_core_line: 1, back_line: 1 }, evidence: "反り腰傾向は、前面つまりライン・深部体幹ライン・背面つっぱりラインの背景として反映しています。" },
      { id: "rounded_back", label: "猫背になりやすい", weights: { arm_line: 1, front_line: 1, back_line: 1 }, evidence: "猫背傾向は、腕肩ライン・前面つまりライン・背面つっぱりラインの背景として反映しています。" },
      { id: "hands", label: "腕や手をよく使う", weights: { arm_line: 3 }, evidence: "腕や手をよく使う背景は、手首・前腕・肩甲骨・首肩の腕肩ラインに反映しています。" }
    ]
  },
  {
    id: "comes_back",
    shortTitle: "戻りやすさ",
    intent: "comeback",
    title: "痛い場所だけほぐしても戻りやすい感覚はありますか？",
    options: [
      { id: "often", label: "よくある", weights: {}, evidence: "戻りやすい感覚が強いため、つらい場所だけでなく周辺のつながりや生活背景まで見る説明材料として扱います。" },
      { id: "sometimes", label: "ときどきある", weights: {}, evidence: "戻りやすさが一部あるため、つらい場所だけでなく関連するラインも確認したい回答として扱います。" },
      { id: "rarely", label: "あまりない", weights: {}, evidence: "戻りやすさは強くないため、今出ている負担サインの整理を中心に扱います。" },
      { id: "unknown", label: "わからない", weights: {}, evidence: "戻りやすさが不明なため、動作チェックと生活背景を中心に結果を整理します。" }
    ]
  }
];

function getSelectedOption(questionId: string, answers: AnswerMap) {
  const question = questions.find((item) => item.id === questionId);
  if (!question) return null;
  const option = question.options.find((item) => item.id === answers[questionId]);
  if (!option) return null;
  return { question, option };
}

function getMainComplaint(answers: AnswerMap): MainComplaint {
  const selected = getSelectedOption("main_area", answers);
  return selected?.option.complaint ?? "low_back";
}

function buildTitle(complaint: MainComplaint, line: FasciaLine) {
  return `今回は、${complaintPhrases[complaint]}に関係しやすい\n「${lineDefinitions[line].label}」にサインが集まりました`;
}

function buildSummary(complaint: MainComplaint, line: FasciaLine) {
  const phrase = complaintPhrases[complaint];
  const def = lineDefinitions[line];

  const specific: Partial<Record<MainComplaint, Partial<Record<FasciaLine, string>>>> = {
    low_back: {
      back_line:
        "腰まわりのつらさは、腰そのものだけでなく、足元・ふくらはぎ・太もも裏・骨盤・背中側のつながりと関係していることがあります。",
      front_line:
        "腰の詰まりや反りやすさは、股関節の前・お腹・胸まわりのつまりと関係していることがあります。",
      deep_core_line:
        "腰の力みや支えにくさは、呼吸・股関節の奥・お腹まわりなど、体を内側から支えるラインと関係していることがあります。",
      spiral_line:
        "片側に出る腰の重さや動きにくさは、骨盤・肋骨・首のねじれや左右差と関係していることがあります。",
      lateral_line:
        "腰まわりの負担は、外もも・骨盤横・脇腹など、体の横側の偏りと関係していることがあります。"
    },
    neck_shoulder: {
      arm_line:
        "首肩のこりや重さは、首肩そのものだけでなく、手首・前腕・肩甲骨のつながりと関係していることがあります。",
      back_line:
        "首肩のつらさは、首の後ろだけでなく、背中・腰背部・太もも裏まで続く背面側の突っ張りと関係していることがあります。",
      front_line:
        "首肩のつらさは、胸の前・首の前側・股関節前面のつまりと関係していることがあります。",
      spiral_line:
        "片側に出る首肩のこりは、骨盤・肋骨・肩甲骨・首のねじれや左右差と関係していることがあります。"
    },
    hip: {
      front_line:
        "股関節まわりの詰まりは、股関節前面・お腹・胸まわりの前側のつまりと関係していることがあります。",
      deep_core_line:
        "股関節の奥の違和感は、呼吸・お腹まわり・体幹の支えと関係していることがあります。",
      lateral_line:
        "股関節まわりの負担は、外もも・骨盤横・脇腹など、体の横側の偏りと関係していることがあります。"
    },
    arm_wrist: {
      arm_line:
        "腕・手首の疲れは、手首・前腕だけでなく、肩甲骨・首肩のつながりと関係していることがあります。"
    },
    sole: {
      back_line:
        "足裏の疲れや突っ張りは、ふくらはぎ・太もも裏・骨盤・背中側へ続く背面つっぱりラインと関係していることがあります。"
    }
  };

  return specific[complaint]?.[line] ?? `${phrase}は、つらい場所そのものだけでなく、${def.route}のつながりと関係していることがあります。`;
}

function buildMovementSummary(answers: AnswerMap, primaryLine: FasciaLine) {
  const movementCards = questions
    .filter((question) => question.intent === "movement")
    .map((question) => {
      const option = question.options.find((item) => item.id === answers[question.id]);
      if (!option) return null;
      const weight = option.weights[primaryLine] ?? 0;
      return { question, option, weight };
    })
    .filter(Boolean) as Array<{ question: Question; option: NonNullable<ReturnType<typeof getSelectedOption>>["option"]; weight: number }>;

  const strongest = movementCards.sort((a, b) => b.weight - a.weight)[0];
  if (!strongest || strongest.weight <= 0) {
    return `今回の動作チェックでは、${lineDefinitions[primaryLine].label}に直接つながる強い反応だけでなく、複数の小さなサインを合わせて見ています。`;
  }

  return `今回の回答では、特に「${strongest.question.shortTitle}：${strongest.option.label}」が、${lineDefinitions[primaryLine].label}のサインとして強く反映されています。`;
}

function buildSecondarySummary(answers: AnswerMap, primaryLine: FasciaLine, secondaryLine: FasciaLine | null) {
  if (!secondaryLine || secondaryLine === primaryLine) return null;

  const related = questions
    .map((question) => {
      const option = question.options.find((item) => item.id === answers[question.id]);
      if (!option) return null;
      const weight = option.weights[secondaryLine] ?? 0;
      return weight > 0 ? `「${question.shortTitle}：${option.label}」` : null;
    })
    .filter(Boolean) as string[];

  const prefix = related.length ? `${related.slice(0, 2).join("、")} もあり、` : "また、";
  return `${prefix}${lineDefinitions[secondaryLine].label}も確認したいサブ傾向として見ています。`;
}

function buildLifestyleSummary(answers: AnswerMap) {
  const selected = getSelectedOption("lifestyle", answers);
  if (!selected) return null;
  return `生活背景としては「${selected.option.label}」が選ばれています。${selected.option.evidence ?? "この背景は、負担が戻りやすい要素として結果に反映しています。"}`;
}

function buildComebackSummary(answers: AnswerMap) {
  const selected = getSelectedOption("comes_back", answers);
  const id = selected?.option.id;
  if (id === "often") {
    return "痛い場所だけをほぐしても戻りやすい感覚がある場合、つらい場所だけでなく、周辺のつながりや生活動作で繰り返し負担がかかる部分も見ることが大切です。";
  }
  if (id === "sometimes") {
    return "ときどき戻りやすい感覚がある場合、つらい場所に加えて、関連しやすいラインも確認しておくと負担の出方を整理しやすくなります。";
  }
  if (id === "rarely") {
    return "戻りやすさが強くない場合でも、今出ている負担サインを早めに整理しておくことで、つらさの出方を理解しやすくなります。";
  }
  return "戻りやすさがはっきりしない場合は、今回の動作チェックと生活背景をもとに、まず負担が集まりやすいラインを整理しています。";
}

function buildClinicPoint(complaint: MainComplaint, primaryLine: FasciaLine, secondaryLine: FasciaLine | null) {
  const complaintLabel = complaintLabels[complaint];
  const primary = lineDefinitions[primaryLine];
  const secondary = secondaryLine ? lineDefinitions[secondaryLine] : null;
  const secondaryText = secondary ? ` また、${secondary.label}のサインもあるため、${secondary.route}も合わせて確認したいポイントです。` : "";

  return `施術では、${complaintLabel}そのものだけでなく、${primary.route}まで含めて、全身のつながりを確認する視点が合いやすい傾向です。${secondaryText}`;
}

function buildEvidenceCards(answers: AnswerMap): EvidenceCard[] {
  return questions
    .map((question) => {
      const option = question.options.find((item) => item.id === answers[question.id]);
      if (!option) return null;
      const relatedLines = Object.entries(option.weights)
        .filter(([, value]) => (value ?? 0) > 0)
        .map(([line]) => line as FasciaLine);

      return {
        questionId: question.id,
        title: question.shortTitle,
        answer: option.label,
        text: option.evidence ?? "この回答を、負担傾向を整理する材料として反映しています。",
        relatedLines
      };
    })
    .filter(Boolean) as EvidenceCard[];
}

export function scoreAnswers(answers: AnswerMap): ScoreResult {
  const mainComplaint = getMainComplaint(answers);
  const scores = Object.fromEntries(allLines.map((line) => [line, 0])) as Record<FasciaLine, number>;

  for (const question of questions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) continue;

    for (const [line, value] of Object.entries(option.weights) as Array<[FasciaLine, number]>) {
      scores[line] += value;
    }
  }

  const adjustedScores = Object.fromEntries(
    allLines.map((line) => [line, Number((scores[line] * complaintMultipliers[mainComplaint][line]).toFixed(2))])
  ) as Record<FasciaLine, number>;

  let ranked = [...allLines].sort((a, b) => adjustedScores[b] - adjustedScores[a]);
  if (adjustedScores[ranked[0]] <= 0) {
    ranked = [defaultLineByComplaint[mainComplaint], ...ranked.filter((line) => line !== defaultLineByComplaint[mainComplaint])];
  }

  const primaryLine = ranked[0];
  const rawSecondaryLine = ranked[1];
  const primaryScore = adjustedScores[primaryLine];
  const secondaryScore = adjustedScores[rawSecondaryLine];
  const secondaryLine = secondaryScore > 0 && secondaryScore / Math.max(primaryScore, 1) >= 0.55 ? rawSecondaryLine : null;
  const maxScore = Math.max(...Object.values(adjustedScores), 1);
  const percentages = Object.fromEntries(
    allLines.map((line) => [line, Math.round((adjustedScores[line] / maxScore) * 100)])
  ) as Record<FasciaLine, number>;

  return {
    scores,
    adjustedScores,
    percentages,
    primaryLine,
    secondaryLine,
    primaryScore,
    secondaryScore,
    mainComplaint,
    mainComplaintLabel: complaintLabels[mainComplaint],
    title: buildTitle(mainComplaint, primaryLine),
    summary: buildSummary(mainComplaint, primaryLine),
    movementSummary: buildMovementSummary(answers, primaryLine),
    secondarySummary: buildSecondarySummary(answers, primaryLine, secondaryLine),
    lifestyleSummary: buildLifestyleSummary(answers),
    comebackSummary: buildComebackSummary(answers),
    clinicPoint: buildClinicPoint(mainComplaint, primaryLine, secondaryLine),
    evidenceCards: buildEvidenceCards(answers)
  };
}

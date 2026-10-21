/* ============================================================================
 * KADO（架空・東京の建築設計事務所「角建築設計室」）の共有データ。
 *
 * **トップと問い合わせの2画面が、ここだけを見る。**
 * 書き出した画面（public/works/kado/）に出ている文字は、すべてこのファイルから
 * 再現できる。複製すると、実績の年や用途を1か所だけ直したときに画面ごとに
 * 違う値が出る——という形で静かに壊れる。
 *
 * 置いてよいのは次のものだけ:
 *  - React にもブラウザ API にも依存しない定数
 *  - 引数だけで結果が決まる純粋関数（SSR と CSR で必ず同じ値になる）
 * 「今日」を端末時計から取らない（この2画面に日付は出さない）。
 * ==========================================================================*/

/** 事務所の名乗り。ヘッダー・フッター・問い合わせで同じものを出す。 */
export const OFFICE = {
  ja: '角建築設計室',
  en: 'KADO ARCHITECTS',
  wordmark: 'KADO',
  place: 'TOKYO, JAPAN',
  tagline: '住宅・店舗・オフィスの設計とリノベーション。',
} as const;

/* ---------------------------------------------------------------------------
 * これまでの設計
 * ------------------------------------------------------------------------- */

export type Project = {
  /** 画面に出る通し番号（書き出しと同じ 01 / 02 / 03）。 */
  no: string;
  name: string;
  /** 欧文名。持たない実績もある（書き出しでも 02・03 には無い）。 */
  en?: string;
  /** 用途・工事種別。細いキャプションに ` / ` でつなぐ。 */
  tags: readonly string[];
  year: number;
  /** 一覧に出る1行。ヒーローの1件目には出さない。 */
  lead?: string;
  /** 写真の下に残る面（samples.css の .kado-shot-N）。 */
  tone: string;
  /** 事例の写真（public/samples/ からの拡張子なしの道）。 */
  photo: string;
};

/**
 * 並びは書き出した画面と同じ。
 * 01 はヒーローに全幅で敷き、02・03 は「Selected projects」に並べる。
 */
export const PROJECTS: readonly Project[] = [
  {
    no: '01',
    name: '三軒茶屋の中庭住宅',
    en: 'COURTYARD HOUSE',
    tags: ['RESIDENTIAL'],
    year: 2025,
    // ヒーローの1件目に説明は付かない（書き出しでも名前とキャプションだけ）。
    // 画面に出ない文を台帳に置かない。
    tone: 'kado-shot-1',
    photo: 'kado/shot-1',
  },
  {
    no: '02',
    name: '蔵前の書店',
    tags: ['RETAIL', 'RENOVATION'],
    year: 2025,
    lead: '既存の躯体を残し本棚と階段で店内の動線をつくりました。',
    tone: 'kado-shot-2',
    photo: 'kado/shot-2',
  },
  {
    no: '03',
    name: '清澄のアトリエ',
    tags: ['WORKSPACE', 'RENOVATION'],
    year: 2024,
    lead: '倉庫の高い天井と窓を生かし制作と打ち合わせの場を整えました。',
    tone: 'kado-shot-3',
    photo: 'kado/shot-3',
  },
];

/** `COURTYARD HOUSE / RESIDENTIAL / 2025` — 細いキャプションの1行。 */
export function projectCaption(p: Project): string {
  return [p.en, ...p.tags, String(p.year)].filter(Boolean).join(' / ');
}

/** `02 / RETAIL / RENOVATION / 2025` — 一覧側のキャプション（番号始まり）。 */
export function projectIndexCaption(p: Project): string {
  return [p.no, ...p.tags, String(p.year)].join(' / ');
}

/**
 * 年の幅（`これまでの設計 / 2024—2025`）。台帳から導く。
 * 書き出しの画面はここを「設計実績」と書いているが、実装では
 * 「これまでの設計」にした（`実績` は語彙統制 [1] の禁止語）。
 */
export function projectYearRange(): string {
  const years = PROJECTS.map((p) => p.year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min}—${max}`;
}

/* ---------------------------------------------------------------------------
 * 事務所について
 * ------------------------------------------------------------------------- */

export const ABOUT_HEADING: readonly string[] = [
  '住宅、店舗、オフィス。',
  '使い方から考える設計。',
];

export const ABOUT_BODY: readonly (readonly string[])[] = [
  [
    '角建築設計室は東京を拠点に新築と改修を手がける設計事務所です。',
    '敷地の条件や日々の動きを確かめながら間取りと素材を考えます。',
  ],
  [
    '光の入り方、家具の置き場所、手入れのしやすさ。',
    '図面だけではわかりにくいことも模型や材料を見ながら一緒に決めていきます。',
  ],
];

/* ---------------------------------------------------------------------------
 * ご相談から完成まで
 * ------------------------------------------------------------------------- */

export type Step = { no: string; title: string; lines: readonly string[] };

export const PROCESS: readonly Step[] = [
  {
    no: '01',
    title: 'ご相談',
    lines: [
      '場所、ご予算、完成までの時期を伺います。土地や物件を探している段階でもご相談いただけます。',
    ],
  },
  {
    no: '02',
    title: '設計・見積もり',
    lines: [
      '間取りや素材を検討し施工会社の見積もりを確認します。',
      '費用と内容を調整しながら設計を進めます。',
    ],
  },
  {
    no: '03',
    title: '工事・引き渡し',
    lines: [
      '工事中は現場で図面との照合や仕上がりを確認。完成後の使い方や手入れについてもご案内します。',
    ],
  },
];

/* ---------------------------------------------------------------------------
 * ご相談（問い合わせ）
 * ------------------------------------------------------------------------- */

/** トップの朱色の帯と、問い合わせページの導入で同じ文を使う。 */
export const CONTACT_LEAD: readonly string[] = [
  '新築、改修、店舗づくりのご相談を受け付けています。',
  '場所や時期が決まっていない場合もまずはお話をお聞かせください。',
];

/** 問い合わせページの左側（01 / INQUIRY）。 */
export const INQUIRY_NOTE: readonly string[] = [
  '建物の用途や場所、ご希望の時期などをお知らせください。',
  '内容を確認し担当者からメールでお返事します。',
];

/**
 * 入力欄は4つだけ。**建設予定地・物件所在地は任意**にしている。
 * 場所が決まる前の相談を、入力必須で止めないため。
 */
export const CONTACT_FIELDS = {
  name: { label: 'お名前', placeholder: '山田 太郎', required: true },
  email: { label: 'メールアドレス', placeholder: 'name@example.com', required: true },
  site: {
    label: '建設予定地・物件所在地（任意）',
    placeholder: '例：東京都世田谷区',
    required: false,
  },
  body: {
    label: 'ご相談内容',
    placeholder: '建物の用途や場所、ご希望の時期など\nわかる範囲でお書きください。',
    required: true,
  },
} as const;

export const PRIVACY_NOTE = 'ご記入いただいた情報はお問い合わせへの対応に使用します。';

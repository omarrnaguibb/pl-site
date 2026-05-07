/** Apply page — matches Wix /card section dropdowns */

const APPLY_SECTORS = [
  { value: "قطاع عام", label: "قطاع عام" },
  { value: "قطاع خاص", label: "قطاع خاص" },
];

const APPLY_AMOUNTS = [
  5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
].map((n) => ({ value: String(n), label: String(n) }));

const APPLY_PERIODS = [
  { value: "6 أشهر", label: "6 أشهر" },
  { value: "1 سنة", label: "1 سنة" },
  { value: "2 سنة", label: "2 سنة" },
  { value: "3 سنة", label: "3 سنة" },
  { value: "4 سنة", label: "4 سنة" },
  { value: "5 سنة", label: "5 سنة" },
  { value: "6 سنة", label: "6 سنة" },
  { value: "7 سنة", label: "7 سنة" },
];

/** Wix copy-of-card — اختر الفرع */
const BRANCH_LABELS = [
  "0446 - النصر",
  "0447 - الخليل",
  "0448 - النصيرات",
  "0449 - جنين",
  "0450 - بيت لحم",
  "0451 - الرئيسي - غزة",
  "0452 - خانيونس",
  "0452 - جباليا",
  "0454 - الرمال",
  "0455 - رفح",
  "0456 - أريحا",
  "0457 - نابلس",
  "0458 - رام الله",
  "0459 - ضاحية البريد",
  "0460 - دير بلح",
  "0461 - ترقوميا",
  "0462 - الإرسال",
  "0466 قلقيلية",
  "0467 - طولكرم",
  "0468 - طوباس",
  "0469 - سلفيت",
  "0470 - أبوديس",
  "0471 - الماصيون",
  "0472 - دورا",
  "0474 - قباطية",
  "0475 - البيرة",
  "0481 - رام الله - القصبة",
  "0483 - الرام",
  "0484 - نابلس - رفيديا",
];

const BRANCH_OPTIONS = BRANCH_LABELS.map((label) => ({ value: label, label }));

export { APPLY_SECTORS, APPLY_AMOUNTS, APPLY_PERIODS, BRANCH_OPTIONS };

import Fuse from "fuse.js";

import { fallbackAnswer, qaPairs } from "./knowledge";

export interface MatchResult {
  id: string | null;
  answer: string;
}

const answerById = new Map(qaPairs.map((p) => [p.id, p.answer]));

const keywordRules: Array<[RegExp, string]> = [
  [/\bpropeida\b|\bprepiq\b|post[- ]?utme|exam prep/i, "propeida"],
  [/\bredact\b|\bzk\b|zero[- ]knowledge|duress|\bmonad\b/i, "redact"],
  [/\bauditon\b|\bsoc ?2\b/i, "auditon"],
  [/\bergon? automot|\bcar configurat|\bergon?\b.*site|\bautomotive\b/i, "ergo"],
  [/\baletheia\b|research studio|growth research/i, "aletheia"],
  [/figma|mobile landing page/i, "mobilelp"],
  [
    /(how.*(contact|reach)|contact you|reach you|get in touch|your email|email address|\bhire\b|freelance|available for)/i,
    "contact",
  ],
  [
    /(what|which).*(study|studying|degree|major|school|university|course)|\bilorin\b|education|electrical engineering (student|degree)/i,
    "education",
  ],
  [/your (writing|blog)|the blog|your articles|your tutorials|where.*read/i, "writing"],
  [/\bai\b|artificial intelligence|\bllms?\b|chatgpt|coding assistants?/i, "ai"],
  [/(your|tech|technology) stack|skills|programming languages|frameworks/i, "skills"],
  [/web3|crypto|blockchain|solidity|\bdao\b|multisig|self[- ]custody|\bwallets?\b/i, "web3"],
  [/proud of|favorite project|favourite project|best (project|thing)/i, "proud"],
  [/beyond code|hobbies|free time|outside (of )?(code|work)|football|afrobeats/i, "beyond"],
  [/working on (now|currently|right now)|current(ly)? (focus|project)|up to these days/i, "focus"],
  [/why software|into code|got into programming|engineering and (code|programming)/i, "eee-to-code"],
];

const fuseItems = qaPairs.flatMap((p) =>
  p.questions.map((text) => ({ text, id: p.id }))
);

let fuseInstance: Fuse<{ text: string; id: string }> | null = null;

function getFuse() {
  if (!fuseInstance) {
    fuseInstance = new Fuse(fuseItems, {
      keys: ["text"],
      ignoreLocation: true,
      includeScore: true,
      threshold: 0.4,
      minMatchCharLength: 4,
    });
  }
  return fuseInstance;
}

export function matchQuery(raw: string): MatchResult {
  const q = raw.trim();
  if (!q) return { id: null, answer: fallbackAnswer };

  for (const [pattern, id] of keywordRules) {
    if (pattern.test(q)) {
      return { id, answer: answerById.get(id) ?? fallbackAnswer };
    }
  }

  const best = getFuse().search(q)[0];
  if (best && (best.score ?? 1) <= 0.42) {
    return { id: best.item.id, answer: answerById.get(best.item.id) ?? fallbackAnswer };
  }

  return { id: null, answer: fallbackAnswer };
}
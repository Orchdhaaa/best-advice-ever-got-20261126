import { writeFileSync, mkdirSync } from "node:fs";

// One sentence for make.fun's "The Best Advice I Ever Got".
// A mother tells her child to call their grandmother while she can
// still answer, because one day the phone just rings.
const ADVICE =
  "My mother said, 'Call your grandmother while she can still answer; one day the phone just rings.'";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the sentence meets the gate before writing it.
const chars = [...ADVICE].length;
if (chars < 1 || chars > 200 || ADVICE.trim().length === 0) {
  throw new Error(`advice is ${chars} characters, outside the 1-200 gate`);
}

// The brief demands exactly one sentence: a line that is not one
// sentence loses to any sentence about the best advice you ever
// received, so count the sentence terminators and refuse anything
// else. An em dash would also break the clean one-breath read the
// judge weighs, so refuse that too.
const terminators = ADVICE.match(/[.!?]+/g) ?? [];
const stripped = ADVICE.trim().replace(/['"”’]+$/, "");
if (terminators.length !== 1 || !/[.!?]$/.test(stripped)) {
  throw new Error(`advice has ${terminators.length} sentence terminators, must be exactly one sentence`);
}
if (ADVICE.includes("\u2014") || ADVICE.includes("\u2013")) {
  throw new Error("advice must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ADVICE, "utf8");

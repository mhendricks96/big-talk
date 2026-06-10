// One-time migration: split flat `tags` into `type`, `authorIdentity`, `tags`.
// Dry-run by default. Pass --write to actually modify files.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/books';
const WRITE = process.argv.includes('--write');

const TYPE_MAP = { fiction: 'Fiction', nonfiction: 'Non-Fiction' };
const IDENTITY_MAP = {
  'black author': 'Black Author',
  'female author': 'Woman Author',
  'woman author': 'Woman Author',
};
// Books with no Fiction/Non-Fiction tag get a manual default.
const TYPE_FALLBACK = { 'emotionally-focused-family-therapy.md': 'Non-Fiction' };

const arr = (items) => `[${items.map((t) => JSON.stringify(t)).join(', ')}]`;

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()) {
  const path = join(DIR, file);
  const src = readFileSync(path, 'utf8');
  const m = src.match(/^tags:\s*(\[[\s\S]*?\])\s*$/m);
  if (!m) { console.log(`SKIP  ${file} (no tags line)`); continue; }

  const tags = JSON.parse(m[1]);
  let type = null;
  const identity = [];
  const rest = [];

  for (const tag of tags) {
    const key = tag.toLowerCase();
    if (TYPE_MAP[key]) type = TYPE_MAP[key];
    else if (IDENTITY_MAP[key]) { if (!identity.includes(IDENTITY_MAP[key])) identity.push(IDENTITY_MAP[key]); }
    else rest.push(tag);
  }
  if (!type) type = TYPE_FALLBACK[file] || 'Non-Fiction';

  const block =
    `type: ${JSON.stringify(type)}\n` +
    `authorIdentity: ${arr(identity)}\n` +
    `tags: ${arr(rest)}`;
  const next = src.replace(/^tags:\s*\[[\s\S]*?\]\s*$/m, block);

  console.log(`\n=== ${file} ===`);
  console.log(`  - type:           ${type}`);
  console.log(`  - authorIdentity: ${arr(identity)}`);
  console.log(`  - tags:           ${arr(rest)}`);

  if (WRITE) { writeFileSync(path, next); }
}

console.log(WRITE ? '\nWROTE all files.' : '\n(dry-run — pass --write to apply)');

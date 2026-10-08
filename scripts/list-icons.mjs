#!/usr/bin/env node
/**
 * Prints the Material Symbols icon_names list for index.html.
 *
 * The icon font is subsetted (1.1 MB full -> ~26 KB subset), so index.html has
 * to name every glyph the app renders. Run this after adding or removing an
 * icon and paste the output into the icon_names query parameter.
 *
 *   npm run icons
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const names = new Set();

for (const file of walk(SRC)) {
  if (!/\.(jsx?|tsx?)$/.test(file)) continue;
  const code = readFileSync(file, 'utf8');

  // <span className="material-symbols-outlined ...">icon_name</span>
  for (const m of code.matchAll(/material-symbols-outlined[^>]*>\s*([a-z_]+)\s*</g)) {
    names.add(m[1]);
  }
  // Names held in data and passed through {item.icon}, {service.icon}, ...
  for (const m of code.matchAll(/\bicon:\s*'([a-z_]+)'/g)) names.add(m[1]);
  for (const m of code.matchAll(/\bicon=\{?"([a-z_]+)"\}?/g)) names.add(m[1]);
}

const sorted = [...names].sort();
console.log(`${sorted.length} icons\n`);
console.log(sorted.join(','));

#!/usr/bin/env node
// Usage: node .agents/skills/component-review/scripts/tw-css.mjs '<class>' ['<class>' ...]
// Run from the repository root. Prints the CSS Tailwind emits for each class with the moduix
// theme, so you can check media queries, selectors, and specificity of arbitrary variants.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const classes = process.argv.slice(2);
if (classes.length === 0) {
  console.error("usage: tw-css.mjs '<class>' ['<class>' ...]");
  process.exit(1);
}

const require = createRequire(resolve('packages/react-tailwind/package.json'));
const tailwind = await import(pathToFileURL(require.resolve('tailwindcss')).href);
const compile = tailwind.compile ?? tailwind.default.compile;
const themePath = resolve('packages/foundation/src/styles/style.css');

async function loadStylesheet(id, base) {
  const path = id.startsWith('.') ? resolve(base, id) : require.resolve(id);
  return { path, base: dirname(path), content: readFileSync(path, 'utf8') };
}

const compiler = await compile(
  `@import 'tailwindcss/theme'; @import '${themePath}'; @import 'tailwindcss/utilities';`,
  { base: process.cwd(), loadStylesheet },
);
const css = compiler.build(classes);
// Print only the rules for the requested classes, not the theme variables.
console.log(css.slice(css.indexOf('}', css.lastIndexOf(':root')) + 1).trim());
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = fileURLToPath(new URL('../', import.meta.url));

const COLOR_TOKENS = new Map([
  ['--moduix-background', 'background'],
  ['--moduix-foreground', 'foreground'],
  ['--moduix-card', 'card'],
  ['--moduix-card-foreground', 'card-foreground'],
  ['--moduix-popover', 'popover'],
  ['--moduix-popover-foreground', 'popover-foreground'],
  ['--moduix-primary', 'primary'],
  ['--moduix-primary-foreground', 'primary-foreground'],
  ['--moduix-secondary', 'secondary'],
  ['--moduix-secondary-foreground', 'secondary-foreground'],
  ['--moduix-muted', 'muted'],
  ['--moduix-muted-foreground', 'muted-foreground'],
  ['--moduix-accent', 'accent'],
  ['--moduix-accent-foreground', 'accent-foreground'],
  ['--moduix-destructive', 'destructive'],
  ['--moduix-destructive-foreground', 'destructive-foreground'],
  ['--moduix-success', 'success'],
  ['--moduix-success-foreground', 'success-foreground'],
  ['--moduix-warning', 'warning'],
  ['--moduix-warning-foreground', 'warning-foreground'],
  ['--moduix-info', 'info'],
  ['--moduix-info-foreground', 'info-foreground'],
  ['--moduix-border', 'border'],
  ['--moduix-input', 'input'],
  ['--moduix-ring', 'ring'],
  ['--moduix-overlay', 'overlay'],
  ['--moduix-chart-1', 'chart-1'],
  ['--moduix-chart-2', 'chart-2'],
  ['--moduix-chart-3', 'chart-3'],
  ['--moduix-chart-4', 'chart-4'],
  ['--moduix-chart-5', 'chart-5'],
  ['--moduix-chart-6', 'chart-6'],
  ['--moduix-chart-7', 'chart-7'],
  ['--moduix-chart-8', 'chart-8'],
  ['--moduix-sidebar', 'sidebar'],
  ['--moduix-sidebar-foreground', 'sidebar-foreground'],
  ['--moduix-sidebar-accent', 'sidebar-accent'],
  ['--moduix-sidebar-accent-foreground', 'sidebar-accent-foreground'],
  ['--moduix-sidebar-border', 'sidebar-border'],
  ['--moduix-sidebar-ring', 'sidebar-ring'],
]);

const SIZE_TOKENS = new Map([
  ['--moduix-size-xs', 'control-xs'],
  ['--moduix-size-sm', 'control-sm'],
  ['--moduix-size-md', 'control-md'],
  ['--moduix-size-lg', 'control-lg'],
  ['--moduix-size-xl', 'control-xl'],
]);

const RADIUS_TOKENS = new Map([
  ['--moduix-radius-none', 'rounded-none'],
  ['--moduix-radius-xs', 'rounded-xs'],
  ['--moduix-radius-sm', 'rounded-sm'],
  ['--moduix-radius-md', 'rounded-md'],
  ['--moduix-radius-lg', 'rounded-lg'],
  ['--moduix-radius-xl', 'rounded-xl'],
  ['--moduix-radius-full', 'rounded-full'],
]);

const SHADOW_TOKENS = new Map([
  ['--moduix-shadow-sm', 'shadow-sm'],
  ['--moduix-shadow-md', 'shadow-md'],
  ['--moduix-shadow-lg', 'shadow-lg'],
]);

const TEXT_SIZE_TOKENS = new Map([
  ['--moduix-text-2xs', 'text-2xs'],
  ['--moduix-text-xs', 'text-xs'],
  ['--moduix-text-sm', 'text-sm'],
  ['--moduix-text-md', 'text-base'],
  ['--moduix-text-lg', 'text-lg'],
  ['--moduix-text-xl', 'text-xl'],
  ['--moduix-text-2xl', 'text-2xl'],
  ['--moduix-text-3xl', 'text-3xl'],
]);

const FONT_WEIGHT_TOKENS = new Map([
  ['--moduix-weight-regular', 'font-normal'],
  ['--moduix-weight-medium', 'font-medium'],
  ['--moduix-weight-semibold', 'font-semibold'],
  ['--moduix-weight-bold', 'font-bold'],
  ['400', 'font-normal'],
  ['normal', 'font-normal'],
  ['500', 'font-medium'],
  ['600', 'font-semibold'],
  ['700', 'font-bold'],
  ['bold', 'font-bold'],
]);

const LINE_HEIGHT_TOKENS = new Map([
  ['--moduix-line-height-text-2xs', 'leading-[var(--moduix-line-height-text-2xs)]'],
  ['--moduix-line-height-text-xs', 'leading-4'],
  ['--moduix-line-height-text-sm', 'leading-5'],
  ['--moduix-line-height-text-md', 'leading-6'],
  ['--moduix-line-height-text-lg', 'leading-7'],
  ['--moduix-line-height-text-xl', 'leading-7'],
  ['--moduix-line-height-text-2xl', 'leading-8'],
  ['--moduix-line-height-text-3xl', 'leading-9'],
]);

const DURATION_TOKENS = new Map([
  ['--moduix-duration-fast', 'duration-fast'],
  ['--moduix-duration-normal', 'duration-normal'],
  ['--moduix-duration-slow', 'duration-slow'],
  ['--moduix-duration-slower', 'duration-slower'],
]);

const EASING_TOKENS = new Map([
  ['--moduix-ease-in', 'ease-in'],
  ['--moduix-ease-out', 'ease-out'],
  ['--moduix-ease-in-out', 'ease-in-out'],
  ['--moduix-ease-spring', 'ease-spring'],
]);

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Splits a CSS value by top-level whitespace (ignoring whitespace inside parentheses/quotes).
 */
function splitValueTokens(value) {
  const tokens = [];
  let current = '';
  let depth = 0;
  let quote = '';
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (quote) {
      current += ch;
      if (ch === quote && value[i - 1] !== '\\') quote = '';
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
    } else if (ch === '(') {
      depth++;
      current += ch;
    } else if (ch === ')') {
      depth = Math.max(0, depth - 1);
      current += ch;
    } else if (/\s/.test(ch) && depth === 0) {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

function splitTopLevelCommas(str) {
  const parts = [];
  let current = '';
  let depth = 0;
  let quote = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (quote) {
      current += ch;
      if (ch === quote && str[i - 1] !== '\\') quote = '';
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
    } else if (ch === '(' || ch === '[') {
      depth++;
      current += ch;
    } else if (ch === ')' || ch === ']') {
      depth = Math.max(0, depth - 1);
      current += ch;
    } else if (ch === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Parses CSS into an AST of `{ type: 'rule' | 'atrule' | 'decl', ... }` nodes.
 */
function parseCssBlock(input) {
  const nodes = [];
  let i = 0;
  const len = input.length;

  const skipWs = () => {
    while (i < len && /\s/.test(input[i])) i++;
  };

  while (i < len) {
    skipWs();
    if (i >= len) break;

    let buf = '';
    let paren = 0;
    let quote = '';
    let braceFound = false;

    while (i < len) {
      const ch = input[i];
      if (quote) {
        buf += ch;
        if (ch === quote && input[i - 1] !== '\\') quote = '';
        i++;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        buf += ch;
        i++;
        continue;
      }
      if (ch === '(') {
        paren++;
        buf += ch;
        i++;
        continue;
      }
      if (ch === ')') {
        paren = Math.max(0, paren - 1);
        buf += ch;
        i++;
        continue;
      }
      if (paren === 0 && ch === '{') {
        braceFound = true;
        i++;
        break;
      }
      if (paren === 0 && ch === ';') {
        i++;
        break;
      }
      buf += ch;
      i++;
    }

    const head = buf.trim();
    if (!head && !braceFound) continue;

    if (braceFound) {
      // Collect balanced block body
      let body = '';
      let depth = 1;
      let bQuote = '';
      while (i < len && depth > 0) {
        const ch = input[i];
        if (bQuote) {
          body += ch;
          if (ch === bQuote && input[i - 1] !== '\\') bQuote = '';
          i++;
          continue;
        }
        if (ch === '"' || ch === "'") {
          bQuote = ch;
          body += ch;
          i++;
          continue;
        }
        if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
        body += ch;
        i++;
      }
      if (head.startsWith('@')) {
        nodes.push({
          type: 'atrule',
          prelude: head,
          rawBody: body,
          children: /^@keyframes\b/i.test(head) ? [] : parseCssBlock(body),
        });
      } else {
        nodes.push({
          type: 'rule',
          selector: head,
          rawBody: body,
          children: parseCssBlock(body),
        });
      }
    } else if (head.startsWith('@')) {
      nodes.push({ type: 'atrule', prelude: head, rawBody: null, children: [] });
    } else {
      const colon = head.indexOf(':');
      if (colon > 0) {
        nodes.push({
          type: 'decl',
          prop: head.slice(0, colon).trim().toLowerCase(),
          value: head.slice(colon + 1).trim(),
        });
      }
    }
  }

  return nodes;
}

function toArbitrary(value) {
  return `[${value.trim().replace(/,\s+/g, ',').replace(/\s+/g, '_')}]`;
}

function unwrapVar(value) {
  const m = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
  return m ? m[1] : null;
}

function parseSpacingScale(value, { allowKeywords = false } = {}) {
  const v = value.trim();
  if (v === '0' || v === '0px' || v === '0rem') return '0';
  if (v === '1px') return 'px';
  if (allowKeywords) {
    if (v === 'auto') return 'auto';
    if (v === '100%') return 'full';
    if (v === 'fit-content') return 'fit';
    if (v === 'min-content') return 'min';
    if (v === 'max-content') return 'max';
    if (v === '100vw') return 'screen';
    if (v === '100vh') return 'screen';
    if (v === '100dvh') return 'dvh';
    if (v === '50%') return '1/2';
    if (v === '100svh') return 'svh';
  }
  const varName = unwrapVar(v);
  if (varName) {
    const modSpace = varName.match(/^--moduix-spacing-(\d+)(?:-5)?$/);
    if (modSpace) {
      return varName.endsWith('-5') ? `${modSpace[1]}.5` : modSpace[1];
    }
    if (SIZE_TOKENS.has(varName)) return SIZE_TOKENS.get(varName);
    return `(${varName})`;
  }
  const remMatch = v.match(/^(-?\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    const num = Number(remMatch[1]);
    const steps = num * 4;
    if (Math.abs(steps - Math.round(steps * 2) / 2) < 1e-6 && Math.abs(steps) <= 96) {
      return String(Math.round(steps * 2) / 2);
    }
    return toArbitrary(v);
  }
  const pxMatch = v.match(/^(-?\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const px = Number(pxMatch[1]);
    if (px === 0) return '0';
    if (px === 1) return 'px';
    if (px % 4 === 0 && Math.abs(px) <= 64) return String(px / 4);
    if (px === 2) return '0.5';
    if (px === 6) return '1.5';
    if (px === 10) return '2.5';
    if (px === 14) return '3.5';
    return toArbitrary(v);
  }
  return toArbitrary(v);
}

function spacingUtility(prefix, value, opts) {
  const v = value.trim();
  if (v.startsWith('-')) {
    const pos = parseSpacingScale(v.slice(1), opts);
    if (!pos.startsWith('[')) return `-${prefix}-${pos}`;
    return `${prefix}-${toArbitrary(v)}`;
  }
  const scale = parseSpacingScale(v, opts);
  return `${prefix}-${scale}`;
}

function parseColor(value, prefix) {
  const v = value.trim();
  if (v === 'transparent') return `${prefix}-transparent`;
  if (v === 'currentColor' || v === 'currentcolor') return `${prefix}-current`;
  if (v === 'inherit') return `${prefix}-inherit`;
  if (v === 'white' || v === '#fff' || v === '#ffffff') return `${prefix}-white`;
  if (v === 'black' || v === '#000' || v === '#000000') return `${prefix}-black`;

  const varName = unwrapVar(v);
  if (varName && COLOR_TOKENS.has(varName)) {
    return `${prefix}-${COLOR_TOKENS.get(varName)}`;
  }

  // color-mix(in oklch, var(--moduix-primary) 12%, transparent) -> bg-primary/12
  const mixMatch = v.match(
    /^color-mix\(\s*in\s+(?:oklch|srgb|hsl)\s*,\s*var\(\s*(--[\w-]+)\s*\)\s+(\d+(?:\.\d+)?)%\s*,\s*transparent\s*\)$/i,
  );
  if (mixMatch && COLOR_TOKENS.has(mixMatch[1])) {
    return `${prefix}-${COLOR_TOKENS.get(mixMatch[1])}/${mixMatch[2]}`;
  }

  if (
    /^#[0-9a-fA-F]{3,8}$/.test(v) ||
    /^(?:rgb|rgba|hsl|hsla|oklch|oklab|color-mix)\(/.test(v) ||
    /^var\(--[\w-]+\)$/.test(v)
  ) {
    if (varName) return `${prefix}-(${varName})`;
    return `${prefix}-${toArbitrary(v)}`;
  }
  return null;
}

function convertBoxSpacing(basePrefix, rawValue) {
  const parts = splitValueTokens(rawValue);
  if (parts.length === 1)
    return [spacingUtility(basePrefix, parts[0], { allowKeywords: basePrefix === 'm' })];
  if (parts.length === 2) {
    const [y, x] = parts;
    const allowKeywords = basePrefix === 'm';
    return [
      spacingUtility(`${basePrefix}y`, y, { allowKeywords }),
      spacingUtility(`${basePrefix}x`, x, { allowKeywords }),
    ];
  }
  if (parts.length === 3) {
    const [t, x, b] = parts;
    const allowKeywords = basePrefix === 'm';
    return [
      spacingUtility(`${basePrefix}t`, t, { allowKeywords }),
      spacingUtility(`${basePrefix}x`, x, { allowKeywords }),
      spacingUtility(`${basePrefix}b`, b, { allowKeywords }),
    ];
  }
  if (parts.length === 4) {
    const [t, r, b, l] = parts;
    const allowKeywords = basePrefix === 'm';
    return [
      spacingUtility(`${basePrefix}t`, t, { allowKeywords }),
      spacingUtility(`${basePrefix}r`, r, { allowKeywords }),
      spacingUtility(`${basePrefix}b`, b, { allowKeywords }),
      spacingUtility(`${basePrefix}l`, l, { allowKeywords }),
    ];
  }
  return null;
}

function convertBorder(side, rawValue) {
  const v = rawValue.trim();
  const prefix = side ? `border-${side}` : 'border';
  if (v === 'none' || v === '0') return [`${prefix}-0`];

  const parts = splitValueTokens(v);
  if (parts.length === 3) {
    const [width, style, color] = parts;
    const out = [];
    if (width === '1px' || width === 'var(--moduix-border-width-sm)') {
      out.push(prefix);
    } else if (width === '2px' || width === 'var(--moduix-border-width-md)') {
      out.push(`${prefix}-2`);
    } else if (width === '4px' || width === 'var(--moduix-border-width-lg)') {
      out.push(`${prefix}-4`);
    } else {
      out.push(`${prefix}-${toArbitrary(width)}`);
    }
    if (style !== 'solid') {
      if (['dashed', 'dotted', 'double', 'none'].includes(style)) out.push(`border-${style}`);
      else return null;
    }
    const colorClass = parseColor(color, 'border');
    if (!colorClass) return null;
    out.push(colorClass);
    return out;
  }
  return null;
}

function convertDeclaration(prop, rawValue) {
  const value = rawValue.trim();
  if (!value || value.includes('!important')) return null;

  // Compact `--moduix-*` sizing/layout overrides map directly to Tailwind v4 arbitrary properties.
  // Keep multi-color / color-mix theme recipes in residual CSS for readability.
  if (prop.startsWith('--')) {
    if (
      prop.startsWith('--moduix-') &&
      !value.includes('color-mix') &&
      !value.includes('\n') &&
      value.length <= 42
    ) {
      const compact = value.replace(/,\s+/g, ',').replace(/\s+/g, '_');
      return [`[${prop}:${compact}]`];
    }
    return null;
  }

  switch (prop) {
    case 'display': {
      const map = {
        flex: 'flex',
        'inline-flex': 'inline-flex',
        grid: 'grid',
        'inline-grid': 'inline-grid',
        block: 'block',
        'inline-block': 'inline-block',
        inline: 'inline',
        contents: 'contents',
        none: 'hidden',
        table: 'table',
        'flow-root': 'flow-root',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'position':
      return ['relative', 'absolute', 'fixed', 'sticky', 'static'].includes(value) ? [value] : null;
    case 'inset':
      return [spacingUtility('inset', value, { allowKeywords: true })];
    case 'inset-inline':
      return [spacingUtility('inset-x', value, { allowKeywords: true })];
    case 'inset-block':
      return [spacingUtility('inset-y', value, { allowKeywords: true })];
    case 'top':
    case 'inset-block-start':
      return [spacingUtility('top', value, { allowKeywords: true })];
    case 'right':
      return [spacingUtility('right', value, { allowKeywords: true })];
    case 'bottom':
    case 'inset-block-end':
      return [spacingUtility('bottom', value, { allowKeywords: true })];
    case 'left':
      return [spacingUtility('left', value, { allowKeywords: true })];
    case 'inset-inline-start':
      return [spacingUtility('start', value, { allowKeywords: true })];
    case 'inset-inline-end':
      return [spacingUtility('end', value, { allowKeywords: true })];
    case 'z-index':
      return /^-?\d+$|^auto$/.test(value)
        ? [value.startsWith('-') ? `-z-${value.slice(1)}` : `z-${value}`]
        : [`z-${toArbitrary(value)}`];
    case 'isolation':
      return value === 'isolate' ? ['isolate'] : value === 'auto' ? ['isolation-auto'] : null;

    case 'flex-direction': {
      const map = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        column: 'flex-col',
        'column-reverse': 'flex-col-reverse',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'flex-wrap': {
      const map = { wrap: 'flex-wrap', nowrap: 'flex-nowrap', 'wrap-reverse': 'flex-wrap-reverse' };
      return map[value] ? [map[value]] : null;
    }
    case 'flex': {
      if (value === '1' || value === '1 1 0%' || value === '1 1 0') return ['flex-1'];
      if (value === 'auto' || value === '1 1 auto') return ['flex-auto'];
      if (value === 'initial' || value === '0 1 auto') return ['flex-initial'];
      if (value === 'none' || value === '0 0 auto') return ['flex-none'];
      return [`flex-${toArbitrary(value)}`];
    }
    case 'flex-grow':
      return value === '1' ? ['grow'] : value === '0' ? ['grow-0'] : [`grow-${toArbitrary(value)}`];
    case 'flex-shrink':
      return value === '1'
        ? ['shrink']
        : value === '0'
          ? ['shrink-0']
          : [`shrink-${toArbitrary(value)}`];
    case 'align-items': {
      const map = {
        start: 'items-start',
        'flex-start': 'items-start',
        end: 'items-end',
        'flex-end': 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'align-self': {
      const map = {
        auto: 'self-auto',
        start: 'self-start',
        'flex-start': 'self-start',
        end: 'self-end',
        'flex-end': 'self-end',
        center: 'self-center',
        stretch: 'self-stretch',
        baseline: 'self-baseline',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'align-content': {
      const map = {
        start: 'content-start',
        'flex-start': 'content-start',
        end: 'content-end',
        'flex-end': 'content-end',
        center: 'content-center',
        'space-between': 'content-between',
        'space-around': 'content-around',
        'space-evenly': 'content-evenly',
        stretch: 'content-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'justify-content': {
      const map = {
        start: 'justify-start',
        'flex-start': 'justify-start',
        end: 'justify-end',
        'flex-end': 'justify-end',
        center: 'justify-center',
        'space-between': 'justify-between',
        'space-around': 'justify-around',
        'space-evenly': 'justify-evenly',
        stretch: 'justify-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'justify-items': {
      const map = {
        start: 'justify-items-start',
        end: 'justify-items-end',
        center: 'justify-items-center',
        stretch: 'justify-items-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'justify-self': {
      const map = {
        auto: 'justify-self-auto',
        start: 'justify-self-start',
        end: 'justify-self-end',
        center: 'justify-self-center',
        stretch: 'justify-self-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'place-items': {
      const map = {
        start: 'place-items-start',
        end: 'place-items-end',
        center: 'place-items-center',
        baseline: 'place-items-baseline',
        stretch: 'place-items-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'place-content': {
      const map = {
        start: 'place-content-start',
        end: 'place-content-end',
        center: 'place-content-center',
        'space-between': 'place-content-between',
        'space-around': 'place-content-around',
        'space-evenly': 'place-content-evenly',
        stretch: 'place-content-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'place-self': {
      const map = {
        auto: 'place-self-auto',
        start: 'place-self-start',
        end: 'place-self-end',
        center: 'place-self-center',
        stretch: 'place-self-stretch',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'gap': {
      const parts = splitValueTokens(value);
      if (parts.length === 1) return [spacingUtility('gap', parts[0])];
      if (parts.length === 2) {
        return [spacingUtility('gap-y', parts[0]), spacingUtility('gap-x', parts[1])];
      }
      return null;
    }
    case 'row-gap':
      return [spacingUtility('gap-y', value)];
    case 'column-gap':
      return [spacingUtility('gap-x', value)];

    case 'grid-template-columns': {
      const repeatMatch = value.match(/^repeat\(\s*(\d+)\s*,\s*minmax\(\s*0\s*,\s*1fr\s*\)\s*\)$/);
      if (repeatMatch) return [`grid-cols-${repeatMatch[1]}`];
      const simpleRepeat = value.match(/^repeat\(\s*(\d+)\s*,\s*1fr\s*\)$/);
      if (simpleRepeat) return [`grid-cols-${simpleRepeat[1]}`];
      if (value === 'none') return ['grid-cols-none'];
      return [`grid-cols-${toArbitrary(value)}`];
    }
    case 'grid-template-rows': {
      const repeatMatch = value.match(
        /^repeat\(\s*(\d+)\s*,\s*(?:minmax\(\s*0\s*,\s*1fr\s*\)|1fr)\s*\)$/,
      );
      if (repeatMatch) return [`grid-rows-${repeatMatch[1]}`];
      if (value === 'none') return ['grid-rows-none'];
      return [`grid-rows-${toArbitrary(value)}`];
    }
    case 'grid-auto-flow': {
      const map = {
        row: 'grid-flow-row',
        column: 'grid-flow-col',
        dense: 'grid-flow-dense',
        'row dense': 'grid-flow-row-dense',
        'column dense': 'grid-flow-col-dense',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'grid-column': {
      const spanMatch = value.match(/^span\s+(\d+)(?:\s*\/\s*span\s+\1)?$/);
      if (spanMatch) return [`col-span-${spanMatch[1]}`];
      if (value === '1 / -1') return ['col-span-full'];
      return [`col-${toArbitrary(value)}`];
    }
    case 'grid-row': {
      const spanMatch = value.match(/^span\s+(\d+)(?:\s*\/\s*span\s+\1)?$/);
      if (spanMatch) return [`row-span-${spanMatch[1]}`];
      if (value === '1 / -1') return ['row-span-full'];
      return [`row-${toArbitrary(value)}`];
    }
    case 'grid-area':
      return [`[grid-area:${value.replace(/\s+/g, '_')}]`];

    case 'width':
    case 'inline-size':
      return [spacingUtility('w', value, { allowKeywords: true })];
    case 'height':
    case 'block-size':
      return [spacingUtility('h', value, { allowKeywords: true })];
    case 'min-width':
    case 'min-inline-size':
      return [spacingUtility('min-w', value, { allowKeywords: true })];
    case 'max-width':
    case 'max-inline-size': {
      if (value === 'none') return ['max-w-none'];
      return [spacingUtility('max-w', value, { allowKeywords: true })];
    }
    case 'min-height':
    case 'min-block-size':
      return [spacingUtility('min-h', value, { allowKeywords: true })];
    case 'max-height':
    case 'max-block-size': {
      if (value === 'none') return ['max-h-none'];
      return [spacingUtility('max-h', value, { allowKeywords: true })];
    }
    case 'aspect-ratio': {
      if (value === 'auto') return ['aspect-auto'];
      if (value === '1' || value === '1 / 1' || value === '1/1') return ['aspect-square'];
      if (value === '16 / 9' || value === '16/9') return ['aspect-video'];
      return [`aspect-${value.replace(/\s*\/\s*/, '/')}`];
    }

    case 'padding':
      return convertBoxSpacing('p', value);
    case 'padding-inline':
      return [spacingUtility('px', value)];
    case 'padding-block':
      return [spacingUtility('py', value)];
    case 'padding-top':
    case 'padding-block-start':
      return [spacingUtility('pt', value)];
    case 'padding-right':
      return [spacingUtility('pr', value)];
    case 'padding-bottom':
    case 'padding-block-end':
      return [spacingUtility('pb', value)];
    case 'padding-left':
      return [spacingUtility('pl', value)];
    case 'padding-inline-start':
      return [spacingUtility('ps', value)];
    case 'padding-inline-end':
      return [spacingUtility('pe', value)];

    case 'margin':
      return convertBoxSpacing('m', value);
    case 'margin-inline':
      return [spacingUtility('mx', value, { allowKeywords: true })];
    case 'margin-block':
      return [spacingUtility('my', value, { allowKeywords: true })];
    case 'margin-top':
    case 'margin-block-start':
      return [spacingUtility('mt', value, { allowKeywords: true })];
    case 'margin-right':
      return [spacingUtility('mr', value, { allowKeywords: true })];
    case 'margin-bottom':
    case 'margin-block-end':
      return [spacingUtility('mb', value, { allowKeywords: true })];
    case 'margin-left':
      return [spacingUtility('ml', value, { allowKeywords: true })];
    case 'margin-inline-start':
      return [spacingUtility('ms', value, { allowKeywords: true })];
    case 'margin-inline-end':
      return [spacingUtility('me', value, { allowKeywords: true })];

    case 'font-family': {
      const varName = unwrapVar(value);
      if (varName === '--moduix-font-mono') return ['font-mono'];
      if (varName === '--moduix-font-sans') return ['font-sans'];
      return null;
    }
    case 'font-size': {
      const varName = unwrapVar(value);
      if (varName && TEXT_SIZE_TOKENS.has(varName)) return [TEXT_SIZE_TOKENS.get(varName)];
      if (value === '0.75rem') return ['text-xs'];
      if (value === '0.875rem') return ['text-sm'];
      if (value === '1rem') return ['text-base'];
      if (value === '1.125rem') return ['text-lg'];
      if (value === '1.25rem') return ['text-xl'];
      if (value === '1.5rem') return ['text-2xl'];
      return [`text-${toArbitrary(value)}`];
    }
    case 'font-weight': {
      const varName = unwrapVar(value);
      if (varName && FONT_WEIGHT_TOKENS.has(varName)) return [FONT_WEIGHT_TOKENS.get(varName)];
      if (FONT_WEIGHT_TOKENS.has(value)) return [FONT_WEIGHT_TOKENS.get(value)];
      return [`font-${toArbitrary(value)}`];
    }
    case 'font-style':
      return value === 'italic' ? ['italic'] : value === 'normal' ? ['not-italic'] : null;
    case 'font-variant-numeric':
      return value === 'tabular-nums' ? ['tabular-nums'] : null;
    case 'line-height': {
      const varName = unwrapVar(value);
      if (varName && LINE_HEIGHT_TOKENS.has(varName)) return [LINE_HEIGHT_TOKENS.get(varName)];
      if (value === '1') return ['leading-none'];
      if (value === '1.25') return ['leading-tight'];
      if (value === '1.375') return ['leading-snug'];
      if (value === '1.5') return ['leading-normal'];
      if (value === '1.625') return ['leading-relaxed'];
      if (value === '2') return ['leading-loose'];
      return [`leading-${toArbitrary(value)}`];
    }
    case 'letter-spacing':
      return [`tracking-${toArbitrary(value)}`];
    case 'text-align': {
      const map = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        start: 'text-start',
        end: 'text-end',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'text-transform': {
      const map = {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
        none: 'normal-case',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'text-decoration':
    case 'text-decoration-line': {
      const map = {
        underline: 'underline',
        'line-through': 'line-through',
        none: 'no-underline',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'text-overflow':
      return value === 'ellipsis' ? ['text-ellipsis'] : value === 'clip' ? ['text-clip'] : null;
    case 'white-space': {
      const map = {
        normal: 'whitespace-normal',
        nowrap: 'whitespace-nowrap',
        pre: 'whitespace-pre',
        'pre-line': 'whitespace-pre-line',
        'pre-wrap': 'whitespace-pre-wrap',
        'break-spaces': 'whitespace-break-spaces',
      };
      return map[value] ? [map[value]] : null;
    }
    case 'overflow-wrap':
      return value === 'anywhere'
        ? ['wrap-anywhere']
        : value === 'break-word'
          ? ['wrap-break-word']
          : null;
    case 'word-break':
      return value === 'break-all'
        ? ['break-all']
        : value === 'break-word'
          ? ['wrap-break-word']
          : value === 'keep-all'
            ? ['break-keep']
            : null;
    case 'vertical-align': {
      const map = {
        baseline: 'align-baseline',
        top: 'align-top',
        middle: 'align-middle',
        bottom: 'align-bottom',
        'text-top': 'align-text-top',
        'text-bottom': 'align-text-bottom',
      };
      return map[value] ? [map[value]] : null;
    }

    case 'color': {
      const cls = parseColor(value, 'text');
      return cls ? [cls] : null;
    }
    case 'background':
    case 'background-color': {
      const cls = parseColor(value, 'bg');
      if (cls) return [cls];
      if (prop === 'background' && /^(?:linear|radial|conic)-gradient\(/.test(value)) {
        return [`bg-${toArbitrary(value)}`];
      }
      return null;
    }
    case 'fill': {
      const cls = parseColor(value, 'fill');
      return cls ? [cls] : null;
    }
    case 'stroke': {
      const cls = parseColor(value, 'stroke');
      return cls ? [cls] : null;
    }
    case 'opacity': {
      const varName = unwrapVar(value);
      if (varName === '--moduix-opacity-disabled') return ['opacity-disabled'];
      if (varName === '--moduix-opacity-hover') return ['opacity-hover'];
      const num = Number(value);
      if (!Number.isNaN(num) && num >= 0 && num <= 1) {
        return [`opacity-${Math.round(num * 100)}`];
      }
      return null;
    }

    case 'border':
      return convertBorder('', value);
    case 'border-block':
      return convertBorder('y', value);
    case 'border-inline':
      return convertBorder('x', value);
    case 'border-top':
    case 'border-block-start':
      return convertBorder('t', value);
    case 'border-right':
      return convertBorder('r', value);
    case 'border-bottom':
    case 'border-block-end':
      return convertBorder('b', value);
    case 'border-left':
      return convertBorder('l', value);
    case 'border-inline-start':
      return convertBorder('s', value);
    case 'border-inline-end':
      return convertBorder('e', value);
    case 'border-color': {
      const cls = parseColor(value, 'border');
      return cls ? [cls] : null;
    }
    case 'border-style':
      return ['solid', 'dashed', 'dotted', 'double', 'none'].includes(value)
        ? [`border-${value}`]
        : null;
    case 'border-radius': {
      const varName = unwrapVar(value);
      if (varName && RADIUS_TOKENS.has(varName)) return [RADIUS_TOKENS.get(varName)];
      if (value === '0' || value === '0px') return ['rounded-none'];
      if (value === '9999px' || value === '50%') return ['rounded-full'];
      if (value === 'inherit') return ['rounded-[inherit]'];
      return [`rounded-${toArbitrary(value)}`];
    }
    case 'outline': {
      if (value === 'none' || value === '0') return ['outline-none'];
      const parts = splitValueTokens(value);
      if (parts.length === 3 && parts[1] === 'solid') {
        const out = [];
        if (parts[0] === '1px') out.push('outline');
        else if (parts[0] === '2px' || parts[0] === 'var(--moduix-focus-ring-width)') {
          out.push('outline-2');
        } else {
          out.push(`outline-${toArbitrary(parts[0])}`);
        }
        const colorCls = parseColor(parts[2], 'outline');
        if (!colorCls) return null;
        out.push(colorCls);
        return out;
      }
      return null;
    }
    case 'outline-color': {
      const cls = parseColor(value, 'outline');
      return cls ? [cls] : null;
    }
    case 'outline-offset': {
      const varName = unwrapVar(value);
      if (varName === '--moduix-focus-ring-offset') return ['outline-offset-focus'];
      const pxMatch = value.match(/^(-?\d+)px$/);
      if (pxMatch) {
        const n = Number(pxMatch[1]);
        return [n < 0 ? `-outline-offset-${Math.abs(n)}` : `outline-offset-${n}`];
      }
      return [`outline-offset-${toArbitrary(value)}`];
    }
    case 'text-underline-offset': {
      if (value === 'auto') return ['underline-offset-auto'];
      const pxMatch = value.match(/^(\d+)px$/);
      if (pxMatch) return [`underline-offset-${pxMatch[1]}`];
      return [`underline-offset-${toArbitrary(value)}`];
    }
    case 'text-wrap':
      return ['wrap', 'nowrap', 'balance', 'pretty'].includes(value) ? [`text-${value}`] : null;
    case 'font':
      return value === 'inherit' ? ['[font:inherit]'] : null;
    case 'overscroll-behavior':
      return ['auto', 'contain', 'none'].includes(value) ? [`overscroll-${value}`] : null;
    case 'scroll-behavior':
      return ['auto', 'smooth'].includes(value) ? [`scroll-${value}`] : null;
    case 'translate': {
      if (value === '-50% 0' || value === '-50%') return ['-translate-x-1/2'];
      if (value === '0 -50%') return ['-translate-y-1/2'];
      if (value === '-50% -50%') return ['-translate-x-1/2', '-translate-y-1/2'];
      return null;
    }

    case 'box-shadow': {
      if (value === 'none') return ['shadow-none'];
      const varName = unwrapVar(value);
      if (varName && SHADOW_TOKENS.has(varName)) return [SHADOW_TOKENS.get(varName)];
      return [`shadow-${toArbitrary(value)}`];
    }
    case 'overflow':
      return ['auto', 'hidden', 'clip', 'visible', 'scroll'].includes(value)
        ? [`overflow-${value}`]
        : null;
    case 'overflow-x':
      return ['auto', 'hidden', 'clip', 'visible', 'scroll'].includes(value)
        ? [`overflow-x-${value}`]
        : null;
    case 'overflow-y':
      return ['auto', 'hidden', 'clip', 'visible', 'scroll'].includes(value)
        ? [`overflow-y-${value}`]
        : null;
    case 'object-fit':
      return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value)
        ? [`object-${value}`]
        : null;
    case 'object-position': {
      const map = {
        center: 'object-center',
        top: 'object-top',
        bottom: 'object-bottom',
        left: 'object-left',
        right: 'object-right',
      };
      return map[value] ? [map[value]] : [`object-${toArbitrary(value)}`];
    }
    case 'cursor':
      return [
        'auto',
        'default',
        'pointer',
        'wait',
        'text',
        'move',
        'help',
        'not-allowed',
        'none',
        'grab',
        'grabbing',
        'zoom-in',
        'zoom-out',
      ].includes(value)
        ? [`cursor-${value}`]
        : null;
    case 'pointer-events':
      return value === 'none'
        ? ['pointer-events-none']
        : value === 'auto'
          ? ['pointer-events-auto']
          : null;
    case 'user-select':
      return ['none', 'text', 'all', 'auto'].includes(value) ? [`select-${value}`] : null;
    case 'visibility':
      return value === 'visible'
        ? ['visible']
        : value === 'hidden'
          ? ['invisible']
          : value === 'collapse'
            ? ['collapse']
            : null;
    case 'box-sizing':
      return value === 'border-box'
        ? ['box-border']
        : value === 'content-box'
          ? ['box-content']
          : null;
    case 'resize':
      return value === 'none'
        ? ['resize-none']
        : value === 'both'
          ? ['resize']
          : value === 'vertical'
            ? ['resize-y']
            : value === 'horizontal'
              ? ['resize-x']
              : null;
    case 'list-style':
    case 'list-style-type':
      return value === 'none'
        ? ['list-none']
        : value === 'disc'
          ? ['list-disc']
          : value === 'decimal'
            ? ['list-decimal']
            : null;
    case 'appearance':
      return value === 'none' ? ['appearance-none'] : value === 'auto' ? ['appearance-auto'] : null;
    case 'transform': {
      if (value === 'none') return ['transform-none'];
      if (value === 'scaleX(-1)') return ['-scale-x-100'];
      if (value === 'scaleY(-1)') return ['-scale-y-100'];
      const scaleMatch = value.match(/^scale\(([\d.]+)\)$/);
      if (scaleMatch) {
        const pct = Math.round(Number(scaleMatch[1]) * 100);
        return [`scale-${pct}`];
      }
      const rotMatch = value.match(/^rotate\((-?\d+)deg\)$/);
      if (rotMatch) {
        const deg = Number(rotMatch[1]);
        return [deg < 0 ? `-rotate-${Math.abs(deg)}` : `rotate-${deg}`];
      }
      return [`[transform:${value.replace(/\s+/g, '_')}]`];
    }
    case 'transition': {
      if (value === 'none') return ['transition-none'];
      const parts = splitValueTokens(value);
      if (parts.length >= 2 && parts.length <= 3) {
        const [target, dur, ease] = parts;
        const propMap = {
          all: 'transition-all',
          color: 'transition-colors',
          'background-color': 'transition-colors',
          'border-color': 'transition-colors',
          opacity: 'transition-opacity',
          transform: 'transition-transform',
          'box-shadow': 'transition-shadow',
        };
        if (propMap[target]) {
          const out = [propMap[target]];
          const durVar = unwrapVar(dur);
          if (durVar && DURATION_TOKENS.has(durVar)) out.push(DURATION_TOKENS.get(durVar));
          else if (/^\d+ms$/.test(dur)) out.push(`duration-${dur.slice(0, -2)}`);
          else if (dur === 'var(--moduix-transition-default)')
            out.push('duration-fast', 'ease-out');
          else return null;
          if (ease) {
            const easeVar = unwrapVar(ease);
            if (easeVar && EASING_TOKENS.has(easeVar)) out.push(EASING_TOKENS.get(easeVar));
            else if (['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'].includes(ease)) {
              out.push(ease === 'ease' ? 'ease-out' : ease);
            } else {
              return null;
            }
          }
          return out;
        }
      }
      return null;
    }
    default:
      return null;
  }
}

/**
 * Normalizes a pseudo / attribute / child selector relative to a class into a Tailwind variant prefix.
 * Returns e.g. 'hover:', 'data-[current]:', '[&>svg]:', or null if not cleanly representable.
 */
function toVariantPrefix(subSelector) {
  const s = subSelector.trim();
  if (!s) return '';

  // Descendant check must happen before trimming strips the leading combinator space.
  const descMatch = subSelector.match(/^\s+([a-zA-Z][\w-]*|\[[\w-]+(?:=['"]?[\w-]+['"]?)?\])\s*$/);
  if (descMatch) {
    const clean = descMatch[1].replace(/['"]/g, '');
    return `[&_${clean}]:`;
  }

  if (s === ':hover') return 'hover:';
  if (s === ':focus-visible') return 'focus-visible:';
  if (s === ':focus') return 'focus:';
  if (s === ':active') return 'active:';
  if (s === ':disabled') return 'disabled:';
  if (s === ':dir(rtl)') return 'rtl:';
  if (s === ':dir(ltr)') return 'ltr:';
  if (s === ':first-child') return 'first:';
  if (s === ':last-child') return 'last:';
  if (s === '::placeholder') return 'placeholder:';

  // [data-attr] or [data-attr='val'] or [data-attr="val"]
  const dataAttr = s.match(/^\[data-([\w-]+)(?:=['"]?([\w-]+)['"]?)?\]$/);
  if (dataAttr) {
    return dataAttr[2] !== undefined
      ? `data-[${dataAttr[1]}=${dataAttr[2]}]:`
      : `data-[${dataAttr[1]}]:`;
  }

  // [aria-attr='val']
  const ariaAttr = s.match(/^\[aria-([\w-]+)(?:=['"]?([\w-]+)['"]?)?\]$/);
  if (ariaAttr) {
    return ariaAttr[2] !== undefined
      ? `aria-[${ariaAttr[1]}=${ariaAttr[2]}]:`
      : `aria-[${ariaAttr[1]}]:`;
  }

  // Direct child: > svg, > p, > [data-preview-meta]
  const childMatch = s.match(/^>\s*([a-zA-Z][\w-]*|\[[\w-]+(?:=['"]?[\w-]+['"]?)?\])$/);
  if (childMatch) {
    const clean = childMatch[1].replace(/['"]/g, '');
    return `[&>${clean}]:`;
  }

  return null;
}

/**
 * Parses a top-level selector into `{ className, variant }` if rooted in a single class selector.
 */
function parseClassSelector(selector) {
  const trimmed = selector.trim();
  const match = trimmed.match(/^\.([a-zA-Z_][\w-]*)([\s\S]*)$/);
  if (!match) return null;
  const [, className, rest] = match;
  if (!rest) return { className, variant: '' };
  // Reject chained class selectors like `.a.b` or descendant class selectors like `.a .b`
  if (rest.includes('.')) return null;
  const variant = toVariantPrefix(rest);
  if (variant === null) return null;
  return { className, variant };
}

function parseMediaVariant(prelude) {
  const normalized = prelude.replace(/\s+/g, ' ').trim();
  if (normalized === '@media (min-width: 40rem)' || normalized === '@media (min-width: 640px)') {
    return 'sm:';
  }
  if (normalized === '@media (min-width: 48rem)' || normalized === '@media (min-width: 768px)') {
    return 'md:';
  }
  if (normalized === '@media (min-width: 64rem)' || normalized === '@media (min-width: 1024px)') {
    return 'lg:';
  }
  if (normalized === '@media (min-width: 80rem)' || normalized === '@media (min-width: 1280px)') {
    return 'xl:';
  }
  if (normalized === '@media (hover: hover)') {
    return '@hover';
  }
  return null;
}

function serializeRule(selector, decls) {
  const body = decls.map((d) => `  ${d.prop}: ${d.value};`).join('\n');
  return `${selector} {\n${body}\n}`;
}

function addUtility(classMap, className, prefix, utility) {
  let list = classMap.get(className);
  if (!list) {
    list = [];
    classMap.set(className, list);
  }
  const full = prefix ? `${prefix}${utility}` : utility;
  if (!list.includes(full)) list.push(full);
}

/**
 * Converts a CSS Module file into:
 * - `classMap`: Map<className, string> of Tailwind utility strings
 * - `residualCss`: string containing only rules/declarations that could not be converted cleanly
 * - `residualClasses`: Set<className> of classes still referenced in `residualCss`
 */
export function convertCssModuleToTailwind(cssSource) {
  const ast = parseCssBlock(stripComments(cssSource));
  const classMap = new Map();
  const residualBlocks = [];
  const residualClasses = new Set();

  const recordResidualClasses = (rawText) => {
    for (const m of rawText.matchAll(/\.([a-zA-Z_][\w-]*)/g)) {
      residualClasses.add(m[1]);
    }
  };

  const processRuleNode = (node, mediaPrefix = '') => {
    const selectors = splitTopLevelCommas(node.selector);
    const parsedSelectors = selectors.map(parseClassSelector);
    if (parsedSelectors.some((item) => item === null)) {
      const raw = `${node.selector} {\n${node.rawBody.trim()}\n}`;
      recordResidualClasses(node.selector);
      residualBlocks.push(mediaPrefix ? `@media /* preserved */ {\n${raw}\n}` : raw);
      return;
    }

    const residualDecls = [];
    const residualNested = [];

    for (const child of node.children) {
      if (child.type === 'decl') {
        const converted = convertDeclaration(child.prop, child.value);
        if (converted) {
          for (const { className, variant } of parsedSelectors) {
            let prefix = `${mediaPrefix}${variant}`;
            if (mediaPrefix === '@hover') {
              prefix = variant;
            }
            for (const utility of converted) {
              addUtility(classMap, className, prefix, utility);
            }
          }
        } else {
          residualDecls.push(child);
        }
      } else if (child.type === 'rule') {
        const nestedParts = splitTopLevelCommas(child.selector);
        const variants = nestedParts.map((part) => {
          if (part.startsWith('&')) return toVariantPrefix(part.slice(1));
          if (part.startsWith('>')) return toVariantPrefix(part);
          if (/^(?:[a-zA-Z][\w-]*|\[[\w-]+(?:=['"]?[\w-]+['"]?)?\])$/.test(part)) {
            return toVariantPrefix(` ${part}`);
          }
          return null;
        });
        const nestedDecls = child.children.filter((c) => c.type === 'decl');
        const hasGrandchildren = child.children.some((c) => c.type !== 'decl');
        if (variants.some((v) => v === null) || hasGrandchildren) {
          residualNested.push(`${child.selector} {\n${child.rawBody.trim()}\n}`);
        } else {
          const leftoverNested = [];
          for (const decl of nestedDecls) {
            const converted = convertDeclaration(decl.prop, decl.value);
            if (converted) {
              for (const { className, variant: outerVariant } of parsedSelectors) {
                for (const innerVariant of variants) {
                  const basePrefix = mediaPrefix === '@hover' ? '' : mediaPrefix;
                  const fullPrefix = `${basePrefix}${outerVariant}${innerVariant}`;
                  for (const utility of converted) {
                    addUtility(classMap, className, fullPrefix, utility);
                  }
                }
              }
            } else {
              leftoverNested.push(decl);
            }
          }
          if (leftoverNested.length > 0) {
            residualNested.push(serializeRule(child.selector, leftoverNested));
          }
        }
      } else {
        residualNested.push(
          child.rawBody !== null
            ? `${child.prelude} {\n${child.rawBody.trim()}\n}`
            : `${child.prelude};`,
        );
      }
    }

    if (residualDecls.length > 0 || residualNested.length > 0) {
      for (const { className } of parsedSelectors) residualClasses.add(className);
      const parts = [
        ...residualDecls.map((d) => `  ${d.prop}: ${d.value};`),
        ...residualNested.map((block) =>
          block
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n'),
        ),
      ];
      residualBlocks.push(`${node.selector} {\n${parts.join('\n')}\n}`);
    }
  };

  for (const node of ast) {
    if (node.type === 'rule') {
      processRuleNode(node);
    } else if (node.type === 'atrule') {
      const mediaVariant = parseMediaVariant(node.prelude);
      if (
        mediaVariant &&
        node.children.length > 0 &&
        node.children.every((c) => c.type === 'rule')
      ) {
        const beforeCount = residualBlocks.length;
        for (const child of node.children) {
          if (mediaVariant === '@hover') {
            // Only unwrap @media (hover: hover) if every selector is a :hover rule
            const allHover = splitTopLevelCommas(child.selector).every((s) =>
              s.trim().endsWith(':hover'),
            );
            if (!allHover) {
              recordResidualClasses(child.selector);
              residualBlocks.push(
                `${node.prelude} {\n  ${child.selector} {\n${child.rawBody.trim()}\n  }\n}`,
              );
              continue;
            }
          }
          processRuleNode(child, mediaVariant);
        }
        // If any residual block was added inside a @media block, wrap it back in its @media prelude
        if (residualBlocks.length > beforeCount) {
          const added = residualBlocks.splice(beforeCount);
          const unwrapped = added.map((b) =>
            b.startsWith('@media /* preserved */')
              ? b.replace(/^@media \/\* preserved \*\/ \{\n|\n\}$/g, '')
              : b,
          );
          const indented = unwrapped
            .join('\n\n')
            .split('\n')
            .map((l) => `  ${l}`)
            .join('\n');
          residualBlocks.push(`${node.prelude} {\n${indented}\n}`);
        }
      } else {
        if (!/^@keyframes\b/i.test(node.prelude)) {
          recordResidualClasses(node.rawBody ?? '');
        }
        residualBlocks.push(
          node.rawBody !== null
            ? `${node.prelude} {\n${node.rawBody.trim()}\n}`
            : `${node.prelude};`,
        );
      }
    }
  }

  const classes = new Map();
  for (const [key, list] of classMap) {
    classes.set(key, list.join(' '));
  }

  return {
    classes,
    residualCss: residualBlocks.join('\n\n'),
    residualClasses,
  };
}

function resolveCssImport(specifier, importerFile) {
  return specifier.startsWith('@/')
    ? path.join(websiteRoot, 'src', specifier.slice(2))
    : path.resolve(path.dirname(importerFile), specifier);
}

/**
 * Rewrites `@moduix/<framework>/...` to `@moduix/<framework>-tailwind/...`,
 * converts imported `.module.css` rules to Tailwind v4 utility classes,
 * replaces `styles.<key>` usages across React, Solid, Vue, and Svelte source files,
 * and returns `{ code, residualFiles }`.
 */
export function transformSourceToTailwind(
  source,
  importerFile,
  framework,
  addDependency,
  { rewriteImportPath = true } = {},
) {
  let code = source.replaceAll(`'@moduix/${framework}/`, `'@moduix/${framework}-tailwind/`);
  const residualFiles = [];
  const cssImportRegex = /^([ \t]*)import\s+(\w+)\s+from\s+'([^']+\.module\.css)';\n?/gm;
  const imports = [...code.matchAll(cssImportRegex)];

  for (const match of imports) {
    const [fullMatch, indent, ident, specifier] = match;
    const cssFile = resolveCssImport(specifier, importerFile);
    if (!existsSync(cssFile)) continue;
    addDependency?.(cssFile);

    const cssSource = readFileSync(cssFile, 'utf8');
    const { classes, residualCss, residualClasses } = convertCssModuleToTailwind(cssSource);
    const basename = path.basename(cssFile);

    // Replace usages of `${ident}.<key>`
    const identEsc = ident.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const isVue = importerFile.endsWith('.vue');

    const getReplacement = (key) => {
      const tw = classes.get(key) ?? '';
      const hasResidual = residualClasses.has(key);
      return { tw, hasResidual };
    };

    // Single-pass replacement so residual `${ident}.${key}` expressions are never re-matched.
    const patterns = [
      `\\b(className|class)=\\{${identEsc}\\.([a-zA-Z_]\\w*)\\}`,
      ...(isVue ? [`:class="${identEsc}\\.([a-zA-Z_]\\w*)"`] : []),
      `\\$\\{${identEsc}\\.([a-zA-Z_]\\w*)\\}`,
      `\\b${identEsc}\\.([a-zA-Z_]\\w*)\\b`,
    ];
    const combinedRegex = new RegExp(patterns.join('|'), 'g');

    code = code.replace(combinedRegex, (...args) => {
      const whole = args[0];
      if (args[1] !== undefined) {
        // 1. JSX / Svelte direct attribute: className={styles.foo} or class={styles.foo}
        const attr = args[1];
        const key = args[2];
        const { tw, hasResidual } = getReplacement(key);
        if (!tw && !hasResidual) return whole;
        if (hasResidual && tw) return `${attr}={\`\${${ident}.${key}} ${tw}\`}`;
        if (hasResidual) return whole;
        return `${attr}="${tw}"`;
      }
      if (isVue && args[3] !== undefined) {
        // 2. Vue direct binding: :class="styles.foo"
        const key = args[3];
        const { tw, hasResidual } = getReplacement(key);
        if (!tw && !hasResidual) return whole;
        if (hasResidual && tw) return `:class="[${ident}.${key}, '${tw}']"`;
        if (hasResidual) return whole;
        return `class="${tw}"`;
      }
      const tplKey = isVue ? args[4] : args[3];
      if (tplKey !== undefined) {
        // 3. Template literal interpolation: `${styles.foo}`
        const { tw, hasResidual } = getReplacement(tplKey);
        if (!tw && !hasResidual) return whole;
        if (hasResidual && tw) return `${whole} ${tw}`;
        if (hasResidual) return whole;
        return tw;
      }
      // 4. Remaining expression positions: ternaries, arrays, clsx(...), object values
      const exprKey = isVue ? args[5] : args[4];
      const { tw, hasResidual } = getReplacement(exprKey);
      if (!tw && !hasResidual) return whole;
      if (hasResidual && tw) return `\`\${${ident}.${exprKey}} ${tw}\``;
      if (hasResidual) return whole;
      return `'${tw}'`;
    });

    // Check if `ident` is still referenced anywhere after the import
    const withoutImport = code.replace(fullMatch, '');
    const stillUsed = new RegExp(`\\b${identEsc}\\b`).test(withoutImport);
    const nextSpecifier = rewriteImportPath ? `./${basename}` : specifier;

    if (stillUsed && residualCss) {
      code = code.replace(fullMatch, `${indent}import ${ident} from '${nextSpecifier}';\n`);
      residualFiles.push({ name: basename, code: residualCss, sourcePath: cssFile });
    } else if (stillUsed) {
      // Fallback: an unknown class key was referenced in source; keep original CSS honestly
      code = code.replace(fullMatch, `${indent}import ${ident} from '${nextSpecifier}';\n`);
      residualFiles.push({ name: basename, code: cssSource, sourcePath: cssFile });
    } else {
      code = code.replace(fullMatch, '');
    }
  }

  return { code, residualFiles };
}

/**
 * Produces a Tailwind-converted copy of a StackBlitz `ExampleProject`:
 * rewrites component files to Tailwind utility classes, replaces partially converted
 * `.module.css` files with their residual CSS, and drops fully converted `.module.css` files.
 */
export function transformProjectToTailwind(project, framework, addDependency) {
  const nextFiles = {};
  const residualByRelPath = new Map();

  for (const [relPath, fileCode] of Object.entries(project.files)) {
    if (relPath.endsWith('.module.css')) continue;
    if (/\.(?:[jt]sx?|vue|svelte)$/.test(relPath)) {
      const absPath = path.join(websiteRoot, relPath);
      const { code, residualFiles } = transformSourceToTailwind(
        fileCode,
        absPath,
        framework,
        addDependency,
        { rewriteImportPath: false },
      );
      nextFiles[relPath] = code;
      for (const rf of residualFiles) {
        residualByRelPath.set(path.relative(websiteRoot, rf.sourcePath), rf.code);
      }
    } else {
      nextFiles[relPath] = fileCode;
    }
  }

  for (const [relPath, cssCode] of residualByRelPath) {
    nextFiles[relPath] = cssCode;
  }

  return {
    ...project,
    files: nextFiles,
  };
}
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const marqueeExampleCss = `
  .marquee-root {
    --moduix-marquee-width: 32rem;
    max-width: calc(100vw - 2rem);
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: var(--moduix-spacing-2);
    min-width: max-content;
    padding: var(--moduix-spacing-2) var(--moduix-spacing-3);
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-muted);
    color: var(--moduix-color-foreground);
    font-size: var(--moduix-text-sm);
    font-weight: var(--moduix-weight-medium);
    line-height: var(--moduix-line-height-text-sm);
    white-space: nowrap;
  }

  .marquee-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .marquee-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
    justify-content: flex-end;
  }

  .marquee-status {
    display: flex;
    gap: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

export const marqueeVerticalCss = `
  .marquee-vertical {
    --moduix-marquee-width: 14rem;
    --moduix-marquee-vertical-height: 18rem;
    max-width: calc(100vw - 2rem);
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: var(--moduix-spacing-2);
    min-width: max-content;
    padding: var(--moduix-spacing-2) var(--moduix-spacing-3);
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-muted);
    color: var(--moduix-color-foreground);
    font-size: var(--moduix-text-sm);
    font-weight: var(--moduix-weight-medium);
    line-height: var(--moduix-line-height-text-sm);
    white-space: nowrap;
  }
`;

const marqueeCssProperties: CssPropertyInput[] = [
  ['--moduix-marquee-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--marquee-delay',
    'computed from `delay` (default `0s`)',
    'Runtime value from Ark that controls animation start delay.',
  ],
  [
    '--marquee-duration',
    'computed from content size and `speed` (default `50`)',
    'Runtime value from Ark that controls animation duration.',
  ],
  [
    '--moduix-marquee-edge-color',
    'var(--moduix-color-background)',
    'Controls edge fade start color.',
  ],
  ['--moduix-marquee-edge-size', '20%', 'Controls edge fade width or height.'],
  ['--moduix-marquee-edge-z-index', '1', 'Controls edge overlay stacking.'],
  ['--moduix-marquee-height', 'auto', 'Controls root height for horizontal marquees.'],
  [
    '--marquee-loop-count',
    'computed from `loopCount` (default `0` = infinite)',
    'Runtime value from Ark that controls animation iteration count.',
  ],
  [
    '--marquee-spacing',
    '1rem',
    'Runtime value from Ark that spaces repeated content instances and items.',
  ],
  [
    '--marquee-translate',
    'computed from measured content size and `side`',
    'Runtime value from Ark that drives the keyframe translate distance.',
  ],
  [
    '--moduix-marquee-vertical-height',
    'var(--moduix-marquee-height, 15rem)',
    'Controls root height for vertical marquees.',
  ],
  ['--moduix-marquee-width', '100%', 'Controls root width.'],
];

const marqueeCssPropertiesReference = marqueeCssProperties.map(normalizeCssProperty);

export function MarqueeCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={marqueeCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
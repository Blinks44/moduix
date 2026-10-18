import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const marqueeCssProperties: CssPropertyInput[] = [
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
];

const marqueeCssPropertiesReference = marqueeCssProperties.map(normalizeCssProperty);

export function MarqueeCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={marqueeCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
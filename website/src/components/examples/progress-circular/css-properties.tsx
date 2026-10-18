import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const progressCircularCssProperties: CssPropertyInput[] = [
  [
    '--moduix-progress-circular-range-bg',
    'var(--moduix-color-primary)',
    'Controls circle range color.',
  ],
  ['--moduix-progress-circular-size', 'var(--moduix-size-xl)', 'Controls SVG circle size.'],
  ['--moduix-progress-circular-thickness', '0.4rem', 'Controls SVG stroke thickness.'],
  [
    '--moduix-progress-circular-track-bg',
    'var(--moduix-color-muted)',
    'Controls circle track color.',
  ],
];

const progressCircularCssPropertiesReference =
  progressCircularCssProperties.map(normalizeCssProperty);

export function ProgressCircularCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={progressCircularCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const progressLinearCssProperties: CssPropertyInput[] = [
  [
    '--moduix-progress-linear-range-bg',
    'var(--moduix-color-primary)',
    'Controls filled range color.',
  ],
  ['--moduix-progress-linear-track-bg', 'var(--moduix-color-muted)', 'Controls track background.'],
  [
    '--moduix-progress-linear-track-size',
    'var(--moduix-spacing-2)',
    'Controls track thickness: height when horizontal, width when vertical.',
  ],
];

const progressLinearCssPropertiesReference = progressLinearCssProperties.map(normalizeCssProperty);

export function ProgressLinearCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={progressLinearCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
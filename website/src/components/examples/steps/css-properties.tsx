import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const stepsCssProperties: CssPropertyInput[] = [
  [
    '--moduix-steps-gap',
    'var(--moduix-spacing-4)',
    'Controls the gap between vertical steps and the length of the vertical separator.',
  ],
  [
    '--moduix-steps-indicator-size',
    'var(--moduix-spacing-8)',
    'Controls indicator width and height and the vertical separator position.',
  ],
];

const stepsCssPropertiesReference = stepsCssProperties.map(normalizeCssProperty);

export function StepsCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={stepsCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
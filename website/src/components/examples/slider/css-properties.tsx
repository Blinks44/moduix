import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const sliderCssProperties: CssPropertyInput[] = [
  [
    '--moduix-slider-range-bg',
    'var(--moduix-color-primary)',
    'Controls filled range and active marker color.',
  ],
  ['--moduix-slider-thumb-size', 'var(--moduix-spacing-4)', 'Controls thumb width and height.'],
  ['--moduix-slider-track-bg', 'var(--moduix-color-muted)', 'Controls track background.'],
  [
    '--moduix-slider-track-size',
    'var(--moduix-spacing-1-5)',
    'Controls track thickness: height when horizontal, width when vertical.',
  ],
];

const sliderCssPropertiesReference = sliderCssProperties.map(normalizeCssProperty);

export function SliderCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={sliderCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
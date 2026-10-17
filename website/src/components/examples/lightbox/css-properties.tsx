import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const lightboxOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-lightbox-content-max-height',
    '80dvh',
    'Maximum height of the content and of `LightboxImage`.',
  ],
  [
    '--moduix-lightbox-content-max-width',
    '80vw',
    'Maximum width of the content and of `LightboxImage`.',
  ],
];

export function LightboxCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={lightboxOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}
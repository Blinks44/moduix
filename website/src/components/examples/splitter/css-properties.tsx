import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

export const splitterOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-splitter-resize-trigger-line-color',
    'var(--moduix-color-border)',
    'Controls the idle divider line color.',
  ],
  [
    '--moduix-splitter-resize-trigger-size',
    'var(--moduix-spacing-2-5)',
    'Controls the transparent pointer hit area around the divider.',
  ],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if ('name' in property) return property;

  const [name, defaultValue, description] = property;

  return {
    name,
    defaultValue,
    description,
  };
}

export function SplitterCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={splitterOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}
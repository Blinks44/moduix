import type { CssProperty } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const tagCssProperties = (
  [
    ['--moduix-tag-bg', 'Variant-specific', 'Overrides the tag background in every variant.'],
    [
      '--moduix-tag-border-color',
      'Variant-specific',
      'Overrides the tag border color in every variant.',
    ],
    [
      '--moduix-tag-color',
      'Variant-specific',
      'Overrides the tag text, icon, and close trigger color in every variant.',
    ],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];

export function TagCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={tagCssProperties} />;
}
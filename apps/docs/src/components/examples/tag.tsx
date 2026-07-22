import type { CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tagCssProperties = (
  [
    ['--moduix-tag-bg', 'var(--moduix-color-primary)', 'Controls tag background color.'],
    ['--moduix-tag-border-color', 'transparent', 'Controls tag border color.'],
    ['--moduix-tag-border-width', 'var(--moduix-border-width-sm)', 'Controls tag border width.'],
    [
      '--moduix-tag-color',
      'var(--moduix-color-primary-foreground)',
      'Controls tag text and icon color.',
    ],
    [
      '--moduix-tag-disabled-opacity',
      'var(--moduix-opacity-disabled)',
      'Controls disabled close trigger opacity.',
    ],
    ['--moduix-tag-font-size', 'var(--moduix-text-xs)', 'Controls tag font size.'],
    ['--moduix-tag-font-weight', 'var(--moduix-weight-medium)', 'Controls tag font weight.'],
    [
      '--moduix-tag-gap',
      'var(--moduix-spacing-1-5)',
      'Controls space between tag children at md size.',
    ],
    [
      '--moduix-tag-gap-sm',
      'var(--moduix-spacing-1)',
      'Controls space between tag children at sm size.',
    ],
    ['--moduix-tag-height-sm', '1.25rem', 'Controls sm tag minimum height.'],
    ['--moduix-tag-height-md', 'var(--moduix-size-xs)', 'Controls md tag minimum height.'],
    ['--moduix-tag-icon-size', 'var(--moduix-spacing-3)', 'Controls SVG icon size.'],
    ['--moduix-tag-line-height', 'var(--moduix-line-height-text-xs)', 'Controls tag line-height.'],
    ['--moduix-tag-padding-x-sm', 'var(--moduix-spacing-1-5)', 'Controls sm horizontal padding.'],
    ['--moduix-tag-padding-x-md', 'var(--moduix-spacing-2)', 'Controls md horizontal padding.'],
    ['--moduix-tag-padding-y-sm', '0', 'Controls sm vertical padding.'],
    ['--moduix-tag-padding-y-md', 'var(--moduix-spacing-0-5)', 'Controls md vertical padding.'],
    ['--moduix-tag-radius', 'var(--moduix-radius-full)', 'Controls tag border radius.'],
    ['--moduix-tag-close-trigger-bg', 'transparent', 'Controls close trigger background color.'],
    [
      '--moduix-tag-close-trigger-bg-hover',
      'color-mix(in oklab, currentColor 12%, transparent)',
      'Controls close trigger hover background color.',
    ],
    [
      '--moduix-tag-close-trigger-focus-ring-color',
      'var(--moduix-color-ring)',
      'Controls close trigger focus ring color.',
    ],
    [
      '--moduix-tag-close-trigger-focus-ring-offset',
      '0',
      'Controls close trigger focus ring offset.',
    ],
    [
      '--tag-close-trigger-focus-ring-offset-color',
      'transparent',
      'Controls close trigger focus ring offset color.',
    ],
    [
      '--moduix-tag-close-trigger-focus-ring-width',
      'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
      'Controls close trigger focus ring width.',
    ],
    [
      '--moduix-tag-close-trigger-icon-size',
      'var(--moduix-spacing-2-5)',
      'Controls close trigger icon size.',
    ],
    [
      '--moduix-tag-close-trigger-radius',
      'var(--moduix-radius-full)',
      'Controls close trigger border radius.',
    ],
    ['--moduix-tag-close-trigger-size', 'var(--moduix-spacing-4)', 'Controls close trigger size.'],
    [
      '--moduix-tag-transition',
      'var(--moduix-transition-default)',
      'Controls tag and trigger transitions.',
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
import type { CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tagCssProperties = (
  [
    ['--tag-bg', 'var(--color-primary)', 'Controls tag background color.'],
    ['--tag-border-color', 'transparent', 'Controls tag border color.'],
    ['--tag-border-width', 'var(--border-width-sm)', 'Controls tag border width.'],
    ['--tag-color', 'var(--color-primary-foreground)', 'Controls tag text and icon color.'],
    [
      '--tag-disabled-opacity',
      'var(--opacity-disabled)',
      'Controls disabled close trigger opacity.',
    ],
    ['--tag-font-size', 'var(--text-xs)', 'Controls tag font size.'],
    ['--tag-font-weight', 'var(--weight-medium)', 'Controls tag font weight.'],
    ['--tag-gap', 'var(--spacing-1-5)', 'Controls space between tag children at md size.'],
    ['--tag-gap-sm', 'var(--spacing-1)', 'Controls space between tag children at sm size.'],
    ['--tag-height-sm', '1.25rem', 'Controls sm tag minimum height.'],
    ['--tag-height-md', 'var(--size-xs)', 'Controls md tag minimum height.'],
    ['--tag-icon-size', 'var(--spacing-3)', 'Controls SVG icon size.'],
    ['--tag-line-height', 'var(--line-height-text-xs)', 'Controls tag line-height.'],
    ['--tag-padding-x-sm', 'var(--spacing-1-5)', 'Controls sm horizontal padding.'],
    ['--tag-padding-x-md', 'var(--spacing-2)', 'Controls md horizontal padding.'],
    ['--tag-padding-y-sm', '0', 'Controls sm vertical padding.'],
    ['--tag-padding-y-md', 'var(--spacing-0-5)', 'Controls md vertical padding.'],
    ['--tag-radius', 'var(--radius-full)', 'Controls tag border radius.'],
    ['--tag-close-trigger-bg', 'transparent', 'Controls close trigger background color.'],
    [
      '--tag-close-trigger-bg-hover',
      'color-mix(in oklab, currentColor 12%, transparent)',
      'Controls close trigger hover background color.',
    ],
    [
      '--tag-close-trigger-focus-ring-color',
      'var(--color-ring)',
      'Controls close trigger focus ring color.',
    ],
    ['--tag-close-trigger-focus-ring-offset', '0', 'Controls close trigger focus ring offset.'],
    [
      '--tag-close-trigger-focus-ring-offset-color',
      'transparent',
      'Controls close trigger focus ring offset color.',
    ],
    [
      '--tag-close-trigger-focus-ring-width',
      'var(--focus-ring-inset-width, var(--border-width-sm))',
      'Controls close trigger focus ring width.',
    ],
    ['--tag-close-trigger-icon-size', 'var(--spacing-2-5)', 'Controls close trigger icon size.'],
    ['--tag-close-trigger-radius', 'var(--radius-full)', 'Controls close trigger border radius.'],
    ['--tag-close-trigger-size', 'var(--spacing-4)', 'Controls close trigger size.'],
    ['--tag-transition', 'var(--transition-default)', 'Controls tag and trigger transitions.'],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];

export function TagCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={tagCssProperties} />;
}
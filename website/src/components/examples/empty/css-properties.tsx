import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const emptyOverrideCssProperties = [
  {
    name: '--moduix-empty-bg',
    defaultValue: 'color-mix(in oklab, var(--moduix-color-card) 92%, var(--moduix-color-muted))',
    description: 'Controls the empty-state surface background.',
  },
  {
    name: '--moduix-empty-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls the root border color.',
  },
  {
    name: '--moduix-empty-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the root border width.',
  },
  {
    name: '--moduix-empty-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls the root foreground color.',
  },
  {
    name: '--moduix-empty-padding',
    defaultValue: 'var(--moduix-spacing-8)',
    description: 'Controls the root padding.',
  },
  {
    name: '--moduix-empty-radius',
    defaultValue: 'var(--moduix-radius-xl)',
    description: 'Controls the root border radius.',
  },
] satisfies CssPropertyInput[];

export function EmptyCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={emptyOverrideCssProperties} />;
}
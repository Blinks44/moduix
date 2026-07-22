import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const emptyOverrideCssProperties = [
  {
    name: '--moduix-empty-actions-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls spacing between action items.',
  },
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
    name: '--moduix-empty-content-gap',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls spacing between title and description.',
  },
  {
    name: '--moduix-empty-content-max-width',
    defaultValue: '28rem',
    description: 'Controls maximum width of the text block.',
  },
  {
    name: '--moduix-empty-description-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls description text color.',
  },
  {
    name: '--moduix-empty-description-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls description font size.',
  },
  {
    name: '--moduix-empty-description-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls description line-height.',
  },
  {
    name: '--moduix-empty-gap',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls spacing between the major sections.',
  },
  {
    name: '--moduix-empty-icon-bg',
    defaultValue: 'var(--moduix-color-muted)',
    description: 'Controls the icon container background.',
  },
  {
    name: '--moduix-empty-icon-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls the icon color.',
  },
  {
    name: '--moduix-empty-icon-padding',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls the icon container padding.',
  },
  {
    name: '--moduix-empty-icon-size',
    defaultValue: '1.5rem',
    description: 'Controls nested SVG icon size.',
  },
  {
    name: '--moduix-empty-padding',
    defaultValue: 'var(--moduix-spacing-8)',
    description: 'Controls root padding.',
  },
  {
    name: '--moduix-empty-radius',
    defaultValue: 'var(--moduix-radius-xl)',
    description: 'Controls root border radius.',
  },
  { name: '--moduix-empty-shadow', defaultValue: 'none', description: 'Controls root shadow.' },
  {
    name: '--moduix-empty-title-color',
    defaultValue: 'currentColor',
    description: 'Controls title color.',
  },
  {
    name: '--moduix-empty-title-font-size',
    defaultValue: 'var(--moduix-text-xl)',
    description: 'Controls title font size.',
  },
  {
    name: '--moduix-empty-title-font-weight',
    defaultValue: 'var(--moduix-weight-semibold)',
    description: 'Controls title font weight.',
  },
  {
    name: '--moduix-empty-title-line-height',
    defaultValue: 'var(--moduix-line-height-text-xl)',
    description: 'Controls title line-height.',
  },
] satisfies CssPropertyInput[];

export function EmptyCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={emptyOverrideCssProperties} />;
}
import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const headingOverrideCssProperties = [
  {
    name: '--moduix-heading-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls heading text color.',
  },
  {
    name: '--moduix-heading-font-family',
    defaultValue: 'inherit',
    description: 'Controls heading font family.',
  },
  {
    name: '--moduix-heading-font-size',
    defaultValue: 'size-dependent',
    description: 'Controls heading font size for all sizes.',
  },
  {
    name: '--moduix-heading-font-size-xs',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls `xs` heading font size.',
  },
  {
    name: '--moduix-heading-font-size-sm',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls `sm` heading font size.',
  },
  {
    name: '--moduix-heading-font-size-md',
    defaultValue: 'var(--moduix-text-lg)',
    description: 'Controls `md` heading font size.',
  },
  {
    name: '--moduix-heading-font-size-lg',
    defaultValue: 'var(--moduix-text-xl)',
    description: 'Controls `lg` heading font size.',
  },
  {
    name: '--moduix-heading-font-size-xl',
    defaultValue: 'var(--moduix-text-2xl)',
    description: 'Controls `xl` heading font size.',
  },
  {
    name: '--moduix-heading-font-size-2xl',
    defaultValue: 'var(--moduix-text-3xl)',
    description: 'Controls `2xl` heading font size.',
  },
  {
    name: '--moduix-heading-font-weight',
    defaultValue: 'var(--moduix-weight-semibold)',
    description: 'Controls heading font weight.',
  },
  {
    name: '--moduix-heading-font-weight-bold',
    defaultValue: 'var(--moduix-weight-bold)',
    description: 'Controls `bold` heading font weight.',
  },
  {
    name: '--moduix-heading-font-weight-medium',
    defaultValue: 'var(--moduix-weight-medium)',
    description: 'Controls `medium` heading font weight.',
  },
  {
    name: '--moduix-heading-font-weight-regular',
    defaultValue: 'var(--moduix-weight-regular)',
    description: 'Controls `regular` heading font weight.',
  },
  {
    name: '--moduix-heading-font-weight-semibold',
    defaultValue: 'var(--moduix-weight-semibold)',
    description: 'Controls `semibold` heading font weight.',
  },
  {
    name: '--moduix-heading-letter-spacing',
    defaultValue: '0',
    description: 'Controls heading letter spacing.',
  },
  {
    name: '--moduix-heading-line-height',
    defaultValue: 'size-dependent',
    description: 'Controls heading line height for all sizes.',
  },
  {
    name: '--moduix-heading-line-height-xs',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls `xs` heading line height.',
  },
  {
    name: '--moduix-heading-line-height-sm',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls `sm` heading line height.',
  },
  {
    name: '--moduix-heading-line-height-md',
    defaultValue: 'var(--moduix-line-height-text-lg)',
    description: 'Controls `md` heading line height.',
  },
  {
    name: '--moduix-heading-line-height-lg',
    defaultValue: 'var(--moduix-line-height-text-xl)',
    description: 'Controls `lg` heading line height.',
  },
  {
    name: '--moduix-heading-line-height-xl',
    defaultValue: 'var(--moduix-line-height-text-2xl)',
    description: 'Controls `xl` heading line height.',
  },
  {
    name: '--moduix-heading-line-height-2xl',
    defaultValue: 'var(--moduix-line-height-text-3xl)',
    description: 'Controls `2xl` heading line height.',
  },
  {
    name: '--moduix-heading-text-wrap',
    defaultValue: 'balance',
    description: 'Controls heading text wrapping.',
  },
] satisfies CssPropertyInput[];

export function HeadingCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={headingOverrideCssProperties} />;
}
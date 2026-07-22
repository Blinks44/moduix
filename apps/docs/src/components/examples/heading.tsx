import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const headingOverrideCssProperties = [
  {
    name: '--heading-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls heading text color.',
  },
  {
    name: '--heading-font-family',
    defaultValue: 'inherit',
    description: 'Controls heading font family.',
  },
  {
    name: '--heading-font-size',
    defaultValue: 'size-dependent',
    description: 'Controls heading font size for all sizes.',
  },
  {
    name: '--heading-font-size-xs',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `xs` heading font size.',
  },
  {
    name: '--heading-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls `sm` heading font size.',
  },
  {
    name: '--heading-font-size-md',
    defaultValue: 'var(--text-lg)',
    description: 'Controls `md` heading font size.',
  },
  {
    name: '--heading-font-size-lg',
    defaultValue: 'var(--text-xl)',
    description: 'Controls `lg` heading font size.',
  },
  {
    name: '--heading-font-size-xl',
    defaultValue: 'var(--text-2xl)',
    description: 'Controls `xl` heading font size.',
  },
  {
    name: '--heading-font-size-2xl',
    defaultValue: 'var(--text-3xl)',
    description: 'Controls `2xl` heading font size.',
  },
  {
    name: '--heading-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls heading font weight.',
  },
  {
    name: '--heading-font-weight-bold',
    defaultValue: 'var(--weight-bold)',
    description: 'Controls `bold` heading font weight.',
  },
  {
    name: '--heading-font-weight-medium',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls `medium` heading font weight.',
  },
  {
    name: '--heading-font-weight-regular',
    defaultValue: 'var(--weight-regular)',
    description: 'Controls `regular` heading font weight.',
  },
  {
    name: '--heading-font-weight-semibold',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `semibold` heading font weight.',
  },
  {
    name: '--heading-letter-spacing',
    defaultValue: '0',
    description: 'Controls heading letter spacing.',
  },
  {
    name: '--heading-line-height',
    defaultValue: 'size-dependent',
    description: 'Controls heading line height for all sizes.',
  },
  {
    name: '--heading-line-height-xs',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `xs` heading line height.',
  },
  {
    name: '--heading-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls `sm` heading line height.',
  },
  {
    name: '--heading-line-height-md',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls `md` heading line height.',
  },
  {
    name: '--heading-line-height-lg',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls `lg` heading line height.',
  },
  {
    name: '--heading-line-height-xl',
    defaultValue: 'var(--line-height-text-2xl)',
    description: 'Controls `xl` heading line height.',
  },
  {
    name: '--heading-line-height-2xl',
    defaultValue: 'var(--line-height-text-3xl)',
    description: 'Controls `2xl` heading line height.',
  },
  {
    name: '--heading-text-wrap',
    defaultValue: 'balance',
    description: 'Controls heading text wrapping.',
  },
] satisfies CssPropertyInput[];

export function HeadingCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={headingOverrideCssProperties} />;
}
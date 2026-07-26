import type { CssPropertyInput } from '../mdx/reference';

export const containerOverrideCssProperties = [
  {
    name: '--moduix-container-gutter-sm',
    defaultValue: 'clamp(var(--moduix-spacing-3), 3vw, var(--moduix-spacing-6))',
    description: 'Controls small inline gutters.',
  },
  {
    name: '--moduix-container-gutter-md',
    defaultValue: 'clamp(var(--moduix-spacing-4), 4vw, var(--moduix-spacing-8))',
    description: 'Controls medium inline gutters.',
  },
  {
    name: '--moduix-container-gutter-lg',
    defaultValue: 'clamp(var(--moduix-spacing-6), 5vw, 3rem)',
    description: 'Controls large inline gutters.',
  },
  {
    name: '--moduix-container-max-width-xs',
    defaultValue: '40rem',
    description: 'Controls the `xs` content width.',
  },
  {
    name: '--moduix-container-max-width-sm',
    defaultValue: '48rem',
    description: 'Controls the `sm` content width.',
  },
  {
    name: '--moduix-container-max-width-md',
    defaultValue: '64rem',
    description: 'Controls the `md` content width.',
  },
  {
    name: '--moduix-container-max-width-lg',
    defaultValue: '72rem',
    description: 'Controls the `lg` content width.',
  },
  {
    name: '--moduix-container-max-width-xl',
    defaultValue: '90rem',
    description: 'Controls the `xl` content width.',
  },
] satisfies CssPropertyInput[];
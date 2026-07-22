import type { CssPropertyInput } from '../mdx/reference';

export const containerOverrideCssProperties = [
  {
    name: '--container-gutter-sm',
    defaultValue: 'clamp(0.75rem, 3vw, 1.5rem)',
    description: 'Controls small inline gutters.',
  },
  {
    name: '--container-gutter-md',
    defaultValue: 'clamp(1rem, 4vw, 2rem)',
    description: 'Controls medium inline gutters.',
  },
  {
    name: '--container-gutter-lg',
    defaultValue: 'clamp(1.5rem, 5vw, 3rem)',
    description: 'Controls large inline gutters.',
  },
  {
    name: '--container-max-width-xs',
    defaultValue: '40rem',
    description: 'Controls the `xs` content width.',
  },
  {
    name: '--container-max-width-sm',
    defaultValue: '48rem',
    description: 'Controls the `sm` content width.',
  },
  {
    name: '--container-max-width-md',
    defaultValue: '64rem',
    description: 'Controls the `md` content width.',
  },
  {
    name: '--container-max-width-lg',
    defaultValue: '72rem',
    description: 'Controls the `lg` content width.',
  },
  {
    name: '--container-max-width-xl',
    defaultValue: '90rem',
    description: 'Controls the `xl` content width.',
  },
] satisfies CssPropertyInput[];
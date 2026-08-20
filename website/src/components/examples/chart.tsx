import type { CssProperty } from '../mdx/reference';

export const chartCssProperties: CssProperty[] = [
  {
    name: '--moduix-chart-axis-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls axis, grid, and guide foreground color.',
  },
  {
    name: '--moduix-chart-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls `Chart.Root` background color.',
  },
  {
    name: '--moduix-chart-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls `Chart.Root` border color.',
  },
  {
    name: '--moduix-chart-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls `Chart.Root` border width.',
  },
  {
    name: '--moduix-chart-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls the keyboard focus ring color on `Chart.Plot`.',
  },
  {
    name: '--moduix-chart-focus-ring-offset',
    defaultValue: 'var(--moduix-focus-ring-offset)',
    description: 'Controls the keyboard focus ring offset on `Chart.Plot`.',
  },
  {
    name: '--moduix-chart-focus-ring-width',
    defaultValue: 'var(--moduix-focus-ring-width)',
    description: 'Controls the keyboard focus ring width on `Chart.Plot`.',
  },
  {
    name: '--moduix-chart-gap',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls spacing between `Chart.Root` children.',
  },
  {
    name: '--moduix-chart-padding',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls `Chart.Root` inset.',
  },
  {
    name: '--moduix-chart-plot-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls `Chart.Plot` and its focus ring radius.',
  },
  {
    name: '--moduix-chart-radius',
    defaultValue: 'var(--moduix-radius-lg)',
    description: 'Controls `Chart.Root` border radius.',
  },
  {
    name: '--moduix-chart-shadow',
    defaultValue: 'var(--moduix-shadow-sm)',
    description: 'Controls `Chart.Root` shadow.',
  },
  {
    name: '--moduix-chart-tooltip-bg',
    defaultValue: 'var(--moduix-color-popover)',
    description: 'Controls the native TanStack tooltip background color.',
  },
  {
    name: '--moduix-chart-tooltip-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls the native TanStack tooltip border color.',
  },
  {
    name: '--moduix-chart-tooltip-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the native TanStack tooltip border width.',
  },
  {
    name: '--moduix-chart-tooltip-color',
    defaultValue: 'var(--moduix-color-popover-foreground)',
    description: 'Controls the native TanStack tooltip foreground color.',
  },
  {
    name: '--moduix-chart-tooltip-font-size',
    defaultValue: 'var(--moduix-text-xs)',
    description: 'Controls the native TanStack tooltip font size.',
  },
  {
    name: '--moduix-chart-tooltip-line-height',
    defaultValue: 'var(--moduix-line-height-text-xs)',
    description: 'Controls the native TanStack tooltip line height.',
  },
  {
    name: '--moduix-chart-tooltip-padding',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls the native TanStack tooltip inset.',
  },
  {
    name: '--moduix-chart-tooltip-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the native TanStack tooltip radius.',
  },
  {
    name: '--moduix-chart-tooltip-shadow',
    defaultValue: 'var(--moduix-shadow-lg)',
    description: 'Controls the native TanStack tooltip shadow.',
  },
];
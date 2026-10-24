import type { CssProperty } from '../../mdx/reference';

export const chartCssProperties: CssProperty[] = [
  {
    name: '--moduix-chart-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls `Chart` background color.',
  },
  {
    name: '--moduix-chart-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls `Chart` border color.',
  },
  {
    name: '--moduix-chart-gap',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls spacing between `Chart` children.',
  },
  {
    name: '--moduix-chart-legend-indicator-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls the `ChartLegendItem` indicator color.',
  },
  {
    name: '--moduix-chart-padding',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls `Chart` inset.',
  },
  {
    name: '--moduix-chart-radius',
    defaultValue: 'var(--moduix-radius-lg)',
    description: 'Controls `Chart` border radius.',
  },
  {
    name: '--moduix-chart-shadow',
    defaultValue: 'var(--moduix-shadow-sm)',
    description: 'Controls `Chart` shadow.',
  },
];
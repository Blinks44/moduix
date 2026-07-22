import type { ReactNode } from 'react';
import styles from './tokens-overview.module.css';

type ColorToken = {
  name: string;
  alias: string;
  label: string;
  light: string;
  dark: string;
};

const colorTokens = [
  {
    name: '--moduix-background',
    alias: '--moduix-color-background',
    label: 'Canvas',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.155 0.008 285)',
  },
  {
    name: '--moduix-foreground',
    alias: '--moduix-color-foreground',
    label: 'Canvas text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-card',
    alias: '--moduix-color-card',
    label: 'Raised surface',
    light: 'oklch(0.995 0.002 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--moduix-card-foreground',
    alias: '--moduix-color-card-foreground',
    label: 'Raised text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-popover',
    alias: '--moduix-color-popover',
    label: 'Layer surface',
    light: 'oklch(0.995 0.002 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--moduix-popover-foreground',
    alias: '--moduix-color-popover-foreground',
    label: 'Layer text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-primary',
    alias: '--moduix-color-primary',
    label: 'Primary action',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.918 0.007 285)',
  },
  {
    name: '--moduix-primary-foreground',
    alias: '--moduix-color-primary-foreground',
    label: 'Primary text',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--moduix-secondary',
    alias: '--moduix-color-secondary',
    label: 'Secondary fill',
    light: 'oklch(0.96 0.006 285)',
    dark: 'oklch(0.255 0.012 285)',
  },
  {
    name: '--moduix-secondary-foreground',
    alias: '--moduix-color-secondary-foreground',
    label: 'Secondary text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-muted',
    alias: '--moduix-color-muted',
    label: 'Subtle fill',
    light: 'oklch(0.955 0.006 285)',
    dark: 'oklch(0.255 0.012 285)',
  },
  {
    name: '--moduix-muted-foreground',
    alias: '--moduix-color-muted-foreground',
    label: 'Subtle text',
    light: 'oklch(0.485 0.015 285)',
    dark: 'oklch(0.705 0.016 285)',
  },
  {
    name: '--moduix-accent',
    alias: '--moduix-color-accent',
    label: 'Hover fill',
    light: 'oklch(0.95 0.01 285)',
    dark: 'oklch(0.29 0.015 285)',
  },
  {
    name: '--moduix-accent-foreground',
    alias: '--moduix-color-accent-foreground',
    label: 'Hover text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-destructive',
    alias: '--moduix-color-destructive',
    label: 'Danger',
    light: 'oklch(0.565 0.235 22)',
    dark: 'oklch(0.69 0.185 18)',
  },
  {
    name: '--moduix-destructive-foreground',
    alias: '--moduix-color-destructive-foreground',
    label: 'Danger text',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--moduix-success',
    alias: '--moduix-color-success',
    label: 'Success',
    light: 'oklch(0.627 0.194 149.214)',
    dark: 'oklch(0.627 0.194 149.214)',
  },
  {
    name: '--moduix-warning',
    alias: '--moduix-color-warning',
    label: 'Warning',
    light: 'oklch(0.795 0.184 86.047)',
    dark: 'oklch(0.795 0.184 86.047)',
  },
  {
    name: '--moduix-border',
    alias: '--moduix-color-border',
    label: 'Borders',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 13%)',
  },
  {
    name: '--moduix-input',
    alias: '--moduix-color-input',
    label: 'Input border',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 17%)',
  },
  {
    name: '--moduix-ring',
    alias: '--moduix-color-ring',
    label: 'Focus ring',
    light: 'oklch(0.62 0.035 285)',
    dark: 'oklch(0.585 0.038 285)',
  },
  {
    name: '--moduix-overlay',
    alias: '--moduix-color-overlay',
    label: 'Backdrop base',
    light: 'oklch(0.175 0.014 285 / 0.2)',
    dark: 'oklch(0.105 0.012 285 / 0.74)',
  },
  {
    name: '--moduix-overlay-foreground',
    alias: '--moduix-color-overlay-foreground',
    label: 'Soft overlay',
    light: 'oklch(0.175 0.014 285 / 0.07)',
    dark: 'oklch(0.968 0.003 285 / 0.09)',
  },
] satisfies ColorToken[];

const chartTokens = [
  {
    name: '--moduix-chart-1',
    alias: '--moduix-color-chart-1',
    label: 'Chart 1',
    light: 'oklch(0.65 0.18 295)',
    dark: 'oklch(0.72 0.17 295)',
  },
  {
    name: '--moduix-chart-2',
    alias: '--moduix-color-chart-2',
    label: 'Chart 2',
    light: 'oklch(0.7 0.14 175)',
    dark: 'oklch(0.76 0.13 175)',
  },
  {
    name: '--moduix-chart-3',
    alias: '--moduix-color-chart-3',
    label: 'Chart 3',
    light: 'oklch(0.72 0.16 55)',
    dark: 'oklch(0.78 0.15 55)',
  },
  {
    name: '--moduix-chart-4',
    alias: '--moduix-color-chart-4',
    label: 'Chart 4',
    light: 'oklch(0.6 0.2 350)',
    dark: 'oklch(0.67 0.19 350)',
  },
  {
    name: '--moduix-chart-5',
    alias: '--moduix-color-chart-5',
    label: 'Chart 5',
    light: 'oklch(0.68 0.13 130)',
    dark: 'oklch(0.74 0.12 130)',
  },
] satisfies ColorToken[];

const sidebarTokens = [
  {
    name: '--moduix-sidebar',
    alias: '--moduix-color-sidebar',
    label: 'Sidebar surface',
    light: 'oklch(0.975 0.005 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--moduix-sidebar-foreground',
    alias: '--moduix-color-sidebar-foreground',
    label: 'Sidebar text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-sidebar-primary',
    alias: '--moduix-color-sidebar-primary',
    label: 'Sidebar primary',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.72 0.17 295)',
  },
  {
    name: '--moduix-sidebar-primary-foreground',
    alias: '--moduix-color-sidebar-primary-foreground',
    label: 'Sidebar primary text',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.155 0.008 285)',
  },
  {
    name: '--moduix-sidebar-accent',
    alias: '--moduix-color-sidebar-accent',
    label: 'Sidebar accent',
    light: 'oklch(0.95 0.01 285)',
    dark: 'oklch(0.29 0.015 285)',
  },
  {
    name: '--moduix-sidebar-accent-foreground',
    alias: '--moduix-color-sidebar-accent-foreground',
    label: 'Sidebar accent text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--moduix-sidebar-border',
    alias: '--moduix-color-sidebar-border',
    label: 'Sidebar border',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 13%)',
  },
  {
    name: '--moduix-sidebar-ring',
    alias: '--moduix-color-sidebar-ring',
    label: 'Sidebar focus ring',
    light: 'oklch(0.62 0.035 285)',
    dark: 'oklch(0.585 0.038 285)',
  },
] satisfies ColorToken[];

const colorTokenCount = colorTokens.length + chartTokens.length + sidebarTokens.length;

const spacingTokens = [
  ['--moduix-spacing-0', '0px'],
  ['--moduix-spacing-0-5', 'calc((var(--moduix-spacing-0) + var(--moduix-spacing-1)) / 2)'],
  ['--moduix-spacing-1', '4px'],
  ['--moduix-spacing-1-5', 'calc((var(--moduix-spacing-1) + var(--moduix-spacing-2)) / 2)'],
  ['--moduix-spacing-2', '8px'],
  ['--moduix-spacing-2-5', 'calc((var(--moduix-spacing-2) + var(--moduix-spacing-3)) / 2)'],
  ['--moduix-spacing-3', '12px'],
  ['--moduix-spacing-3-5', 'calc((var(--moduix-spacing-3) + var(--moduix-spacing-4)) / 2)'],
  ['--moduix-spacing-4', '16px'],
  ['--moduix-spacing-4-5', 'calc((var(--moduix-spacing-4) + var(--moduix-spacing-5)) / 2)'],
  ['--moduix-spacing-5', '20px'],
  ['--moduix-spacing-6', '24px'],
  ['--moduix-spacing-7', 'calc((var(--moduix-spacing-6) + var(--moduix-spacing-8)) / 2)'],
  ['--moduix-spacing-8', '32px'],
  ['--moduix-spacing-10', '40px'],
];

const semanticSpacingTokens = [
  ['--moduix-spacing-xs', 'var(--moduix-spacing-1)', '4px'],
  ['--moduix-spacing-sm', 'var(--moduix-spacing-2)', '8px'],
  ['--moduix-spacing-md', 'var(--moduix-spacing-3)', '12px'],
  ['--moduix-spacing-lg', 'var(--moduix-spacing-4)', '16px'],
  ['--moduix-spacing-xl', 'var(--moduix-spacing-5)', '20px'],
  ['--moduix-spacing-2xl', 'var(--moduix-spacing-6)', '24px'],
];

const sizeTokens = [
  ['--moduix-size-xs', '24px'],
  ['--moduix-size-sm', '32px'],
  ['--moduix-size-md', '36px'],
  ['--moduix-size-lg', '40px'],
  ['--moduix-size-xl', '48px'],
];

const radiusTokens = [
  ['--moduix-radius', '0.625rem'],
  ['--moduix-radius-none', '0'],
  ['--moduix-radius-xs', 'calc(var(--moduix-radius) * 0.4)'],
  ['--moduix-radius-sm', 'calc(var(--moduix-radius) * 0.6)'],
  ['--moduix-radius-md', 'calc(var(--moduix-radius) * 0.8)'],
  ['--moduix-radius-lg', 'var(--moduix-radius)'],
  ['--moduix-radius-xl', 'calc(var(--moduix-radius) * 1.2)'],
  ['--moduix-radius-full', '9999px'],
];

const typographyTokens = [
  ['--moduix-text-xs', '12px', '--moduix-line-height-text-xs', '16px'],
  ['--moduix-text-sm', '14px', '--moduix-line-height-text-sm', '20px'],
  ['--moduix-text-md', '16px', '--moduix-line-height-text-md', '24px'],
  ['--moduix-text-lg', '18px', '--moduix-line-height-text-lg', '28px'],
  ['--moduix-text-xl', '20px', '--moduix-line-height-text-xl', '28px'],
  ['--moduix-text-2xl', '24px', '--moduix-line-height-text-2xl', '32px'],
  ['--moduix-text-3xl', '30px', '--moduix-line-height-text-3xl', '36px'],
];

const weightTokens = [
  ['--moduix-weight-regular', '400'],
  ['--moduix-weight-medium', '500'],
  ['--moduix-weight-semibold', '600'],
  ['--moduix-weight-bold', '700'],
];

const fontFamilyTokens = [
  [
    '--moduix-font-sans',
    "'Noto Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  ],
  [
    '--moduix-font-mono',
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  ],
];

const trackingTokens = [
  ['--moduix-tracking-text-sm', '-0.01em'],
  ['--moduix-tracking-text-xs', '-0.016em'],
];

const borderTokens = [
  ['--moduix-border-width-sm', '1px'],
  ['--moduix-border-width-md', '2px'],
  ['--moduix-border-width-lg', '4px'],
  ['--moduix-focus-ring-width', 'var(--moduix-border-width-md)'],
  ['--moduix-focus-ring-inset-width', 'var(--moduix-border-width-sm)'],
  ['--moduix-focus-ring-offset', 'var(--moduix-spacing-0-5)'],
  ['--moduix-focus-ring-inset-offset', 'calc(var(--moduix-border-width-sm) * -1)'],
];

const opacityTokens = [
  ['--moduix-opacity-disabled', '0.5'],
  ['--moduix-opacity-loading', '0.85'],
  ['--moduix-opacity-hover', '0.9'],
];

const motionTokens = [
  ['--moduix-duration-fast', '150ms'],
  ['--moduix-duration-normal', '200ms'],
  ['--moduix-duration-slow', '300ms'],
  ['--moduix-duration-slower', '450ms'],
  ['--moduix-ease-in', 'cubic-bezier(0.4, 0, 1, 1)'],
  ['--moduix-ease-out', 'cubic-bezier(0, 0, 0.2, 1)'],
  ['--moduix-ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
  ['--moduix-ease-spring', 'cubic-bezier(0.32, 0.72, 0, 1)'],
  ['--moduix-ease-standard', 'ease'],
  ['--moduix-ease-emphasized', 'cubic-bezier(0.22, 1, 0.36, 1)'],
  ['--moduix-transition-default', 'var(--moduix-duration-normal) var(--moduix-ease-in-out)'],
  ['--moduix-transition-fast', 'var(--moduix-duration-fast) var(--moduix-ease-in-out)'],
  ['--moduix-transition-slow', 'var(--moduix-duration-slow) var(--moduix-ease-in-out)'],
  ['--moduix-transition-slower', 'var(--moduix-duration-slower) var(--moduix-ease-in-out)'],
  ['--moduix-transition-spring', 'var(--moduix-duration-slower) var(--moduix-ease-spring)'],
  ['--moduix-transition-emphasized', 'var(--moduix-duration-slower) var(--moduix-ease-emphasized)'],
];

const animationTokens = [
  ['--moduix-animation-pulse', 'moduix-pulse 2.5s ease-in-out infinite'],
  [
    '--moduix-animation-fade-in',
    'moduix-fade-in var(--moduix-duration-normal) var(--moduix-ease-out)',
  ],
  [
    '--moduix-animation-fade-out',
    'moduix-fade-out var(--moduix-duration-normal) var(--moduix-ease-in)',
  ],
  [
    '--moduix-animation-slide-up',
    'moduix-slide-up var(--moduix-duration-normal) var(--moduix-ease-out)',
  ],
  [
    '--moduix-animation-slide-down',
    'moduix-slide-down var(--moduix-duration-normal) var(--moduix-ease-out)',
  ],
  ['--moduix-animation-spin', 'moduix-spin 0.75s linear infinite'],
];

const shadowTokens = [
  ['--moduix-shadow-sm', '0 2px 4px 0 #0000001a, 0 1px 2px -1px #0000001a'],
  ['--moduix-shadow-md', '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a'],
  ['--moduix-shadow-lg', '0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a'],
];

const transformTokens = [
  ['--moduix-scale-popup', '0.9', 'Dialog, popover, tooltip, menu, hover card, toast, nav menu'],
  ['--moduix-scale-dropdown', '0.95', 'Select, combobox, autocomplete'],
];

const zIndexTokens = [
  ['--moduix-z-default', '1'],
  ['--moduix-z-xs', '5'],
  ['--moduix-z-sm', '10'],
  ['--moduix-z-md', '20'],
  ['--moduix-z-lg', '30'],
  ['--moduix-z-xl', '40'],
  ['--moduix-z-backdrop', '40'],
  ['--moduix-z-modal', '50'],
  ['--moduix-z-popup', '60'],
  ['--moduix-z-toast', '70'],
];

const sharedBackdropTokens = [
  ['--moduix-backdrop-bg', 'var(--moduix-color-overlay)', 'Global backdrop color fallback'],
  ['--moduix-backdrop-filter', 'blur(4px)', 'Global backdrop filter fallback'],
  [
    '--moduix-command-palette-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'CommandPalette',
  ],
  [
    '--moduix-dialog-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Dialog',
  ],
  [
    '--moduix-drawer-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Drawer',
  ],
  [
    '--moduix-lightbox-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Lightbox',
  ],
  ['--moduix-tour-backdrop-bg', 'var(--moduix-backdrop-bg, var(--moduix-color-overlay))', 'Tour'],
];

const sharedPopupTokens = [
  ['--moduix-popup-check-gap', 'var(--moduix-spacing-2)'],
  ['--moduix-popup-check-indicator-size', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-check-padding-x-start', 'var(--moduix-spacing-2-5)'],
  ['--moduix-popup-group-label-font-size', 'var(--moduix-text-xs)'],
  ['--moduix-popup-group-label-line-height', 'var(--moduix-line-height-text-xs)'],
  ['--moduix-popup-group-label-font-weight', 'var(--moduix-weight-regular)'],
  ['--moduix-popup-group-label-padding-x-end', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-group-label-padding-x-start', 'var(--moduix-spacing-2-5)'],
  ['--moduix-popup-group-label-padding-y', 'var(--moduix-spacing-1)'],
  ['--moduix-popup-highlight-inset-x', 'var(--moduix-spacing-1)'],
  ['--moduix-popup-highlight-radius', 'var(--moduix-radius-sm)'],
  ['--moduix-popup-item-font-size', 'var(--moduix-text-sm)'],
  ['--moduix-popup-item-line-height', 'var(--moduix-line-height-text-sm)'],
  ['--moduix-popup-item-min-height', 'var(--moduix-size-sm)'],
  ['--moduix-popup-item-padding-x-start', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-item-padding-x-end', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-item-padding-y', 'var(--moduix-spacing-1)'],
  ['--moduix-popup-list-padding-y', 'var(--moduix-spacing-1)'],
  ['--moduix-popup-separator-margin-x-start', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-separator-margin-x-end', 'var(--moduix-spacing-3)'],
  ['--moduix-popup-separator-margin-y', 'var(--moduix-spacing-1-5)'],
];

const sharedPopupMotionTokens = [
  ['--moduix-popup-motion-duration', 'component default', 'Content enter and exit duration'],
  ['--moduix-popup-motion-easing', 'component default', 'Content enter and exit easing'],
  ['--moduix-popup-motion-starting-opacity', 'component default', 'Entry opacity'],
  ['--moduix-popup-motion-starting-scale', 'component default', 'Entry scale'],
  ['--moduix-popup-motion-starting-translate-x', 'component default', 'Entry horizontal offset'],
  ['--moduix-popup-motion-starting-translate-y', 'component default', 'Entry vertical offset'],
  ['--moduix-popup-motion-ending-opacity', 'component default', 'Exit opacity'],
  ['--moduix-popup-motion-ending-scale', 'component default', 'Exit scale'],
  ['--moduix-popup-motion-ending-translate-x', 'component default', 'Exit horizontal offset'],
  ['--moduix-popup-motion-ending-translate-y', 'component default', 'Exit vertical offset'],
];

export function TokensOverview() {
  return (
    <div className={styles.root}>
      <section className={styles.heroGrid}>
        <div className={styles.heroPanel}>
          <div className={styles.heroHeader}>
            <span>Token architecture</span>
            <code>:root</code>
          </div>
          <div className={styles.systemMap} aria-hidden="true">
            <div className={styles.mapNode}>
              <span>01</span>
              <strong>Raw values</strong>
              <code>--moduix-primary</code>
            </div>
            <div className={styles.mapNode} data-active="true">
              <span>02</span>
              <strong>Semantic aliases</strong>
              <code>--moduix-color-primary</code>
            </div>
            <div className={styles.mapNode}>
              <span>03</span>
              <strong>Component variables</strong>
              <code>--moduix-button-default-bg</code>
            </div>
          </div>
          <div className={styles.heroStats} aria-label="Token groups summary">
            <span>
              <strong>{colorTokenCount}</strong>
              color tokens
            </span>
            <span>
              <strong>{spacingTokens.length + semanticSpacingTokens.length}</strong>
              spacing steps
            </span>
            <span>
              <strong>
                {sharedBackdropTokens.length +
                  sharedPopupTokens.length +
                  sharedPopupMotionTokens.length}
              </strong>
              shared defaults
            </span>
          </div>
        </div>
        <div className={styles.stackPanel}>
          <TokenCallout
            title="Semantic aliases"
            code="--moduix-color-primary: var(--moduix-primary)"
            body="Components read semantic variables while themes override the raw palette."
          />
          <TokenCallout
            title="Shared fallbacks"
            code="--moduix-dialog-backdrop-bg -> --moduix-backdrop-bg / --moduix-backdrop-filter"
            body="Global backdrop color and blur stay centralized, and component-level variables can still opt out."
          />
          <TokenCallout
            title="Scoped themes"
            code=".billing-flow { --moduix-size-lg: 36px; }"
            body="Any parent scope can change density, motion, or color for a focused area."
          />
        </div>
      </section>

      <Section title="Colors" note="Light and dark theme values plus semantic aliases.">
        <div className={styles.themePreviewGrid}>
          <ThemePreview theme="light" />
          <ThemePreview theme="dark" />
        </div>
        <div className={styles.colorLegend} aria-hidden="true">
          <span>
            <i className={styles.legendLight} /> Light
          </span>
          <span>
            <i className={styles.legendDark} /> Dark
          </span>
        </div>
        <div className={styles.colorGrid}>
          {colorTokens.map((token) => (
            <ColorCard key={token.name} token={token} />
          ))}
        </div>
        <div className={styles.chartStrip}>
          {chartTokens.map((token) => {
            return (
              <article className={styles.chartToken} key={token.name}>
                <div className={styles.tokenMeta}>
                  <strong>{token.label}</strong>
                  <code>{token.name}</code>
                  <small>{token.alias}</small>
                </div>
                <div className={styles.swatches}>
                  <div className={styles.swatchBlock}>
                    <span className={styles.chartLight} style={{ background: token.light }} />
                    <small>Light</small>
                    <code>{token.light}</code>
                  </div>
                  <div className={styles.swatchBlock}>
                    <span className={styles.chartDark} style={{ background: token.dark }} />
                    <small>Dark</small>
                    <code>{token.dark}</code>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className={styles.colorGrid}>
          {sidebarTokens.map((token) => (
            <ColorCard key={token.name} token={token} />
          ))}
        </div>
      </Section>

      <Section
        title="Spacing & Size"
        note="Primitive steps, semantic spacing, and control heights."
      >
        <div className={styles.measureGrid}>
          <TokenScale title="Primitive spacing" tokens={spacingTokens} variant="bars" />
          <TokenScale title="Semantic spacing" tokens={semanticSpacingTokens} variant="semantic" />
          <TokenScale title="Control size" tokens={sizeTokens} variant="blocks" />
        </div>
      </Section>

      <Section
        title="Shape & Borders"
        note="Radius derives from one root value; borders stay simple."
      >
        <div className={styles.measureGrid}>
          <RadiusScale />
          <TokenScale title="Border widths" tokens={borderTokens} variant="lines" />
          <TokenScale title="Opacity" tokens={opacityTokens} variant="opacity" />
        </div>
      </Section>

      <Section
        title="Typography"
        note="Font families, sizes, line heights, weights, and tracking tokens."
      >
        <div className={styles.typeGrid}>
          {typographyTokens.map(([textName, textValue, lineName, lineValue]) => (
            <div className={styles.typeRow} key={textName}>
              <span className={styles.typeSample}>Aa</span>
              <div>
                <code>{textName}</code>
                <small>
                  {textValue} / {lineValue}
                </small>
              </div>
              <code>{lineName}</code>
            </div>
          ))}
        </div>
        <div className={styles.pillGrid}>
          {weightTokens.map(([name, value]) => (
            <span className={styles.tokenPill} key={name}>
              <code>{name}</code>
              <strong>{value}</strong>
            </span>
          ))}
          {trackingTokens.map(([name, value]) => (
            <span className={styles.tokenPill} key={name}>
              <code>{name}</code>
              <strong>{value}</strong>
            </span>
          ))}
        </div>
        <TokenList title="Font families" tokens={fontFamilyTokens} />
      </Section>

      <Section
        title="Motion"
        note="Durations, easing, transition shorthands, and reusable animations."
      >
        <div className={styles.motionGrid}>
          <TokenList title="Timing and transition tokens" tokens={motionTokens} />
          <TokenList title="Animation tokens" tokens={animationTokens} />
        </div>
      </Section>

      <Section
        title="Elevation & Layers"
        note="Shadows, transforms, and z-index tokens for overlays."
      >
        <div className={styles.layerGrid}>
          {shadowTokens.map(([name, value], index) => (
            <div className={styles.shadowCard} data-depth={index + 1} key={name}>
              <code>{name}</code>
              <small>{value}</small>
            </div>
          ))}
        </div>
        <div className={styles.motionGrid}>
          <TokenList title="Transforms" tokens={transformTokens} />
          <TokenList title="Z-index" tokens={zIndexTokens} />
        </div>
      </Section>

      <Section
        title="Shared Component Defaults"
        note="Backdrop, popup, and popup-motion defaults are reused across overlay families, with local component tokens layered on top."
      >
        <div className={styles.backdropPreview}>
          <div className={styles.backdropStage}>
            <div className={styles.backdropLayer} />
            <div className={styles.backdropDialog}>
              <strong>Layered UI</strong>
              <span>--moduix-backdrop-bg + --moduix-backdrop-filter</span>
            </div>
          </div>
          <TokenList title="Backdrop defaults and fallbacks" tokens={sharedBackdropTokens} />
        </div>
        <TokenList title="Shared popup content motion" tokens={sharedPopupMotionTokens} />
        <TokenList title="Shared popup menu defaults" tokens={sharedPopupTokens} />
      </Section>
    </div>
  );
}

function ThemePreview({ theme }: { theme: 'light' | 'dark' }) {
  const title = theme === 'light' ? 'Light theme' : 'Dark theme';

  return (
    <article className={styles.themeCard} data-theme={theme}>
      <div className={styles.themeTopbar}>
        <span>{title}</span>
        <code>{theme === 'light' ? ':root' : "[data-moduix-color-scheme='dark']"}</code>
      </div>
      <div className={styles.themeCanvas}>
        <div className={styles.themeSurface}>
          <span className={styles.themeEyebrow}>Preview</span>
          <strong>Dialog surface</strong>
          <p>Text, muted copy, border, action, and backdrop tokens in one compact layout.</p>
          <div className={styles.themeControls}>
            <span>Cancel</span>
            <strong>Apply</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      {children}
    </section>
  );
}

function TokenCallout({ title, code, body }: { title: string; code: string; body: string }) {
  return (
    <div className={styles.callout}>
      <strong>{title}</strong>
      <code>{code}</code>
      <p>{body}</p>
    </div>
  );
}

function ColorCard({ token }: { token: ColorToken }) {
  return (
    <article className={styles.colorCard}>
      <div className={styles.tokenMeta}>
        <strong>{token.label}</strong>
        <code>{token.name}</code>
        <small>{token.alias}</small>
      </div>
      <div className={styles.swatches}>
        <div className={styles.swatchBlock}>
          <span style={{ background: token.light }} />
          <small>Light</small>
          <code>{token.light}</code>
        </div>
        <div className={styles.swatchBlock}>
          <span style={{ background: token.dark }} />
          <small>Dark</small>
          <code>{token.dark}</code>
        </div>
      </div>
    </article>
  );
}

function TokenScale({
  title,
  tokens,
  variant,
}: {
  title: string;
  tokens: string[][];
  variant: 'bars' | 'semantic' | 'blocks' | 'lines' | 'opacity';
}) {
  return (
    <div className={styles.scaleCard} data-variant={variant}>
      <h3>{title}</h3>
      <div className={styles.scaleList}>
        {tokens.map(([name, value, resolved], index) => (
          <div className={styles.scaleRow} data-index={index} key={name}>
            <span className={styles.scaleShape} />
            <code>{name}</code>
            <small>{resolved ? `${value} / ${resolved}` : value}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusScale() {
  return (
    <div className={styles.scaleCard}>
      <h3>Radius</h3>
      <div className={styles.radiusGrid}>
        {radiusTokens.map(([name, value], index) => (
          <div className={styles.radiusToken} data-index={index} key={name}>
            <span />
            <code>{name}</code>
            <small>{value}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenList({ title, tokens }: { title: string; tokens: string[][] }) {
  return (
    <div className={styles.tokenList}>
      <h3>{title}</h3>
      {tokens.map(([name, value, note]) => (
        <div className={styles.tokenLine} key={name}>
          <code>{name}</code>
          <span>{value}</span>
          {note ? <small>{note}</small> : null}
        </div>
      ))}
    </div>
  );
}
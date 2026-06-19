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
    name: '--background',
    alias: '--color-background',
    label: 'Canvas',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.155 0.008 285)',
  },
  {
    name: '--foreground',
    alias: '--color-foreground',
    label: 'Canvas text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--card',
    alias: '--color-card',
    label: 'Raised surface',
    light: 'oklch(0.995 0.002 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--card-foreground',
    alias: '--color-card-foreground',
    label: 'Raised text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--popover',
    alias: '--color-popover',
    label: 'Layer surface',
    light: 'oklch(0.995 0.002 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--popover-foreground',
    alias: '--color-popover-foreground',
    label: 'Layer text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--primary',
    alias: '--color-primary',
    label: 'Primary action',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.918 0.007 285)',
  },
  {
    name: '--primary-foreground',
    alias: '--color-primary-foreground',
    label: 'Primary text',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--secondary',
    alias: '--color-secondary',
    label: 'Secondary fill',
    light: 'oklch(0.96 0.006 285)',
    dark: 'oklch(0.255 0.012 285)',
  },
  {
    name: '--secondary-foreground',
    alias: '--color-secondary-foreground',
    label: 'Secondary text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--muted',
    alias: '--color-muted',
    label: 'Subtle fill',
    light: 'oklch(0.955 0.006 285)',
    dark: 'oklch(0.255 0.012 285)',
  },
  {
    name: '--muted-foreground',
    alias: '--color-muted-foreground',
    label: 'Subtle text',
    light: 'oklch(0.485 0.015 285)',
    dark: 'oklch(0.705 0.016 285)',
  },
  {
    name: '--accent',
    alias: '--color-accent',
    label: 'Hover fill',
    light: 'oklch(0.95 0.01 285)',
    dark: 'oklch(0.29 0.015 285)',
  },
  {
    name: '--accent-foreground',
    alias: '--color-accent-foreground',
    label: 'Hover text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--destructive',
    alias: '--color-destructive',
    label: 'Danger',
    light: 'oklch(0.565 0.235 22)',
    dark: 'oklch(0.69 0.185 18)',
  },
  {
    name: '--success',
    alias: '--color-success',
    label: 'Success',
    light: 'oklch(0.627 0.194 149.214)',
    dark: 'oklch(0.627 0.194 149.214)',
  },
  {
    name: '--warning',
    alias: '--color-warning',
    label: 'Warning',
    light: 'oklch(0.795 0.184 86.047)',
    dark: 'oklch(0.795 0.184 86.047)',
  },
  {
    name: '--border',
    alias: '--color-border',
    label: 'Borders',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 13%)',
  },
  {
    name: '--input',
    alias: '--color-input',
    label: 'Input border',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 17%)',
  },
  {
    name: '--ring',
    alias: '--color-ring',
    label: 'Focus ring',
    light: 'oklch(0.62 0.035 285)',
    dark: 'oklch(0.585 0.038 285)',
  },
  {
    name: '--overlay',
    alias: '--color-overlay',
    label: 'Backdrop base',
    light: 'oklch(0.175 0.014 285 / 0.2)',
    dark: 'oklch(0.105 0.012 285 / 0.74)',
  },
  {
    name: '--overlay-foreground',
    alias: '--color-overlay-foreground',
    label: 'Soft overlay',
    light: 'oklch(0.175 0.014 285 / 0.07)',
    dark: 'oklch(0.968 0.003 285 / 0.09)',
  },
] satisfies ColorToken[];

const chartTokens = [
  {
    name: '--chart-1',
    alias: '--color-chart-1',
    label: 'Chart 1',
    light: 'oklch(0.65 0.18 295)',
    dark: 'oklch(0.72 0.17 295)',
  },
  {
    name: '--chart-2',
    alias: '--color-chart-2',
    label: 'Chart 2',
    light: 'oklch(0.7 0.14 175)',
    dark: 'oklch(0.76 0.13 175)',
  },
  {
    name: '--chart-3',
    alias: '--color-chart-3',
    label: 'Chart 3',
    light: 'oklch(0.72 0.16 55)',
    dark: 'oklch(0.78 0.15 55)',
  },
  {
    name: '--chart-4',
    alias: '--color-chart-4',
    label: 'Chart 4',
    light: 'oklch(0.6 0.2 350)',
    dark: 'oklch(0.67 0.19 350)',
  },
  {
    name: '--chart-5',
    alias: '--color-chart-5',
    label: 'Chart 5',
    light: 'oklch(0.68 0.13 130)',
    dark: 'oklch(0.74 0.12 130)',
  },
] satisfies ColorToken[];

const sidebarTokens = [
  {
    name: '--sidebar',
    alias: '--color-sidebar',
    label: 'Sidebar surface',
    light: 'oklch(0.975 0.005 285)',
    dark: 'oklch(0.2 0.011 285)',
  },
  {
    name: '--sidebar-foreground',
    alias: '--color-sidebar-foreground',
    label: 'Sidebar text',
    light: 'oklch(0.175 0.01 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--sidebar-primary',
    alias: '--color-sidebar-primary',
    label: 'Sidebar primary',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.72 0.17 295)',
  },
  {
    name: '--sidebar-primary-foreground',
    alias: '--color-sidebar-primary-foreground',
    label: 'Sidebar primary text',
    light: 'oklch(0.982 0.003 285)',
    dark: 'oklch(0.155 0.008 285)',
  },
  {
    name: '--sidebar-accent',
    alias: '--color-sidebar-accent',
    label: 'Sidebar accent',
    light: 'oklch(0.95 0.01 285)',
    dark: 'oklch(0.29 0.015 285)',
  },
  {
    name: '--sidebar-accent-foreground',
    alias: '--color-sidebar-accent-foreground',
    label: 'Sidebar accent text',
    light: 'oklch(0.235 0.016 285)',
    dark: 'oklch(0.968 0.003 285)',
  },
  {
    name: '--sidebar-border',
    alias: '--color-sidebar-border',
    label: 'Sidebar border',
    light: 'oklch(0.905 0.008 285)',
    dark: 'oklch(1 0.004 285 / 13%)',
  },
  {
    name: '--sidebar-ring',
    alias: '--color-sidebar-ring',
    label: 'Sidebar focus ring',
    light: 'oklch(0.62 0.035 285)',
    dark: 'oklch(0.585 0.038 285)',
  },
] satisfies ColorToken[];

const colorTokenCount = colorTokens.length + chartTokens.length + sidebarTokens.length;

const spacingTokens = [
  ['--spacing-0', '0px'],
  ['--spacing-1', '4px'],
  ['--spacing-2', '8px'],
  ['--spacing-3', '12px'],
  ['--spacing-4', '16px'],
  ['--spacing-5', '20px'],
  ['--spacing-6', '24px'],
  ['--spacing-8', '32px'],
  ['--spacing-10', '40px'],
];

const semanticSpacingTokens = [
  ['--spacing-xs', 'var(--spacing-1)', '4px'],
  ['--spacing-sm', 'var(--spacing-2)', '8px'],
  ['--spacing-md', 'var(--spacing-3)', '12px'],
  ['--spacing-lg', 'var(--spacing-4)', '16px'],
  ['--spacing-xl', 'var(--spacing-5)', '20px'],
  ['--spacing-2xl', 'var(--spacing-6)', '24px'],
];

const sizeTokens = [
  ['--size-xs', '24px'],
  ['--size-sm', '32px'],
  ['--size-md', '36px'],
  ['--size-lg', '40px'],
  ['--size-xl', '48px'],
];

const radiusTokens = [
  ['--radius', '0.625rem'],
  ['--radius-none', '0'],
  ['--radius-xs', 'calc(var(--radius) * 0.4)'],
  ['--radius-sm', 'calc(var(--radius) * 0.6)'],
  ['--radius-md', 'calc(var(--radius) * 0.8)'],
  ['--radius-lg', 'var(--radius)'],
  ['--radius-xl', 'calc(var(--radius) * 1.2)'],
  ['--radius-full', '9999px'],
];

const typographyTokens = [
  ['--text-xs', '11px', '--line-height-text-xs', '14px'],
  ['--text-sm', '14px', '--line-height-text-sm', '22px'],
  ['--text-md', '16px', '--line-height-text-md', '24px'],
  ['--text-lg', '18px', '--line-height-text-lg', '28px'],
  ['--text-xl', '20px', '--line-height-text-xl', '32px'],
  ['--text-2xl', '24px', '--line-height-text-2xl', '32px'],
  ['--text-3xl', '30px', '--line-height-text-3xl', '36px'],
];

const weightTokens = [
  ['--weight-regular', '400'],
  ['--weight-medium', '500'],
  ['--weight-semibold', '600'],
  ['--weight-bold', '700'],
];

const fontFamilyTokens = [
  [
    '--font-sans',
    "'Noto Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  ],
  [
    '--font-mono',
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  ],
];

const trackingTokens = [
  ['--tracking-text-sm', '-0.01em'],
  ['--tracking-text-xs', '-0.016em'],
];

const borderTokens = [
  ['--border-width-sm', '1px'],
  ['--border-width-md', '2px'],
  ['--border-width-lg', '4px'],
];

const opacityTokens = [
  ['--opacity-disabled', '0.5'],
  ['--opacity-loading', '0.85'],
  ['--opacity-hover', '0.9'],
];

const motionTokens = [
  ['--duration-fast', '150ms'],
  ['--duration-normal', '200ms'],
  ['--duration-slow', '300ms'],
  ['--duration-slower', '450ms'],
  ['--ease-in', 'cubic-bezier(0.4, 0, 1, 1)'],
  ['--ease-out', 'cubic-bezier(0, 0, 0.2, 1)'],
  ['--ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
  ['--ease-spring', 'cubic-bezier(0.32, 0.72, 0, 1)'],
  ['--ease-standard', 'ease'],
  ['--ease-emphasized', 'cubic-bezier(0.22, 1, 0.36, 1)'],
  ['--transition-default', 'var(--duration-normal) var(--ease-in-out)'],
  ['--transition-fast', 'var(--duration-fast) var(--ease-in-out)'],
  ['--transition-slow', 'var(--duration-slow) var(--ease-in-out)'],
  ['--transition-slower', 'var(--duration-slower) var(--ease-in-out)'],
  ['--transition-spring', 'var(--duration-slower) var(--ease-spring)'],
  ['--transition-emphasized', 'var(--duration-slower) var(--ease-emphasized)'],
];

const animationTokens = [
  ['--animation-pulse', 'moduix-pulse 2.5s ease-in-out infinite'],
  ['--animation-fade-in', 'moduix-fade-in var(--duration-normal) var(--ease-out)'],
  ['--animation-fade-out', 'moduix-fade-out var(--duration-normal) var(--ease-in)'],
  ['--animation-slide-up', 'moduix-slide-up var(--duration-normal) var(--ease-out)'],
  ['--animation-slide-down', 'moduix-slide-down var(--duration-normal) var(--ease-out)'],
  ['--animation-spin', 'moduix-spin 0.75s linear infinite'],
];

const shadowTokens = [
  ['--shadow-sm', '0 2px 4px 0 #0000001a, 0 1px 2px -1px #0000001a'],
  ['--shadow-md', '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a'],
  ['--shadow-lg', '0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a'],
];

const transformTokens = [
  ['--scale-popup', '0.9', 'Dialog, popover, tooltip, menu, preview card, toast, nav menu'],
  ['--scale-dropdown', '0.95', 'Select, combobox, autocomplete'],
];

const zIndexTokens = [
  ['--z-default', '1'],
  ['--z-xs', '5'],
  ['--z-sm', '10'],
  ['--z-md', '20'],
  ['--z-lg', '30'],
  ['--z-xl', '40'],
  ['--z-backdrop', '40'],
  ['--z-modal', '50'],
  ['--z-popup', '60'],
  ['--z-toast', '70'],
];

const sharedBackdropTokens = [
  ['--backdrop-bg', 'var(--color-overlay)', 'Global backdrop color fallback'],
  ['--backdrop-filter', 'blur(4px)', 'Global backdrop filter fallback'],
  ['--combobox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Combobox'],
  ['--command-palette-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'CommandPalette'],
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Dialog'],
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Drawer'],
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Lightbox'],
  ['--select-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Select'],
  ['--menu-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Menu'],
  ['--preview-card-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'PreviewCard'],
];

const sharedPopupTokens = [
  ['--popup-check-gap', '0.5rem'],
  ['--popup-check-indicator-size', '0.75rem'],
  ['--popup-check-padding-x-start', '0.625rem'],
  ['--popup-group-label-font-size', 'var(--text-xs)'],
  ['--popup-group-label-line-height', 'var(--line-height-text-xs)'],
  ['--popup-group-label-padding-x-end', '0.75rem'],
  ['--popup-group-label-padding-x-start', '0.625rem'],
  ['--popup-group-label-padding-y', '0.35rem'],
  ['--popup-highlight-inset-x', 'var(--spacing-1)'],
  ['--popup-highlight-radius', 'var(--radius-sm)'],
  ['--popup-item-font-size', 'var(--text-sm)'],
  ['--popup-item-line-height', 'var(--line-height-text-sm)'],
  ['--popup-item-min-height', '2rem'],
  ['--popup-item-padding-x-start', '1rem'],
  ['--popup-item-padding-x-end', '1rem'],
  ['--popup-item-padding-y', '0.5rem'],
  ['--popup-list-padding-y', '0.25rem'],
  ['--popup-separator-margin-x-start', '1rem'],
  ['--popup-separator-margin-x-end', '1rem'],
  ['--popup-separator-margin-y', '0.375rem'],
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
              <code>--primary</code>
            </div>
            <div className={styles.mapNode} data-active="true">
              <span>02</span>
              <strong>Semantic aliases</strong>
              <code>--color-primary</code>
            </div>
            <div className={styles.mapNode}>
              <span>03</span>
              <strong>Component variables</strong>
              <code>--button-default-bg</code>
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
              <strong>{sharedBackdropTokens.length + sharedPopupTokens.length}</strong>
              shared defaults
            </span>
          </div>
        </div>
        <div className={styles.stackPanel}>
          <TokenCallout
            title="Semantic aliases"
            code="--color-primary: var(--primary)"
            body="Components read semantic variables while themes override the raw palette."
          />
          <TokenCallout
            title="Shared fallbacks"
            code="--dialog-backdrop-bg -> --backdrop-bg / --backdrop-filter"
            body="Global backdrop color and blur stay centralized, and component-level variables can still opt out."
          />
          <TokenCallout
            title="Scoped themes"
            code=".billing-flow { --size-lg: 36px; }"
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
        note="Backdrop and popup defaults reused across overlay families, with local component tokens layered on top."
      >
        <div className={styles.backdropPreview}>
          <div className={styles.backdropStage}>
            <div className={styles.backdropLayer} />
            <div className={styles.backdropDialog}>
              <strong>Layered UI</strong>
              <span>--backdrop-bg + --backdrop-filter</span>
            </div>
          </div>
          <TokenList title="Backdrop defaults and fallbacks" tokens={sharedBackdropTokens} />
        </div>
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
        <code>{theme === 'light' ? ':root' : '.dark'}</code>
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
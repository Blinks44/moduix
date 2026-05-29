import type { ReactNode } from 'react';
import styles from './tokens-overview.module.css';

const colorTokens = [
  ['--background', 'Canvas', 'oklch(0.985 0.002 260)', 'oklch(0.164 0.006 260)'],
  ['--foreground', 'Text', 'oklch(0.188 0.008 260)', 'oklch(0.972 0.002 255)'],
  ['--card', 'Raised surface', 'oklch(0.998 0.001 260)', 'oklch(0.214 0.009 260)'],
  ['--popover', 'Layer surface', 'oklch(0.998 0.001 260)', 'oklch(0.214 0.009 260)'],
  ['--primary', 'Primary action', 'oklch(0.252 0.014 262)', 'oklch(0.924 0.005 255)'],
  ['--secondary', 'Secondary fill', 'oklch(0.965 0.004 255)', 'oklch(0.268 0.009 260)'],
  ['--muted', 'Subtle fill', 'oklch(0.959 0.004 255)', 'oklch(0.268 0.009 260)'],
  ['--accent', 'Hover fill', 'oklch(0.955 0.008 250)', 'oklch(0.304 0.013 255)'],
  ['--destructive', 'Danger', 'oklch(0.577 0.245 27.325)', 'oklch(0.704 0.191 22.216)'],
  ['--border', 'Borders', 'oklch(0.91 0.006 255)', 'oklch(1 0.002 255 / 12%)'],
  ['--input', 'Input border', 'oklch(0.91 0.006 255)', 'oklch(1 0.002 255 / 16%)'],
  ['--ring', 'Focus ring', 'oklch(0.643 0.028 257)', 'oklch(0.604 0.03 257)'],
  ['--overlay', 'Backdrop base', 'oklch(0.188 0.012 260 / 0.18)', 'oklch(0.112 0.01 260 / 0.72)'],
  [
    '--overlay-foreground',
    'Soft overlay',
    'oklch(0.188 0.012 260 / 0.06)',
    'oklch(0.972 0.002 255 / 0.08)',
  ],
];

const chartTokens = [
  ['--chart-1', 'oklch(0.63 0.154 259)', 'oklch(0.69 0.147 259)'],
  ['--chart-2', 'oklch(0.685 0.117 196)', 'oklch(0.748 0.116 196)'],
  ['--chart-3', 'oklch(0.745 0.167 78)', 'oklch(0.792 0.161 78)'],
  ['--chart-4', 'oklch(0.662 0.179 24)', 'oklch(0.717 0.173 24)'],
  ['--chart-5', 'oklch(0.71 0.132 149)', 'oklch(0.769 0.128 149)'],
];

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
  ['--duration-fast', '100ms'],
  ['--duration-normal', '200ms'],
  ['--duration-slow', '300ms'],
  ['--duration-slower', '500ms'],
  ['--ease-in', 'cubic-bezier(0.4, 0, 1, 1)'],
  ['--ease-out', 'cubic-bezier(0, 0, 0.2, 1)'],
  ['--ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
  ['--ease-spring', 'cubic-bezier(0.32, 0.72, 0, 1)'],
  ['--transition-default', 'var(--duration-normal) var(--ease-in-out)'],
  ['--transition-fast', 'var(--duration-fast) var(--ease-in-out)'],
  ['--transition-slow', 'var(--duration-slow) var(--ease-in-out)'],
  ['--transition-slower', 'var(--duration-slower) var(--ease-in-out)'],
];

const animationTokens = [
  ['--animation-pulse', 'pulse 2s ease-in-out infinite'],
  ['--animation-fade-in', 'fade-in var(--duration-normal) var(--ease-out)'],
  ['--animation-fade-out', 'fade-out var(--duration-normal) var(--ease-in)'],
  ['--animation-slide-up', 'slide-up var(--duration-normal) var(--ease-out)'],
  ['--animation-slide-down', 'slide-down var(--duration-normal) var(--ease-out)'],
  ['--animation-spin', 'spin 0.75s linear infinite'],
];

const shadowTokens = [
  ['--shadow-sm', '0 2px 4px 0 #0000001a, 0 1px 2px -1px #0000001a'],
  ['--shadow-md', '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a'],
  ['--shadow-lg', '0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a'],
];

const transformTokens = [
  ['--scale-popup', '0.9', 'Dialog, popover, tooltip, menu, preview card, toast, nav menu'],
  ['--scale-dropdown', '0.95', 'Select, combobox, autocomplete, context menu root'],
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
  ['--alert-dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'AlertDialog'],
  ['--autocomplete-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Autocomplete'],
  ['--combobox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Combobox'],
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Dialog'],
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Drawer'],
  ['--select-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Select'],
  ['--menu-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Menu'],
  ['--menubar-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Menubar'],
  ['--navigation-menu-backdrop-bg', 'var(--backdrop-bg, transparent)', 'NavigationMenu'],
  ['--popover-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Popover'],
  ['--preview-card-backdrop-bg', 'var(--backdrop-bg, transparent)', 'PreviewCard'],
];

const sharedPopupTokens = [
  ['--popup-item-min-height', '2rem'],
  ['--popup-item-padding-y', '0.5rem'],
  ['--popup-item-padding-x-start', '1rem'],
  ['--popup-item-padding-x-end', '1rem'],
  ['--popup-item-font-size', 'var(--text-sm)'],
  ['--popup-item-line-height', 'var(--line-height-text-sm)'],
  ['--popup-highlight-inset-x', 'var(--spacing-1)'],
  ['--popup-highlight-radius', 'var(--radius-sm)'],
  ['--popup-list-padding-y', '0.25rem'],
  ['--popup-group-label-font-size', 'var(--text-xs)'],
  ['--popup-group-label-padding-y', '0.35rem'],
  ['--popup-check-gap', '0.5rem'],
  ['--popup-check-indicator-size', '0.75rem'],
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
              <strong>{colorTokens.length}</strong>
              color pairs
            </span>
            <span>
              <strong>{spacingTokens.length + semanticSpacingTokens.length}</strong>
              spacing steps
            </span>
            <span>
              <strong>{sharedBackdropTokens.length + sharedPopupTokens.length}</strong>
              shared overrides
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
            code="--dialog-backdrop-bg -> --backdrop-bg -> --color-overlay"
            body="Global decisions stay global, and component-level variables can still opt out."
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
          {colorTokens.map(([name, label, light, dark]) => (
            <ColorCard key={name} name={name} label={label} light={light} dark={dark} />
          ))}
        </div>
        <div className={styles.chartStrip}>
          {chartTokens.map(([name, light, dark]) => {
            const label = name.replace('--chart-', 'Chart ');

            return (
              <article className={styles.chartToken} key={name}>
                <div className={styles.tokenMeta}>
                  <strong>{label}</strong>
                  <code>{name}</code>
                </div>
                <div className={styles.swatches}>
                  <div className={styles.swatchBlock}>
                    <span className={styles.chartLight} />
                    <small>Light</small>
                    <code>{light}</code>
                  </div>
                  <div className={styles.swatchBlock}>
                    <span className={styles.chartDark} />
                    <small>Dark</small>
                    <code>{dark}</code>
                  </div>
                </div>
              </article>
            );
          })}
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

      <Section title="Typography" note="Font sizes, line heights, weights, and tracking tokens.">
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
          <span className={styles.tokenPill}>
            <code>--tracking-text-sm</code>
            <strong>-0.01em</strong>
          </span>
          <span className={styles.tokenPill}>
            <code>--tracking-text-xs</code>
            <strong>-0.016em</strong>
          </span>
        </div>
      </Section>

      <Section
        title="Motion"
        note="Durations, easing, transition shorthands, and reusable animations."
      >
        <div className={styles.motionGrid}>
          <TokenList title="Transition tokens" tokens={motionTokens} />
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
        title="Shared Component Variables"
        note="Global overrides used by multiple components."
      >
        <div className={styles.backdropPreview}>
          <div className={styles.backdropStage}>
            <div className={styles.backdropLayer} />
            <div className={styles.backdropDialog}>
              <strong>Layered UI</strong>
              <span>--backdrop-bg</span>
            </div>
          </div>
          <TokenList title="Backdrop variables" tokens={sharedBackdropTokens} />
        </div>
        <TokenList title="Popup menu variables" tokens={sharedPopupTokens} />
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

function ColorCard({
  name,
  label,
  light,
  dark,
}: {
  name: string;
  label: string;
  light: string;
  dark: string;
}) {
  return (
    <article className={styles.colorCard}>
      <div className={styles.tokenMeta}>
        <strong>{label}</strong>
        <code>{name}</code>
      </div>
      <div className={styles.swatches}>
        <div className={styles.swatchBlock}>
          <span />
          <small>Light</small>
          <code>{light}</code>
        </div>
        <div className={styles.swatchBlock}>
          <span />
          <small>Dark</small>
          <code>{dark}</code>
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
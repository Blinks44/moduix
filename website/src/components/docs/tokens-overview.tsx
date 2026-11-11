import { useI18n } from '@rspress/core/runtime';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './tokens-overview.module.css';

type ColorToken = {
  name: string;
  labelKey: keyof typeof import('i18n');
};

const colorTokens = [
  {
    name: '--moduix-background',
    labelKey: 'tokensOverviewColorCanvas',
  },
  {
    name: '--moduix-foreground',
    labelKey: 'tokensOverviewColorCanvasText',
  },
  {
    name: '--moduix-card',
    labelKey: 'tokensOverviewColorRaisedSurface',
  },
  {
    name: '--moduix-card-foreground',
    labelKey: 'tokensOverviewColorRaisedText',
  },
  {
    name: '--moduix-popover',
    labelKey: 'tokensOverviewColorLayerSurface',
  },
  {
    name: '--moduix-popover-foreground',
    labelKey: 'tokensOverviewColorLayerText',
  },
  {
    name: '--moduix-primary',
    labelKey: 'tokensOverviewColorPrimaryAction',
  },
  {
    name: '--moduix-primary-foreground',
    labelKey: 'tokensOverviewColorPrimaryText',
  },
  {
    name: '--moduix-secondary',
    labelKey: 'tokensOverviewColorSecondaryFill',
  },
  {
    name: '--moduix-secondary-foreground',
    labelKey: 'tokensOverviewColorSecondaryText',
  },
  {
    name: '--moduix-muted',
    labelKey: 'tokensOverviewColorSubtleFill',
  },
  {
    name: '--moduix-muted-foreground',
    labelKey: 'tokensOverviewColorSubtleText',
  },
  {
    name: '--moduix-accent',
    labelKey: 'tokensOverviewColorHoverFill',
  },
  {
    name: '--moduix-accent-foreground',
    labelKey: 'tokensOverviewColorHoverText',
  },
  {
    name: '--moduix-destructive',
    labelKey: 'tokensOverviewColorDanger',
  },
  {
    name: '--moduix-destructive-foreground',
    labelKey: 'tokensOverviewColorDangerText',
  },
  {
    name: '--moduix-success',
    labelKey: 'tokensOverviewColorSuccess',
  },
  {
    name: '--moduix-warning',
    labelKey: 'tokensOverviewColorWarning',
  },
  {
    name: '--moduix-border',
    labelKey: 'tokensOverviewColorBorders',
  },
  {
    name: '--moduix-input',
    labelKey: 'tokensOverviewColorInputBorder',
  },
  {
    name: '--moduix-ring',
    labelKey: 'tokensOverviewColorFocusRing',
  },
  {
    name: '--moduix-overlay',
    labelKey: 'tokensOverviewColorBackdropBase',
  },
] satisfies ColorToken[];

const chartTokens = [
  {
    name: '--moduix-chart-1',
    labelKey: 'tokensOverviewColorChart1',
  },
  {
    name: '--moduix-chart-2',
    labelKey: 'tokensOverviewColorChart2',
  },
  {
    name: '--moduix-chart-3',
    labelKey: 'tokensOverviewColorChart3',
  },
  {
    name: '--moduix-chart-4',
    labelKey: 'tokensOverviewColorChart4',
  },
  {
    name: '--moduix-chart-5',
    labelKey: 'tokensOverviewColorChart5',
  },
  {
    name: '--moduix-chart-6',
    labelKey: 'tokensOverviewColorChart6',
  },
  {
    name: '--moduix-chart-7',
    labelKey: 'tokensOverviewColorChart7',
  },
  {
    name: '--moduix-chart-8',
    labelKey: 'tokensOverviewColorChart8',
  },
] satisfies ColorToken[];

const sidebarTokens = [
  {
    name: '--moduix-sidebar',
    labelKey: 'tokensOverviewColorSidebarSurface',
  },
  {
    name: '--moduix-sidebar-foreground',
    labelKey: 'tokensOverviewColorSidebarText',
  },
  {
    name: '--moduix-sidebar-accent',
    labelKey: 'tokensOverviewColorSidebarAccent',
  },
  {
    name: '--moduix-sidebar-accent-foreground',
    labelKey: 'tokensOverviewColorSidebarAccentText',
  },
  {
    name: '--moduix-sidebar-border',
    labelKey: 'tokensOverviewColorSidebarBorder',
  },
  {
    name: '--moduix-sidebar-ring',
    labelKey: 'tokensOverviewColorSidebarFocusRing',
  },
] satisfies ColorToken[];

const colorTokenCount = colorTokens.length + chartTokens.length + sidebarTokens.length;

const spacingTokens = [
  '--moduix-spacing-0',
  '--moduix-spacing-0-5',
  '--moduix-spacing-1',
  '--moduix-spacing-1-5',
  '--moduix-spacing-2',
  '--moduix-spacing-2-5',
  '--moduix-spacing-3',
  '--moduix-spacing-3-5',
  '--moduix-spacing-4',
  '--moduix-spacing-4-5',
  '--moduix-spacing-5',
  '--moduix-spacing-6',
  '--moduix-spacing-7',
  '--moduix-spacing-8',
  '--moduix-spacing-10',
];

const sizeTokens = [
  '--moduix-size-xs',
  '--moduix-size-sm',
  '--moduix-size-md',
  '--moduix-size-lg',
  '--moduix-size-xl',
];

const radiusTokens = [
  '--moduix-radius',
  '--moduix-radius-none',
  '--moduix-radius-xs',
  '--moduix-radius-sm',
  '--moduix-radius-md',
  '--moduix-radius-lg',
  '--moduix-radius-xl',
  '--moduix-radius-full',
];

const typographyTokens = [
  ['--moduix-text-xs', '--moduix-line-height-text-xs'],
  ['--moduix-text-sm', '--moduix-line-height-text-sm'],
  ['--moduix-text-md', '--moduix-line-height-text-md'],
  ['--moduix-text-lg', '--moduix-line-height-text-lg'],
  ['--moduix-text-xl', '--moduix-line-height-text-xl'],
  ['--moduix-text-2xl', '--moduix-line-height-text-2xl'],
  ['--moduix-text-3xl', '--moduix-line-height-text-3xl'],
];

const weightTokens = [
  '--moduix-weight-regular',
  '--moduix-weight-medium',
  '--moduix-weight-semibold',
  '--moduix-weight-bold',
];

const fontFamilyTokens = ['--moduix-font-sans', '--moduix-font-mono'];

const borderTokens = [
  '--moduix-border-width-sm',
  '--moduix-border-width-md',
  '--moduix-border-width-lg',
  '--moduix-focus-ring-width',
  '--moduix-focus-ring-inset-width',
  '--moduix-focus-ring-offset',
  '--moduix-focus-ring-inset-offset',
  '--moduix-focus-ring-halo-width',
];

const opacityTokens = ['--moduix-opacity-disabled', '--moduix-opacity-hover'];

const motionTokens = [
  '--moduix-duration-fast',
  '--moduix-duration-normal',
  '--moduix-duration-slow',
  '--moduix-duration-slower',
  '--moduix-ease-in',
  '--moduix-ease-out',
  '--moduix-ease-in-out',
  '--moduix-ease-spring',
  '--moduix-transition-default',
  '--moduix-transition-fast',
  '--moduix-transition-slow',
  '--moduix-transition-slower',
  '--moduix-transition-spring',
];

const animationTokens = [
  '--moduix-animation-pulse',
  '--moduix-animation-fade-in',
  '--moduix-animation-fade-out',
  '--moduix-animation-slide-up',
  '--moduix-animation-slide-down',
  '--moduix-animation-spin',
];

const shadowTokens = ['--moduix-shadow-sm', '--moduix-shadow-md', '--moduix-shadow-lg'];

const transformTokens = [
  ['--moduix-scale-popup', '', 'tokensOverviewPopupScaleConsumers'],
  ['--moduix-scale-dropdown', '', 'tokensOverviewDropdownScaleConsumers'],
];

const zIndexTokens = [
  '--moduix-z-backdrop',
  '--moduix-z-modal',
  '--moduix-z-popup',
  '--moduix-z-tour',
  '--moduix-z-toast',
];

const sharedBackdropTokens = [
  ['--moduix-backdrop-bg', 'var(--moduix-overlay)', 'tokensOverviewGlobalBackdropColorFallback'],
  ['--moduix-backdrop-filter', 'blur(4px)', 'tokensOverviewGlobalBackdropFilterFallback'],
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
  [
    '--moduix-popup-motion-duration',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupContentDuration',
  ],
  [
    '--moduix-popup-motion-easing',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupContentEasing',
  ],
  [
    '--moduix-popup-motion-starting-opacity',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupEntryOpacity',
  ],
  [
    '--moduix-popup-motion-starting-scale',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupEntryScale',
  ],
  [
    '--moduix-popup-motion-starting-translate-x',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupEntryHorizontalOffset',
  ],
  [
    '--moduix-popup-motion-starting-translate-y',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupEntryVerticalOffset',
  ],
  [
    '--moduix-popup-motion-ending-opacity',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupExitOpacity',
  ],
  [
    '--moduix-popup-motion-ending-scale',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupExitScale',
  ],
  [
    '--moduix-popup-motion-ending-translate-x',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupExitHorizontalOffset',
  ],
  [
    '--moduix-popup-motion-ending-translate-y',
    'tokensOverviewComponentDefault',
    'tokensOverviewPopupExitVerticalOffset',
  ],
];

export function TokensOverview() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <div className={styles.root}>
      <section className={styles.heroGrid}>
        <div className={styles.heroPanel}>
          <div className={styles.heroHeader}>
            <span>{t('tokensOverviewTokenArchitecture')}</span>
            <code>:root</code>
          </div>
          <div className={styles.systemMap} aria-hidden="true">
            <div className={styles.mapNode}>
              <span>01</span>
              <strong>{t('tokensOverviewRawValues')}</strong>
              <code>--moduix-primary</code>
            </div>
            <div className={styles.mapNode} data-active="true">
              <span>02</span>
              <strong>{t('tokensOverviewSharedFallbacks')}</strong>
              <code>--moduix-popup-item-min-height</code>
            </div>
            <div className={styles.mapNode}>
              <span>03</span>
              <strong>{t('tokensOverviewComponentVariables')}</strong>
              <code>--moduix-button-bg</code>
            </div>
          </div>
          <div className={styles.heroStats} aria-label={t('tokensOverviewTokenGroupsSummary')}>
            <span>
              <strong>{colorTokenCount}</strong>
              {t('tokensOverviewColorTokens')}
            </span>
            <span>
              <strong>{spacingTokens.length}</strong>
              {t('tokensOverviewSpacingSteps')}
            </span>
            <span>
              <strong>
                {sharedBackdropTokens.length +
                  sharedPopupTokens.length +
                  sharedPopupMotionTokens.length}
              </strong>
              {t('tokensOverviewSharedDefaults')}
            </span>
          </div>
        </div>
        <div className={styles.stackPanel}>
          <TokenCallout
            title={t('tokensOverviewSharedFallbacks')}
            code="Dialog, Drawer, Tour -> --moduix-backdrop-bg / --moduix-backdrop-filter"
            body={t('tokensOverviewCentralizedBackdrop')}
          />
          <TokenCallout
            title={t('tokensOverviewScopedThemes')}
            code=".billing-flow { --moduix-size-lg: 36px; }"
            body={t('tokensOverviewParentScope')}
          />
        </div>
      </section>

      <Section title={t('tokensOverviewColors')} note={t('tokensOverviewColorThemeValues')}>
        <div className={styles.themePreviewGrid}>
          <ThemePreview theme="light" />
          <ThemePreview theme="dark" />
        </div>
        <div className={styles.colorLegend} aria-hidden="true">
          <span>
            <i data-moduix-color-scheme="light" /> {t('themePreviewLight')}
          </span>
          <span>
            <i data-moduix-color-scheme="dark" /> {t('themePreviewDark')}
          </span>
        </div>
        <div className={styles.colorGrid}>
          {colorTokens.map((token) => (
            <ColorCard key={token.name} token={token} />
          ))}
        </div>
        <div className={styles.chartStrip}>
          {chartTokens.map((token) => (
            <ColorCard key={token.name} token={token} className={styles.chartToken} />
          ))}
        </div>
        <div className={styles.colorGrid}>
          {sidebarTokens.map((token) => (
            <ColorCard key={token.name} token={token} />
          ))}
        </div>
      </Section>

      <Section title={t('tokensOverviewSpacingSize')} note={t('tokensOverviewSizingScale')}>
        <div className={styles.measureGrid}>
          <TokenScale
            title={t('tokensOverviewPrimitiveSpacing')}
            tokens={spacingTokens}
            variant="bars"
          />
          <TokenScale title={t('tokensOverviewControlSize')} tokens={sizeTokens} variant="blocks" />
        </div>
      </Section>

      <Section title={t('tokensOverviewShapeBorders')} note={t('tokensOverviewRadiusAndBorders')}>
        <div className={styles.measureGrid}>
          <RadiusScale />
          <TokenScale
            title={t('tokensOverviewBorderWidths')}
            tokens={borderTokens}
            variant="lines"
          />
          <TokenScale title={t('tokensOverviewOpacity')} tokens={opacityTokens} variant="opacity" />
        </div>
      </Section>

      <Section title={t('tokensOverviewTypography')} note={t('tokensOverviewTypographyNote')}>
        <div className={styles.typeGrid}>
          {typographyTokens.map(([textName, lineName]) => (
            <div className={styles.typeRow} key={textName}>
              <span
                className={styles.typeSample}
                style={{ fontSize: `var(${textName})`, lineHeight: `var(${lineName})` }}
              >
                Aa
              </span>
              <div>
                <code>{textName}</code>
                <small>
                  <TokenValue name={textName} property="font-size" /> /{' '}
                  <TokenValue name={lineName} property="line-height" />
                </small>
              </div>
              <code>{lineName}</code>
            </div>
          ))}
        </div>
        <div className={styles.pillGrid}>
          {weightTokens.map((name) => (
            <span className={styles.tokenPill} key={name}>
              <code>{name}</code>
              <strong style={{ fontWeight: `var(${name})` }}>
                <TokenValue name={name} property="font-weight" />
              </strong>
            </span>
          ))}
        </div>
        <TokenList
          title={t('tokensOverviewFontFamilies')}
          tokens={fontFamilyTokens.map((name) => [name])}
        />
      </Section>

      <Section title={t('tokensOverviewMotion')} note={t('tokensOverviewMotionNote')}>
        <div className={styles.motionGrid}>
          <TokenList
            title={t('tokensOverviewTimingAndTransitionTokens')}
            tokens={motionTokens.map((name) => [name])}
          />
          <TokenList
            title={t('tokensOverviewAnimationTokens')}
            tokens={animationTokens.map((name) => [name])}
          />
        </div>
      </Section>

      <Section title={t('tokensOverviewElevationLayers')} note={t('tokensOverviewElevation')}>
        <div className={styles.layerGrid}>
          {shadowTokens.map((name) => (
            <div className={styles.shadowCard} style={tokenStyle(name)} key={name}>
              <code>{name}</code>
              <small>
                <TokenValue name={name} />
              </small>
            </div>
          ))}
        </div>
        <div className={styles.motionGrid}>
          <TokenList title={t('tokensOverviewTransforms')} tokens={transformTokens} />
          <TokenList
            title={t('tokensOverviewZIndex')}
            tokens={zIndexTokens.map((name) => [name])}
          />
        </div>
      </Section>

      <Section
        title={t('tokensOverviewSharedComponentDefaults')}
        note={t('tokensOverviewOverlayDefaults')}
      >
        <div className={styles.backdropPreview}>
          <div className={styles.backdropStage}>
            <div className={styles.backdropLayer} />
            <div className={styles.backdropDialog}>
              <strong>{t('tokensOverviewLayeredUi')}</strong>
              <span>--moduix-backdrop-bg + --moduix-backdrop-filter</span>
            </div>
          </div>
          <TokenList
            title={t('tokensOverviewBackdropDefaultsAndFallbacks')}
            tokens={sharedBackdropTokens}
          />
        </div>
        <TokenList
          title={t('tokensOverviewSharedPopupContentMotion')}
          tokens={sharedPopupMotionTokens}
        />
        <TokenList title={t('tokensOverviewSharedPopupMenuDefaults')} tokens={sharedPopupTokens} />
      </Section>
    </div>
  );
}

function ThemePreview({ theme }: { theme: 'light' | 'dark' }) {
  const t = useI18n<typeof import('i18n')>();
  const title = t(theme === 'light' ? 'tokensOverviewLightTheme' : 'tokensOverviewDarkTheme');

  return (
    <article className={styles.themeCard} data-moduix-color-scheme={theme}>
      <div className={styles.themeTopbar}>
        <span>{title}</span>
        <code>{theme === 'light' ? ':root' : "[data-moduix-color-scheme='dark']"}</code>
      </div>
      <div className={styles.themeCanvas}>
        <div className={styles.themeSurface}>
          <span className={styles.themeEyebrow}>{t('tokensOverviewPreview')}</span>
          <strong>{t('tokensOverviewDialogSurface')}</strong>
          <p>{t('tokensOverviewPreviewDescription')}</p>
          <div className={styles.themeControls}>
            <span>{t('tokensOverviewCancel')}</span>
            <strong>{t('tokensOverviewApply')}</strong>
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
  token,
  className = styles.colorCard,
}: {
  token: ColorToken;
  className?: string;
}) {
  const t = useI18n<typeof import('i18n')>();

  return (
    <article className={className}>
      <div className={styles.tokenMeta}>
        <strong>{t(token.labelKey)}</strong>
        <code>{token.name}</code>
      </div>
      <div className={styles.swatches}>
        {(['light', 'dark'] as const).map((scheme) => (
          <div className={styles.swatchBlock} data-moduix-color-scheme={scheme} key={scheme}>
            <span style={{ background: `var(${token.name})` }} />
            <small>{t(scheme === 'light' ? 'themePreviewLight' : 'themePreviewDark')}</small>
            <code>
              <TokenValue name={token.name} property="color" />
            </code>
          </div>
        ))}
      </div>
    </article>
  );
}

function tokenStyle(name: string) {
  return { '--token': `var(${name})` } as CSSProperties;
}

function TokenScale({
  title,
  tokens,
  variant,
}: {
  title: string;
  tokens: string[];
  variant: 'bars' | 'blocks' | 'lines' | 'opacity';
}) {
  return (
    <div className={styles.scaleCard} data-variant={variant}>
      <h3>{title}</h3>
      <div className={styles.scaleList}>
        {tokens.map((name) => (
          <div className={styles.scaleRow} style={tokenStyle(name)} key={name}>
            <span className={styles.scaleShape} />
            <code>{name}</code>
            <small>
              <TokenValue
                name={name}
                property={variant === 'opacity' ? 'opacity' : 'margin-left'}
              />
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusScale() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <div className={styles.scaleCard}>
      <h3>{t('tokensOverviewRadius')}</h3>
      <div className={styles.radiusGrid}>
        {radiusTokens.map((name) => (
          <div className={styles.radiusToken} style={tokenStyle(name)} key={name}>
            <span />
            <code>{name}</code>
            <small>
              <TokenValue name={name} property="border-top-left-radius" />
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

// An entry without a value reads it from the rendered CSS; shared component defaults pass the
// documented fallback because their tokens are `initial` until a consumer sets them.
function TokenList({ title, tokens }: { title: string; tokens: string[][] }) {
  const t = useI18n<typeof import('i18n')>();
  const localize = (value: string) =>
    value.startsWith('tokensOverview') ? t(value as keyof typeof import('i18n')) : value;

  return (
    <div className={styles.tokenList}>
      <h3>{title}</h3>
      {tokens.map(([name, value, note]) => (
        <div className={styles.tokenLine} key={name}>
          <code>{name}</code>
          <span>{value ? localize(value) : <TokenValue name={name} />}</span>
          {note ? <small>{localize(note)}</small> : null}
        </div>
      ))}
    </div>
  );
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-moduix-theme', 'data-moduix-color-scheme'],
  });
  return () => observer.disconnect();
}

function getThemeKey() {
  const { moduixTheme, moduixColorScheme } = document.documentElement.dataset;
  return `${moduixTheme}/${moduixColorScheme}`;
}

// Shows what a token resolves to on this page, so the values follow the foundation CSS, the active
// preset, and the surrounding color scheme. `property` resolves it through a real CSS property
// (lengths to pixels, colors for the scheme); without it the custom property value is shown.
function TokenValue({ name, property }: { name: string; property?: string }) {
  const probe = useRef<HTMLSpanElement>(null);
  const themeKey = useSyncExternalStore(subscribeToTheme, getThemeKey, () => '');
  const [value, setValue] = useState('');

  useEffect(() => {
    const element = probe.current;
    if (!element) return;
    if (property) element.style.setProperty(property, `var(${name})`);
    const style = getComputedStyle(element);
    setValue(style.getPropertyValue(property ?? name).trim());
  }, [name, property, themeKey]);

  return (
    <>
      {value}
      <span ref={probe} className={styles.probe} aria-hidden="true" />
    </>
  );
}
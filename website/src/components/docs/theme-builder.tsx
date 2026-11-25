import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/react/alert';
import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import {
  Dialog,
  DialogBody,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from '@moduix/react/dialog';
import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { NativeSelect } from '@moduix/react/native-select';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/react/progress-linear';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@moduix/react/tabs';
import { Textarea } from '@moduix/react/textarea';
import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime } from '@rspress/core/theme';
import { Check, Link2, RotateCcw, Upload } from 'lucide-react';
import {
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import contrastCss from '../../../../packages/foundation/src/presets/contrast.css?raw';
import denseCss from '../../../../packages/foundation/src/presets/dense.css?raw';
import softCss from '../../../../packages/foundation/src/presets/soft.css?raw';
import colorsCss from '../../../../packages/foundation/src/styles/colors.css?raw';
import sizingCss from '../../../../packages/foundation/src/styles/sizing.css?raw';
import spacingCss from '../../../../packages/foundation/src/styles/spacing.css?raw';
import { ColorControl, RangeControl, toHex } from '../mdx/customize';
import { useExampleSelection } from '../mdx/example-panel';
import styles from './theme-builder.module.css';

// Theme builder page: controls layer token overrides on a preset, the preview renders them,
// users can apply the theme site-wide or share it via URL, and export CSS or Tailwind @theme.
type Tokens = Record<string, string>;
type Density = 'compact' | 'default' | 'comfortable';
type ExportFormat = 'css' | 'tailwind';

const declarations = (css: string): Tokens =>
  Object.fromEntries(
    [...css.matchAll(/(--moduix-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );

const presets = {
  calm: { title: 'Calm', hue: 285, density: 'default', tokens: {} },
  dense: { title: 'Dense', hue: 255, density: 'compact', tokens: declarations(denseCss) },
  soft: { title: 'Soft', hue: 320, density: 'comfortable', tokens: declarations(softCss) },
  contrast: { title: 'Contrast', hue: 250, density: 'default', tokens: declarations(contrastCss) },
} satisfies Record<string, { title: string; hue: number; density: Density; tokens: Tokens }>;
type Preset = keyof typeof presets;

const fontOptions = [
  { value: 'default', label: 'Default (System / Theme)', stack: '' },
  {
    value: 'inter',
    label: 'Inter',
    stack: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  {
    value: 'geist',
    label: 'Geist Sans',
    stack: "'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  {
    value: 'jakarta',
    label: 'Plus Jakarta Sans',
    stack: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    value: 'ibm',
    label: 'IBM Plex Sans',
    stack: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    value: 'mono',
    label: 'Monospace UI',
    stack: "ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
  },
] as const;
type FontChoice = (typeof fontOptions)[number]['value'];

const calmColors = declarations(colorsCss);

// Calm neutrals all use hue 285, so a new hue keeps their lightness and chroma.
const neutrals = (hue: number): Tokens =>
  Object.fromEntries(
    Object.entries(calmColors)
      .filter(([, value]) => / 285[ )]/.test(value))
      .map(([name, value]) => [name, value.replace(/ 285(?=[ )])/g, ` ${hue}`)]),
  );

// Density takes the spacing and control sizes of Dense, Calm or Soft; Soft keeps the Calm steps it skips.
const scale = (css: string): Tokens =>
  Object.fromEntries(
    Object.entries(declarations(css)).filter(([name]) => /^--moduix-(spacing|size)-/.test(name)),
  );
const calmScale = scale(spacingCss + sizingCss);
const densities: Record<Density, Tokens> = {
  compact: scale(denseCss),
  default: calmScale,
  comfortable: scale(softCss),
};

const densityTokens = (density: Density): Tokens =>
  Object.fromEntries(
    Object.keys(densities.compact).map((name) => [
      name,
      densities[density][name] ?? calmScale[name],
    ]),
  );

function hexToOklch(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    c: Math.hypot(a, bb),
    h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360,
  };
}

function colorPair(hex: string, tokenName: string, withForeground = true): Tokens {
  const { l, c, h } = hexToOklch(hex);
  const dark = { l: Math.min(Math.max(l + 0.22, 0.7), 0.84), c: c * 0.85 };
  const color = (lightness: number, chroma: number, hueOffset = 0) =>
    `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${((h + hueOffset + 360) % 360).toFixed(1)})`;
  const foreground = (lightness: number) =>
    lightness > 0.65 ? color(0.2, 0.03) : color(0.985, 0.01);
  const result: Tokens = {
    [tokenName]: `light-dark(${color(l, c)}, ${color(dark.l, dark.c)})`,
  };
  if (withForeground) {
    result[`${tokenName}-foreground`] = `light-dark(${foreground(l)}, ${foreground(dark.l)})`;
  }
  return result;
}

function chartTokens(hex: string): Tokens {
  const { l, c, h } = hexToOklch(hex);
  const make = (offset: number, lightnessShift = 0) => {
    const lightL = Math.min(Math.max(l + lightnessShift, 0.42), 0.74);
    const darkL = Math.min(Math.max(lightL + 0.14, 0.64), 0.84);
    const hue = ((h + offset + 360) % 360).toFixed(1);
    return `light-dark(oklch(${lightL.toFixed(3)} ${c.toFixed(3)} ${hue}), oklch(${darkL.toFixed(3)} ${(c * 0.9).toFixed(3)} ${hue}))`;
  };
  return {
    '--moduix-chart-1': make(0, 0),
    '--moduix-chart-2': make(36, 0.04),
    '--moduix-chart-3': make(-38, -0.02),
    '--moduix-chart-4': make(78, 0.06),
    '--moduix-chart-5': make(135, 0.02),
  };
}

const remToPx = (value: string | undefined) => Math.round(parseFloat(value ?? '0.625') * 16);

// Maps a shadcn or tweakcn theme onto moduix tokens: `:root` and `.dark` values become light-dark().
function parseShadcn(css: string): Tokens {
  const block = (selector: string) =>
    css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
  const vars = (source: string) =>
    Object.fromEntries(
      [...source.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [
        name,
        // Older shadcn themes store bare HSL channels.
        /^[\d.]+ [\d.]+% [\d.]+%$/.test(value.trim()) ? `hsl(${value.trim()})` : value.trim(),
      ]),
    );
  const light = vars(block(':root'));
  const dark = vars(block('\\.dark'));
  const tokens: Tokens = {};
  for (const [name, value] of Object.entries(light)) {
    if (name === 'radius') tokens['--moduix-radius'] = value;
    else if (`--moduix-${name}` in calmColors) {
      tokens[`--moduix-${name}`] =
        dark[name] && dark[name] !== value ? `light-dark(${value}, ${dark[name]})` : value;
    }
  }
  return tokens;
}

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX_COLOR_RE.test(value);
}

const appliedSiteKeys = new Set<string>();

function formatTailwindTheme(tokens: Tokens, framework: string) {
  const pkg = `@moduix/${framework}-tailwind`;
  const themeLines: string[] = [];
  for (const [name, value] of Object.entries(tokens)) {
    if (name === '--moduix-radius') {
      themeLines.push(`  --radius-md: ${value};`);
    } else if (name === '--moduix-font-sans') {
      themeLines.push(`  --font-sans: ${value};`);
    } else if (name.startsWith('--moduix-shadow-')) {
      const short = name.slice('--moduix-shadow-'.length);
      themeLines.push(`  --shadow-${short}: var(${name});`);
    } else if (
      name.startsWith('--moduix-') &&
      !name.startsWith('--moduix-spacing-') &&
      !name.startsWith('--moduix-size-')
    ) {
      const short = name.slice('--moduix-'.length);
      themeLines.push(`  --color-${short}: var(${name});`);
    }
  }
  const overrides =
    Object.entries(tokens)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n') || '  /* No changes from Calm yet */';

  return [
    '/* styles.css · Tailwind CSS v4 */',
    `@import '${pkg}/style.css';`,
    "@import 'tailwindcss';",
    `@source '../node_modules/${pkg}/dist/components';`,
    '',
    '[data-moduix-theme="brand"] {',
    overrides,
    '}',
    '',
    '@theme inline {',
    ...(themeLines.length ? themeLines : ['  /* Customize controls above to map brand tokens */']),
    '}',
  ].join('\n');
}

function ImportDialog({ onImport }: { onImport: (tokens: Tokens) => void }) {
  const t = useI18n<typeof import('i18n')>();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('');
  const parsed = parseShadcn(source);
  const count = Object.keys(parsed).length;

  return (
    <Dialog open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Button variant="outline" className={styles.import} onClick={() => setOpen(true)}>
        <Upload aria-hidden="true" />
        {t('themeBuilderImport')}
      </Button>
      <DialogPanel className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>{t('themeBuilderImportTitle')}</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>{t('themeBuilderImportText')}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel>{t('themeBuilderImportLabel')}</FieldLabel>
            <Textarea
              className={styles.source}
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder={':root {\n  --primary: oklch(0.51 0.09 185);\n}'}
              rows={10}
            />
            <FieldHelperText>
              {t('themeBuilderImportFound').replace('{count}', String(count))}
            </FieldHelperText>
          </Field>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('homeDemoCancel')}
          </Button>
          <Button
            disabled={!count}
            onClick={() => {
              onImport(parsed);
              setOpen(false);
            }}
          >
            {t('themeBuilderImportAction')}
          </Button>
        </DialogFooter>
      </DialogPanel>
    </Dialog>
  );
}

const sampleOrders = [
  {
    id: 'INV-204',
    customer: 'A. Lovelace',
    status: 'Paid',
    variant: 'success' as const,
    total: '$420',
  },
  {
    id: 'INV-205',
    customer: 'G. Hopper',
    status: 'Pending',
    variant: 'warning' as const,
    total: '$190',
  },
  {
    id: 'INV-206',
    customer: 'K. Thompson',
    status: 'Failed',
    variant: 'destructive' as const,
    total: '$85',
  },
];

const chartSeries = [
  { label: 'Mon', pct: 58, color: 'var(--moduix-chart-1, var(--moduix-primary))' },
  { label: 'Tue', pct: 82, color: 'var(--moduix-chart-2, var(--moduix-primary))' },
  { label: 'Wed', pct: 66, color: 'var(--moduix-chart-3, var(--moduix-primary))' },
  { label: 'Thu', pct: 94, color: 'var(--moduix-chart-4, var(--moduix-primary))' },
  { label: 'Fri', pct: 74, color: 'var(--moduix-chart-5, var(--moduix-primary))' },
];

function Preview({ mode, base, tokens }: { mode: 'light' | 'dark'; base: Preset; tokens: Tokens }) {
  const t = useI18n<typeof import('i18n')>();
  const [quietHours, setQuietHours] = useState([22, 31]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const hour = (value: number) => `${String(value % 24).padStart(2, '0')}:00`;

  return (
    <>
      <div className={styles.card}>
        <div>
          <p className={styles.title}>{t('homeDemoTitle')}</p>
          <p className={styles.text}>{t('homeDemoText')}</p>
        </div>
        {(
          [
            ['homeDemoProduct', true],
            ['homeDemoSecurity', true],
            ['homeDemoDigest', false],
          ] as const
        ).map(([key, checked]) => (
          <Switch key={key} defaultChecked={checked} className={styles.switch}>
            <SwitchLabel>{t(key)}</SwitchLabel>
            <SwitchControl />
            <SwitchHiddenInput />
          </Switch>
        ))}
        <Slider
          className={styles.quietHours}
          value={quietHours}
          onValueChange={(details) => setQuietHours(details.value)}
          min={18}
          max={34}
          getAriaValueText={({ value }) => hour(value)}
        >
          <div className={styles.sliderHeader}>
            <SliderLabel>{t('homeDemoQuiet')}</SliderLabel>
            <SliderValueText>{quietHours.map(hour).join(' – ')}</SliderValueText>
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumbs />
          </SliderControl>
        </Slider>
        <div className={styles.actions}>
          <Button variant="outline" size="sm">
            {t('homeDemoCancel')}
          </Button>
          <Button size="sm">{t('homeDemoSave')}</Button>
        </div>
      </div>

      <div className={styles.card}>
        <div>
          <p className={styles.title}>{t('themeBuilderSignIn')}</p>
          <p className={styles.text}>{t('themeBuilderSignInText')}</p>
        </div>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input defaultValue="ada@moduix.dev" />
        </Field>
        <Checkbox defaultChecked>
          <CheckboxControl />
          <CheckboxLabel>{t('homeThemeRemember')}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
        <SegmentGroup defaultValue="monthly" aria-label={t('themeBuilderSignIn')}>
          <SegmentGroupIndicator />
          <SegmentGroupItems
            items={[
              { value: 'monthly', label: t('homeThemeMonthly') },
              { value: 'yearly', label: t('homeThemeYearly') },
            ]}
          />
        </SegmentGroup>
        <Button>{t('homeThemeContinue')}</Button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.title}>Status &amp; Metrics</p>
            <p className={styles.text}>Semantic alerts, badges, tabs, and chart tokens.</p>
          </div>
        </div>
        <div className={styles.badgeRow}>
          <Badge>Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Healthy</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
        <Alert status="info">
          <AlertIndicator />
          <AlertContent>
            <AlertTitle>Deployment ready</AlertTitle>
            <AlertDescription>All 8 packages passed validation.</AlertDescription>
          </AlertContent>
        </Alert>
        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Usage</TabsTrigger>
            <TabsTrigger value="quota">Quota</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <div className={styles.chartBars} aria-label="Weekly activity chart">
              {chartSeries.map((bar) => (
                <div key={bar.label} className={styles.chartBar}>
                  <div
                    className={styles.chartFill}
                    style={{ height: `${bar.pct}%`, background: bar.color }}
                  />
                  <span>{bar.label}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="quota">
            <ProgressLinear value={72}>
              <div className={styles.sliderHeader}>
                <ProgressLinearLabel>API requests</ProgressLinearLabel>
                <ProgressLinearValueText />
              </div>
              <ProgressLinearTrack>
                <ProgressLinearRange />
              </ProgressLinearTrack>
            </ProgressLinear>
          </TabsContent>
        </Tabs>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.title}>Recent Invoices</p>
            <p className={styles.text}>Table typography, status badges, and modal preview.</p>
          </div>
          <Button size="xs" variant="outline" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </div>
        <TableScrollArea>
          <Table size="sm" interactive>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Invoice</TableColumnHeader>
                <TableColumnHeader>Status</TableColumnHeader>
                <TableColumnHeader numeric>Total</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Badge variant={order.variant}>{order.status}</Badge>
                  </TableCell>
                  <TableCell numeric>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollArea>
        <Dialog open={dialogOpen} onOpenChange={(details) => setDialogOpen(details.open)}>
          <DialogPanel
            size="sm"
            data-moduix-theme={base === 'calm' ? undefined : base}
            data-moduix-color-scheme={mode}
            style={tokens as CSSProperties}
          >
            <DialogHeader>
              <DialogTitle>Confirm export</DialogTitle>
              <DialogCloseIcon />
              <DialogDescription>
                Preview how portalled modals inherit your active theme tokens.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button size="sm" onClick={() => setDialogOpen(false)}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogPanel>
        </Dialog>
      </div>
    </>
  );
}

type ShareState = {
  b?: Preset;
  p?: string;
  h?: number;
  r?: number;
  d?: Density;
  f?: FontChoice;
  x?: string;
  s?: string;
  c?: string;
};

function encodeShareState(state: ShareState) {
  const json = JSON.stringify(state);
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeShareState(raw: string): ShareState | null {
  try {
    const padded = raw.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded);
    return JSON.parse(json) as ShareState;
  } catch {
    return null;
  }
}

function ThemeBuilder() {
  const t = useI18n<typeof import('i18n')>();
  const { framework } = useExampleSelection();
  const modeId = useId();
  const exportId = useId();
  const previewRef = useRef<HTMLDivElement>(null);

  const [base, setBase] = useState<Preset>('calm');
  const [primary, setPrimary] = useState<string | null>(null);
  const [destructive, setDestructive] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [chartAccent, setChartAccent] = useState<string | null>(null);
  const [hue, setHue] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [density, setDensity] = useState<Density | null>(null);
  const [font, setFont] = useState<FontChoice>('default');
  const [imported, setImported] = useState<Tokens>({});
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [applyToSite, setApplyToSite] = useState(() => appliedSiteKeys.size > 0);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [basePrimary, setBasePrimary] = useState('#000000');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Restore shared theme from `?theme=...` on mount.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('theme');
    if (!param) return;
    const state = decodeShareState(param);
    if (!state) return;
    if (state.b && state.b in presets) setBase(state.b);
    if (isHexColor(state.p)) setPrimary(state.p);
    if (typeof state.h === 'number' && Number.isFinite(state.h) && state.h >= 0 && state.h <= 360) {
      setHue(state.h);
    }
    if (typeof state.r === 'number' && Number.isFinite(state.r) && state.r >= 0 && state.r <= 24) {
      setRadius(state.r);
    }
    if (state.d && ['compact', 'default', 'comfortable'].includes(state.d)) setDensity(state.d);
    if (state.f && fontOptions.some((item) => item.value === state.f)) setFont(state.f);
    if (isHexColor(state.x)) setDestructive(state.x);
    if (isHexColor(state.s)) setSuccess(state.s);
    if (isHexColor(state.c)) setChartAccent(state.c);
  }, []);

  const selectedFont = fontOptions.find((item) => item.value === font);

  // Untouched controls show the values of the preset and the imported theme.
  const tokens: Tokens = useMemo(
    () => ({
      ...presets[base].tokens,
      ...(hue === null ? {} : neutrals(hue)),
      ...imported,
      ...(density === null ? {} : densityTokens(density)),
      ...(radius === null ? {} : { '--moduix-radius': `${radius / 16}rem` }),
      ...(selectedFont?.stack ? { '--moduix-font-sans': selectedFont.stack } : {}),
      ...(primary === null ? {} : colorPair(primary, '--moduix-primary', true)),
      ...(destructive === null ? {} : colorPair(destructive, '--moduix-destructive', true)),
      ...(success === null ? {} : colorPair(success, '--moduix-success', true)),
      ...(chartAccent === null ? {} : chartTokens(chartAccent)),
    }),
    [
      base,
      hue,
      imported,
      density,
      radius,
      selectedFont,
      primary,
      destructive,
      success,
      chartAccent,
    ],
  );

  // Optional live site-wide application of custom tokens onto <html>.
  // Intentionally persists across docs navigation until turned off or reset.
  useEffect(() => {
    const root = document.documentElement;
    for (const key of appliedSiteKeys) {
      root.style.removeProperty(key);
    }
    appliedSiteKeys.clear();
    if (!applyToSite) return;
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(key, value);
      appliedSiteKeys.add(key);
    }
  }, [applyToSite, tokens]);

  const css = `/* brand.css · after the foundation styles */\n[data-moduix-theme='brand'] {\n${
    Object.entries(tokens)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n') || '  /* No changes from Calm yet */'
  }\n}`;

  const outputCode =
    exportFormat === 'tailwind' ? formatTailwindTheme(tokens, framework.value) : css;

  // The light primary of the current tokens, read from the preview.
  useLayoutEffect(() => {
    const probe = previewRef.current?.querySelector<HTMLElement>('[data-primary-probe]');
    if (probe) setBasePrimary(toHex(getComputedStyle(probe).color));
  }, [css]);

  useLayoutEffect(() => {
    setMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const handleReset = () => {
    setBase('calm');
    setPrimary(null);
    setDestructive(null);
    setSuccess(null);
    setChartAccent(null);
    setHue(null);
    setRadius(null);
    setDensity(null);
    setFont('default');
    setImported({});
    setApplyToSite(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('theme');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  const handleShare = async () => {
    const payload: ShareState = {
      ...(base !== 'calm' ? { b: base } : {}),
      ...(primary ? { p: primary } : {}),
      ...(hue !== null ? { h: hue } : {}),
      ...(radius !== null ? { r: radius } : {}),
      ...(density ? { d: density } : {}),
      ...(font !== 'default' ? { f: font } : {}),
      ...(destructive ? { x: destructive } : {}),
      ...(success ? { s: success } : {}),
      ...(chartAccent ? { c: chartAccent } : {}),
    };
    const url = new URL(window.location.href);
    if (Object.keys(payload).length > 0) {
      url.searchParams.set('theme', encodeShareState(payload));
    } else {
      url.searchParams.delete('theme');
    }
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    await navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  if (import.meta.env.SSG_MD) return null;

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.controls}>
          <Field>
            <FieldLabel>{t('themeBuilderBase')}</FieldLabel>
            <NativeSelect
              controlProps={{ className: styles.select }}
              value={base}
              onChange={(event) => setBase(event.target.value as Preset)}
            >
              {Object.entries(presets).map(([value, preset]) => (
                <option key={value} value={value}>
                  {preset.title}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <ColorControl
            label={t('themeBuilderPrimary')}
            name="--moduix-primary"
            value={primary ?? basePrimary}
            onChange={(value) => setPrimary(value.slice(0, 7))}
          />

          <RangeControl
            label={t('themeBuilderHue')}
            name="Neutral hue"
            min={0}
            max={360}
            step={1}
            unit=""
            value={hue ?? presets[base].hue}
            onChange={setHue}
          />

          <RangeControl
            label={t('themeBuilderRadius')}
            name="--moduix-radius"
            min={0}
            max={24}
            step={1}
            unit="px"
            value={radius ?? remToPx(tokens['--moduix-radius'])}
            onChange={setRadius}
          />

          <Field>
            <FieldLabel>{t('themeBuilderDensity')}</FieldLabel>
            <NativeSelect
              controlProps={{ className: styles.select }}
              value={density ?? presets[base].density}
              onChange={(event) => setDensity(event.target.value as Density)}
            >
              {(['compact', 'default', 'comfortable'] as const).map((value) => (
                <option key={value} value={value}>
                  {t(`themeBuilderDensity_${value}`)}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel>Font family</FieldLabel>
            <NativeSelect
              controlProps={{ className: styles.select }}
              value={font}
              onChange={(event) => setFont(event.target.value as FontChoice)}
            >
              {fontOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <hr className={styles.controlDivider} />

          <ColorControl
            label="Success"
            name="--moduix-success"
            value={success ?? '#16a34a'}
            onChange={(value) => setSuccess(value.slice(0, 7))}
          />

          <ColorControl
            label="Destructive"
            name="--moduix-destructive"
            value={destructive ?? '#dc2626'}
            onChange={(value) => setDestructive(value.slice(0, 7))}
          />

          <ColorControl
            label="Chart accent"
            name="--moduix-chart-1"
            value={chartAccent ?? primary ?? '#3d63f5'}
            onChange={(value) => setChartAccent(value.slice(0, 7))}
          />

          <hr className={styles.controlDivider} />

          <div className={styles.group}>
            <span id={modeId} className={styles.label}>
              {t('themeBuilderPreview')}
            </span>
            <SegmentGroup
              aria-labelledby={modeId}
              size="sm"
              className={styles.segments}
              value={mode}
              onValueChange={(details) =>
                details.value && setMode(details.value as 'light' | 'dark')
              }
            >
              <SegmentGroupIndicator />
              <SegmentGroupItems
                items={[
                  { value: 'light', label: t('themeBuilderLight') },
                  { value: 'dark', label: t('themeBuilderDark') },
                ]}
              />
            </SegmentGroup>
          </div>

          <Switch
            checked={applyToSite}
            onCheckedChange={(details) => setApplyToSite(details.checked)}
            className={styles.switch}
          >
            <SwitchLabel>Apply to site</SwitchLabel>
            <SwitchControl />
            <SwitchHiddenInput />
          </Switch>

          <div className={styles.controlRow}>
            <Button variant="outline" size="sm" onClick={handleShare}>
              {shared ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
              {shared ? 'Link copied' : 'Share URL'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw aria-hidden="true" />
              Reset
            </Button>
          </div>

          <ImportDialog
            onImport={(next) => {
              setImported(next);
              setPrimary(null);
              setDestructive(null);
              setSuccess(null);
              setChartAccent(null);
              setHue(null);
              setRadius(null);
              setDensity(null);
              setFont('default');
            }}
          />
        </div>

        <div
          ref={previewRef}
          className={`rp-not-doc ${styles.preview}`}
          data-moduix-theme={base === 'calm' ? undefined : base}
          data-moduix-color-scheme={mode}
          style={tokens as CSSProperties}
          aria-label={t('themeBuilderPreviewLabel')}
          role="group"
        >
          <span
            data-primary-probe=""
            data-moduix-color-scheme="light"
            style={{ color: 'var(--moduix-primary)' }}
            hidden
          />
          <Preview mode={mode} base={base} tokens={tokens} />
        </div>
      </div>

      <div className={styles.cssHeader}>
        <h2 id={exportId}>{t('themeBuilderCssTitle')}</h2>
        <div className={styles.exportControls}>
          <SegmentGroup
            aria-labelledby={exportId}
            size="sm"
            value={exportFormat}
            onValueChange={(details) =>
              details.value && setExportFormat(details.value as ExportFormat)
            }
          >
            <SegmentGroupIndicator />
            <SegmentGroupItems
              items={[
                { value: 'css', label: 'CSS Variables' },
                { value: 'tailwind', label: 'Tailwind @theme' },
              ]}
            />
          </SegmentGroup>
          <Button
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText(outputCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? t('exampleCopied') : t('themeBuilderCopy')}
          </Button>
        </div>
      </div>
      <CodeBlockRuntime lang="css" code={outputCode} />
    </div>
  );
}

export { ThemeBuilder };
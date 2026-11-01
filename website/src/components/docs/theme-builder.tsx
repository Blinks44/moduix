import { Button } from '@moduix/react/button';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
} from '@moduix/react/dialog';
import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { NativeSelect } from '@moduix/react/native-select';
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
import { Textarea } from '@moduix/react/textarea';
import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime } from '@rspress/core/theme';
import { Upload } from 'lucide-react';
import { type CSSProperties, useId, useLayoutEffect, useRef, useState } from 'react';
import contrastCss from '../../../../packages/foundation/src/presets/contrast.css?raw';
import denseCss from '../../../../packages/foundation/src/presets/dense.css?raw';
import softCss from '../../../../packages/foundation/src/presets/soft.css?raw';
import colorsCss from '../../../../packages/foundation/src/styles/colors.css?raw';
import sizingCss from '../../../../packages/foundation/src/styles/sizing.css?raw';
import spacingCss from '../../../../packages/foundation/src/styles/spacing.css?raw';
import { ColorControl, RangeControl, toHex } from '../mdx/customize';
import styles from './theme-builder.module.css';

// Theme builder page: controls layer token overrides on a preset, the preview renders them and the
// page prints them as one `[data-moduix-theme='brand']` block.
type Tokens = Record<string, string>;
type Density = 'compact' | 'default' | 'comfortable';

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

// The picked color is the light value; dark mode gets a lighter, calmer version of the same hue.
function primaryTokens(hex: string): Tokens {
  const { l, c, h } = hexToOklch(hex);
  const dark = { l: Math.min(Math.max(l + 0.25, 0.72), 0.85), c: c * 0.85 };
  const color = (lightness: number, chroma: number) =>
    `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${h.toFixed(1)})`;
  const foreground = (lightness: number) =>
    lightness > 0.65 ? color(0.2, 0.03) : color(0.985, 0.01);
  return {
    '--moduix-primary': `light-dark(${color(l, c)}, ${color(dark.l, dark.c)})`,
    '--moduix-primary-foreground': `light-dark(${foreground(l)}, ${foreground(dark.l)})`,
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
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className={styles.dialog}>
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
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}

function Preview() {
  const t = useI18n<typeof import('i18n')>();
  const [quietHours, setQuietHours] = useState([22, 31]);
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
    </>
  );
}

function ThemeBuilder() {
  const t = useI18n<typeof import('i18n')>();
  const modeId = useId();
  const previewRef = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState<Preset>('calm');
  const [primary, setPrimary] = useState<string | null>(null);
  const [hue, setHue] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [density, setDensity] = useState<Density | null>(null);
  const [imported, setImported] = useState<Tokens>({});
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [basePrimary, setBasePrimary] = useState('#000000');
  const [copied, setCopied] = useState(false);

  // Untouched controls show the values of the preset and the imported theme.
  const tokens: Tokens = {
    ...presets[base].tokens,
    ...(hue === null ? {} : neutrals(hue)),
    ...imported,
    ...(density === null ? {} : densityTokens(density)),
    ...(radius === null ? {} : { '--moduix-radius': `${radius / 16}rem` }),
    ...(primary === null ? {} : primaryTokens(primary)),
  };
  const css = `/* brand.css · after the foundation styles */\n[data-moduix-theme='brand'] {\n${
    Object.entries(tokens)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n') || '  /* No changes from Calm yet */'
  }\n}`;

  // The light primary of the current tokens, read from the preview.
  useLayoutEffect(() => {
    const probe = previewRef.current?.querySelector<HTMLElement>('[data-primary-probe]');
    if (probe) setBasePrimary(toHex(getComputedStyle(probe).color));
  }, [css]);

  useLayoutEffect(() => {
    setMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

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
          <ImportDialog
            onImport={(next) => {
              setImported(next);
              setPrimary(null);
              setHue(null);
              setRadius(null);
              setDensity(null);
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
          <Preview />
        </div>
      </div>
      <div className={styles.cssHeader}>
        <h2>{t('themeBuilderCssTitle')}</h2>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(css);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {t(copied ? 'themeBuilderCopied' : 'themeBuilderCopy')}
        </Button>
      </div>
      <p>{t('themeBuilderCssText')}</p>
      <CodeBlockRuntime lang="css" code={css} />
    </div>
  );
}

export { ThemeBuilder };
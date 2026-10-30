import { Button } from '@moduix/react/button';
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSliders,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  parseColor,
} from '@moduix/react/color-picker';
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { useI18n } from '@rspress/core/runtime';
import { CodeBlockRuntime } from '@rspress/core/theme';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from './customize.module.css';

// Customize panel of the CSS variables section: controls write variables onto the scene and the
// panel prints the matching CSS. A color control, or a range as [min, max, step, unit].
type CssControl = 'color' | readonly [min: number, max: number, step: number, unit: string];
type CssControls = Partial<Record<`--${string}`, CssControl>>;
type Overrides = Record<string, string>;

function toHex(color: string) {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return '#000000';
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
  // Opaque colors stay six-digit hex; translucent ones keep their alpha as eight digits.
  const channels = a < 255 ? [r, g, b, a] : [r, g, b];
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

// Reads the value the element uses now, through the private `--_x` default like the component CSS.
function readValue(element: HTMLElement, name: string, control: CssControl, fallback = 'initial') {
  const probe = document.createElement('span');
  const value = `var(${name}, var(${name.replace('--moduix-', '--_')}, ${fallback}))`;
  probe.style.cssText = 'position:absolute;visibility:hidden;max-width:none;min-width:0';
  element.append(probe);
  let result: string;
  if (control === 'color') {
    probe.style.color = value;
    result = toHex(getComputedStyle(probe).color);
  } else if (control[3] === 'px') {
    probe.style.width = value;
    result = String(probe.offsetWidth);
  } else {
    probe.style.setProperty('--customize-value', value);
    result = String(parseFloat(getComputedStyle(probe).getPropertyValue('--customize-value')));
  }
  probe.remove();
  return result;
}

// Controls shared by the Customize panel and the theme builder.
function ColorControl({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const color = parseColor(value);
  // Opaque colors stay six-digit hex; translucent ones keep their alpha.
  const format = (c: typeof color) => (c.getChannelValue('alpha') < 1 ? 'hexa' : 'hex');
  return (
    <ColorPicker
      className={styles.color}
      value={color}
      onValueChange={(details) => onChange(details.value.toString(format(details.value)))}
    >
      <ColorPickerLabel>{label}</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label={name} data-fit-content>
          <ColorPickerValueSwatch />
          <ColorPickerValueText format={format(color)} />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerSliders />
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}

function RangeControl({
  label,
  name,
  min,
  max,
  step,
  unit,
  value,
  onChange,
}: {
  label: string;
  name: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(details) => onChange(details.value[0])}
    >
      <SliderLabel>{label}</SliderLabel>
      <SliderValueText>{`${value}${unit}`}</SliderValueText>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label={name} />
      </SliderControl>
    </Slider>
  );
}

function CustomizePanel({
  controls,
  fallbacks,
  prefix,
  overrides,
  onChange,
}: {
  controls: CssControls;
  /** Documented defaults for variables without a private `--_x` value. */
  fallbacks: Record<string, string>;
  prefix: string;
  overrides: Overrides;
  onChange: (overrides: Overrides) => void;
}) {
  const t = useI18n<typeof import('i18n')>();
  const entries = Object.entries(controls) as [`--${string}`, CssControl][];
  const ref = useRef<HTMLDivElement>(null);
  const [defaults, setDefaults] = useState<Overrides>({});

  // Values follow the live theme, so they are read again whenever the reader enters the panel.
  // Changed variables keep the value read before the change, which Reset returns to.
  const read = () => {
    // The scene comes first in the inspector, so its first slotted element is the component.
    const element = ref.current?.parentElement?.querySelector<HTMLElement>('[data-slot]');
    if (!element) return;
    setDefaults((previous) =>
      Object.fromEntries(
        entries.map(([name, control]) => [
          name,
          name in overrides && previous[name]
            ? previous[name]
            : readValue(element, name, control, fallbacks[name]),
        ]),
      ),
    );
  };

  useLayoutEffect(read, []);

  const set = (name: string, value: string) => onChange({ ...overrides, [name]: value });
  const changed = Object.entries(overrides);
  const component = prefix.replace(/^--moduix-/, '').replace(/-$/, '');
  const css = `.my-${component} {\n${changed.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;

  return (
    <div ref={ref} className={styles.panel} onPointerEnter={read} onFocus={read}>
      <div className={styles.controls}>
        {entries.map(([name, control]) => {
          const label = name.slice(prefix.length);
          if (control === 'color') {
            return (
              <ColorControl
                key={name}
                label={label}
                name={name}
                value={overrides[name] ?? defaults[name] ?? '#000000'}
                onChange={(value) => set(name, value)}
              />
            );
          }
          const [min, max, step, unit] = control;
          return (
            <RangeControl
              key={name}
              label={label}
              name={name}
              min={min}
              max={max}
              step={step}
              unit={unit}
              value={parseFloat(overrides[name] ?? defaults[name] ?? String(min))}
              onChange={(value) => set(name, `${value}${unit}`)}
            />
          );
        })}
      </div>
      {changed.length ? (
        <div className={styles.output}>
          <CodeBlockRuntime lang="css" code={css} />
          <Button variant="outline" size="sm" onClick={() => onChange({})}>
            {t('cssReset')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export { ColorControl, CustomizePanel, RangeControl, toHex };
export type { CssControls, Overrides };
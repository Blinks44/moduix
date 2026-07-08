import { useColorPicker } from '@ark-ui/react/color-picker';
import { ColorPicker, Dialog, Field, parseColor } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './color-picker.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316', '#dc2626', '#9333ea'];
const compactSwatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export const colorPickerSwatchesData = `
  const swatches = ["#0f172a", "#2563eb", "#16a34a", "#f97316"];
`;

export const colorPickerEmptyData = `
  const defaultColor = "#eb5e41";
`;

export const colorPickerControlledData = `
  const initialColor = "#16a34a";
`;

export const colorPickerOpenControlledData = `
  const initialOpen = false;
  const defaultColor = "#14b8a6";
`;

export const colorPickerFormatData = `
  const formats = ["rgba", "hsla"];
  const defaultFormat = "rgba";
`;

export const colorPickerFieldData = `
  const fieldState = {
    required: true,
    invalid: true,
    name: "accent",
  };
`;

export const colorPickerDialogData = `
  const dialogTitle = "Choose a color";
  const defaultColor = "#eb5e41";
`;

export const colorPickerFormData = `
  const fieldName = "accent";
`;

export const colorPickerExampleCss = `
  .color-picker-slider-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  .color-picker-channel-sliders {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-2);
  }
`;

export const colorPickerInlineCss = `
  .color-picker-value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3);
  }

  .color-picker-input-row {
    display: flex;
    min-width: 0;
    gap: var(--spacing-2);
  }

  .color-picker-control-swatch {
    position: relative;
    display: grid;
    width: var(--size-lg);
    height: var(--size-lg);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--radius-md);
    box-shadow: inset 0 0 0 var(--border-width-sm) var(--color-border);
  }

  .color-picker-trigger-value {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .color-picker-trigger-value-swatch {
    position: relative;
    display: grid;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--radius-sm);
    box-shadow: inset 0 0 0 var(--border-width-sm) var(--color-border);
  }
`;

export const colorPickerFormCss = `
  .color-picker-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }

  .color-picker-submit {
    width: fit-content;
  }
`;

export const colorPickerFieldCss = `
  .color-picker-field {
    max-width: 18rem;
  }
`;

export const colorPickerValueSwatchCss = `
  .color-picker-value-swatch {
    position: relative;
    display: grid;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    border-radius: var(--radius-md);
    box-shadow: inset 0 0 0 var(--border-width-sm) var(--color-border);
  }
`;

export const colorPickerDialogCss = `
  .color-picker-dialog-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .color-picker-dialog-trigger {
    width: fit-content;
  }
`;

export const colorPickerOverrideCssProperties: CssPropertyInput[] = [
  ['--color-picker-action-bg', 'transparent', 'Controls action button background color.'],
  ['--color-picker-action-bg-hover', 'var(--color-muted)', 'Controls hovered action background.'],
  [
    '--color-picker-action-color',
    'var(--color-muted-foreground)',
    'Controls action button text and icon color.',
  ],
  [
    '--color-picker-action-color-hover',
    'var(--color-foreground)',
    'Controls hovered action button color.',
  ],
  ['--color-picker-action-font-size', 'var(--text-sm)', 'Controls action button font size.'],
  ['--color-picker-action-gap', 'var(--spacing-2)', 'Controls action button content gap.'],
  [
    '--color-picker-action-line-height',
    'var(--line-height-text-sm)',
    'Controls action button line height.',
  ],
  ['--color-picker-action-padding-x', 'var(--spacing-2)', 'Controls action button inline padding.'],
  ['--color-picker-action-size', 'var(--size-lg)', 'Controls action button height.'],
  ['--color-picker-alpha-input-width', '4rem', 'Controls alpha input width.'],
  [
    '--color-picker-area-border-color',
    'color-mix(in oklab, var(--color-border) 70%, transparent)',
    'Controls color area inset border color.',
  ],
  [
    '--color-picker-area-border-width',
    'var(--border-width-sm)',
    'Controls color area inset border width.',
  ],
  ['--color-picker-area-height', '10rem', 'Controls color area height.'],
  ['--color-picker-area-radius', 'var(--radius-md)', 'Controls color area corner radius.'],
  ['--color-picker-border-color', 'var(--color-border)', 'Controls shared control border color.'],
  [
    '--color-picker-border-width',
    'var(--border-width-sm)',
    'Controls shared control border width.',
  ],
  [
    '--color-picker-channel-slider-border-color',
    'color-mix(in oklab, black 14%, transparent)',
    'Controls channel slider inset border color.',
  ],
  [
    '--color-picker-channel-slider-border-width',
    'var(--border-width-sm)',
    'Controls channel slider inset border width.',
  ],
  [
    '--color-picker-channel-slider-height',
    'var(--spacing-3)',
    'Controls horizontal channel slider height.',
  ],
  [
    '--color-picker-channel-slider-label-color',
    'var(--color-picker-color)',
    'Controls channel slider label color.',
  ],
  [
    '--color-picker-channel-slider-label-font-size',
    'var(--text-sm)',
    'Controls channel slider label font size.',
  ],
  [
    '--color-picker-channel-slider-label-font-weight',
    'var(--weight-medium)',
    'Controls channel slider label font weight.',
  ],
  [
    '--color-picker-channel-slider-label-line-height',
    'var(--line-height-text-sm)',
    'Controls channel slider label line height.',
  ],
  [
    '--color-picker-channel-slider-radius',
    'var(--radius-full)',
    'Controls channel slider corner radius.',
  ],
  [
    '--color-picker-channel-slider-track-size',
    'var(--spacing-3)',
    'Controls channel slider track thickness.',
  ],
  [
    '--color-picker-channel-slider-value-color',
    'var(--color-muted-foreground)',
    'Controls channel slider value text color.',
  ],
  [
    '--color-picker-channel-slider-value-font-size',
    'var(--text-sm)',
    'Controls channel slider value font size.',
  ],
  [
    '--color-picker-channel-slider-value-line-height',
    'var(--line-height-text-sm)',
    'Controls channel slider value line height.',
  ],
  [
    '--color-picker-channel-slider-vertical-height',
    '10rem',
    'Controls vertical channel slider height.',
  ],
  ['--color-picker-color', 'var(--color-foreground)', 'Controls shared text color.'],
  ['--color-picker-content-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--color-picker-content-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--color-picker-content-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--color-picker-content-closed-opacity', '0', 'Controls closed-state animation opacity.'],
  [
    '--color-picker-content-closed-scale',
    'var(--scale-popup)',
    'Controls closed-state animation scale.',
  ],
  ['--color-picker-content-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--color-picker-content-gap', 'var(--spacing-3)', 'Controls popup content gap.'],
  ['--color-picker-content-max-height', '32rem', 'Controls popup maximum height.'],
  ['--color-picker-content-padding', 'var(--spacing-4)', 'Controls popup padding.'],
  ['--color-picker-content-radius', 'var(--color-picker-radius)', 'Controls popup corner radius.'],
  ['--color-picker-content-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--color-picker-content-width', '16rem', 'Controls popup content width.'],
  ['--color-picker-control-bg', 'var(--color-background)', 'Controls field control background.'],
  ['--color-picker-control-gap', 'var(--spacing-2)', 'Controls visible control gap.'],
  ['--color-picker-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  [
    '--color-picker-focus-ring-color',
    'var(--color-ring)',
    'Controls focused border and ring color.',
  ],
  ['--color-picker-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--color-picker-icon-size', '1rem', 'Controls action icon size.'],
  ['--color-picker-input-font-size', 'var(--text-sm)', 'Controls channel input font size.'],
  ['--color-picker-input-height', 'var(--size-lg)', 'Controls channel input height.'],
  [
    '--color-picker-input-line-height',
    'var(--line-height-text-sm)',
    'Controls channel input line height.',
  ],
  ['--color-picker-input-padding-x', 'var(--spacing-3)', 'Controls channel input inline padding.'],
  ['--color-picker-invalid-color', 'var(--color-destructive)', 'Controls invalid border color.'],
  ['--color-picker-label-color', 'var(--color-picker-color)', 'Controls root label text color.'],
  ['--color-picker-label-font-size', 'var(--text-sm)', 'Controls root label font size.'],
  ['--color-picker-label-font-weight', 'var(--weight-medium)', 'Controls root label font weight.'],
  [
    '--color-picker-label-line-height',
    'var(--line-height-text-sm)',
    'Controls root label line height.',
  ],
  ['--color-picker-max-width', '100%', 'Controls the maximum root width.'],
  ['--color-picker-radius', 'var(--radius-md)', 'Controls shared control corner radius.'],
  ['--color-picker-root-gap', 'var(--spacing-2)', 'Controls vertical spacing in the root.'],
  [
    '--color-picker-swatch-border-color',
    'color-mix(in oklab, black 14%, transparent)',
    'Controls swatch inset border color.',
  ],
  [
    '--color-picker-swatch-border-width',
    'var(--border-width-sm)',
    'Controls swatch inset border width.',
  ],
  ['--color-picker-swatch-gap', 'var(--spacing-2)', 'Controls swatch group gap.'],
  ['--color-picker-swatch-indicator-color', 'white', 'Controls checked swatch icon color.'],
  ['--color-picker-swatch-indicator-size', '1rem', 'Controls checked swatch icon size.'],
  ['--color-picker-swatch-radius', 'var(--radius-sm)', 'Controls swatch corner radius.'],
  ['--color-picker-swatch-size', '2rem', 'Controls swatch size.'],
  ['--color-picker-thumb-bg', 'var(--color-background)', 'Controls thumb fill color.'],
  [
    '--color-picker-thumb-focus-ring-width',
    'var(--border-width-lg)',
    'Controls focused thumb ring width.',
  ],
  [
    '--color-picker-thumb-inner-ring-color',
    'var(--color-background)',
    'Controls thumb inner ring color.',
  ],
  [
    '--color-picker-thumb-inner-ring-width',
    'var(--border-width-md)',
    'Controls thumb inner ring width.',
  ],
  [
    '--color-picker-thumb-outer-ring-color',
    'color-mix(in oklab, black 18%, transparent)',
    'Controls thumb outer ring color.',
  ],
  [
    '--color-picker-thumb-outer-ring-width',
    'var(--border-width-lg)',
    'Controls thumb outer ring width.',
  ],
  ['--color-picker-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--color-picker-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--color-picker-thumb-size', '1rem', 'Controls area and slider thumb size.'],
  ['--color-picker-transition', 'var(--transition-default)', 'Controls transition timing.'],
  [
    '--color-picker-trigger-fit-content-gap',
    'var(--spacing-2)',
    'Controls content gap for fit-content triggers.',
  ],
  [
    '--color-picker-trigger-fit-content-padding-x',
    'var(--spacing-3)',
    'Controls inline padding for fit-content triggers.',
  ],
  [
    '--color-picker-trigger-fit-content-swatch-size',
    '1rem',
    'Controls direct swatch size inside fit-content triggers.',
  ],
  ['--color-picker-trigger-padding', 'var(--spacing-1)', 'Controls trigger swatch padding.'],
  ['--color-picker-trigger-size', 'var(--size-lg)', 'Controls the trigger swatch button size.'],
  ['--color-picker-value-text-color', 'var(--color-picker-color)', 'Controls value text color.'],
  ['--color-picker-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--color-picker-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--color-picker-view-gap', 'var(--spacing-2)', 'Controls format view gap.'],
  ['--color-picker-width', '16rem', 'Controls the root width.'],
];

const colorPickerCssProperties = colorPickerOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function PickerPopup({ colors = swatches }: { colors?: string[] }) {
  return (
    <ColorPicker.Positioner>
      <ColorPicker.Content>
        <ColorPicker.Area>
          <ColorPicker.AreaBackground />
          <ColorPicker.AreaThumb />
        </ColorPicker.Area>
        <div className={styles.sliderGroup}>
          <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
          <div className={styles.channelSliders}>
            <ColorPicker.ChannelSlider channel="hue">
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider channel="alpha">
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
          </div>
        </div>
        <ColorPicker.SwatchGroup>
          {colors.map((color) => (
            <ColorPicker.SwatchTrigger key={color} value={color}>
              <ColorPicker.Swatch value={color}>
                <ColorPicker.SwatchIndicator />
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          ))}
        </ColorPicker.SwatchGroup>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
  );
}

function PickerField() {
  return (
    <>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <PickerPopup />
      <ColorPicker.HiddenInput />
    </>
  );
}

export function ColorPickerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={colorPickerCssProperties} />;
}

export function ColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
      <PickerField />
    </ColorPicker.Root>
  );
}

export function ControlledColorPickerExample() {
  const [value, setValue] = useState(() => parseColor('#16a34a'));

  return (
    <ColorPicker.Root value={value} onValueChange={(details) => setValue(details.value)}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.ChannelSlider channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider channel="alpha">
            <ColorPicker.TransparencyGrid />
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function DisabledColorPickerExample() {
  return (
    <ColorPicker.Root disabled defaultValue={parseColor('#64748b')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function FormUsageColorPickerExample() {
  const [submitted, setSubmitted] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('accent') ?? ''));
      }}
    >
      <ColorPicker.Root name="accent" defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
      {submitted ? <output>Submitted: {submitted}</output> : null}
    </form>
  );
}

export function InputOnlyColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#0f172a')}>
      <ColorPicker.Label>Hex color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <div className={styles.controlSwatch}>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </div>
      </ColorPicker.Control>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function CompactTriggerColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" data-fit-content>
          <span className={styles.triggerValue}>
            <span className={styles.triggerValueSwatch}>
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ValueSwatch />
            </span>
            <ColorPicker.ValueText format="hex" />
          </span>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <PickerPopup />
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function SliderOnlyColorPickerExample() {
  return (
    <ColorPicker.Root inline defaultValue={parseColor('#2563eb')}>
      <ColorPicker.Label>Channels</ColorPicker.Label>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <ColorPicker.ChannelSlider channel="alpha">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
    </ColorPicker.Root>
  );
}

export function SwatchesColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#f97316')} closeOnSelect>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.SwatchGroup>
            {compactSwatches.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color}>
                <ColorPicker.Swatch value={color}>
                  <ColorPicker.SwatchIndicator />
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            ))}
          </ColorPicker.SwatchGroup>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function SwatchOnlyColorPickerExample() {
  return (
    <ColorPicker.Root inline defaultValue={parseColor('#f97316')}>
      <ColorPicker.Label>Brand color</ColorPicker.Label>
      <ColorPicker.SwatchGroup>
        {compactSwatches.map((color) => (
          <ColorPicker.SwatchTrigger key={color} value={color}>
            <ColorPicker.Swatch value={color}>
              <ColorPicker.SwatchIndicator />
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.SwatchGroup>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function ValueSwatchColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#dc2626')}>
      <ColorPicker.Label>Current color</ColorPicker.Label>
      <div className={styles.valueSwatchRow}>
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </div>
      <ColorPicker.ValueText format="hex" />
    </ColorPicker.Root>
  );
}

export function InlineColorPickerExample() {
  return (
    <ColorPicker.Root inline defaultValue={parseColor('#2563eb')}>
      <div className={styles.valueRow}>
        <ColorPicker.Label>Inline color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <ColorPicker.ChannelSlider channel="alpha">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <ColorPicker.View format="rgba">
        <div className={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function OpenControlledColorPickerExample() {
  const [open, setOpen] = useState(false);

  return (
    <ColorPicker.Root
      defaultValue={parseColor('#14b8a6')}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <ColorPicker.Label>Open controlled</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <button type="button" onClick={() => setOpen((current) => !current)}>
        {open ? 'Close' : 'Open'}
      </button>
    </ColorPicker.Root>
  );
}

export function RootProviderColorPickerExample() {
  const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

  return (
    <ColorPicker.RootProvider value={colorPicker}>
      <div className={styles.valueRow}>
        <ColorPicker.Label>Provider color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.RootProvider>
  );
}

export function FormatColorPickerExample() {
  const [format, setFormat] = useState<'rgba' | 'hsla'>('rgba');

  return (
    <ColorPicker.Root
      inline
      defaultValue={parseColor('#9333ea')}
      format={format}
      onFormatChange={(details) => setFormat(details.format as 'rgba' | 'hsla')}
    >
      <div className={styles.valueRow}>
        <ColorPicker.Label>Format</ColorPicker.Label>
        <ColorPicker.FormatSelect aria-label="Color format">
          <option value="rgba">RGBA</option>
          <option value="hsla">HSLA</option>
        </ColorPicker.FormatSelect>
      </div>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.View format="rgba">
        <div className={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.View format="hsla">
        <div className={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hue" />
          <ColorPicker.ChannelInput channel="saturation" />
          <ColorPicker.ChannelInput channel="lightness" />
        </div>
      </ColorPicker.View>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export function FieldStateColorPickerExample() {
  return (
    <Field className={styles.field}>
      <ColorPicker.Root name="accent" required invalid defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Accent color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
      <Field.HelperText>Used for generated charts and callouts.</Field.HelperText>
      <Field.ErrorText>Choose an accent color.</Field.ErrorText>
    </Field>
  );
}

export function InsideDialogColorPickerExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.dialogTrigger}>Open dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseIcon />
          <Dialog.Title>Choose a color</Dialog.Title>
          <Dialog.Description>
            The color picker positioner is portalled automatically for correct layering.
          </Dialog.Description>
          <div className={styles.dialogBody}>
            <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
              <ColorPicker.Label>Color</ColorPicker.Label>
              <ColorPicker.Control>
                <ColorPicker.ChannelInput channel="hex" />
                <ColorPicker.Trigger aria-label="Open color picker" />
              </ColorPicker.Control>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area>
                    <ColorPicker.AreaBackground />
                    <ColorPicker.AreaThumb />
                  </ColorPicker.Area>
                </ColorPicker.Content>
              </ColorPicker.Positioner>
              <ColorPicker.HiddenInput />
            </ColorPicker.Root>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
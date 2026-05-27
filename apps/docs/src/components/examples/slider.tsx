import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './slider.module.css';

export const sliderOverrideCssProperties: CssPropertyInput[] = [
  ['--slider-color', 'var(--color-foreground)', 'Controls the default slider text color.'],
  ['--slider-control-padding-x', '0.625rem', 'Controls vertical control horizontal padding.'],
  ['--slider-control-padding-y', '0.625rem', 'Controls horizontal control vertical padding.'],
  ['--slider-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled slider opacity.'],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-gap', '0.5rem', 'Controls spacing between slider slots.'],
  ['--slider-height', '12rem', 'Controls the vertical slider control height.'],
  ['--slider-indicator-bg', 'var(--color-primary)', 'Controls filled indicator color.'],
  ['--slider-indicator-radius', 'inherit', 'Controls filled indicator corner radius.'],
  ['--slider-label-color', 'var(--slider-color)', 'Controls label text color.'],
  ['--slider-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--slider-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--slider-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-border-width', 'var(--border-width-sm)', 'Controls thumb border width.'],
  ['--slider-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--slider-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--slider-thumb-shadow-dragging', 'var(--shadow-md)', 'Controls thumb shadow while dragging.'],
  ['--slider-thumb-size', '1rem', 'Controls thumb width and height.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', '0.375rem', 'Controls track thickness.'],
  ['--slider-transition', 'var(--transition-default)', 'Controls thumb transition timing.'],
  ['--slider-value-color', 'var(--slider-color)', 'Controls value text color.'],
  ['--slider-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--slider-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--slider-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--slider-width', '12rem', 'Controls the horizontal slider root width.'],
  ['--slider-width-vertical', 'fit-content', 'Controls the vertical slider root width.'],
];
export const sliderPlaygroundCssProperties: CssPropertyInput[] = [
  ['--slider-color', 'var(--color-foreground)', 'Controls default slider text color.'],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-indicator-bg', 'var(--color-primary)', 'Controls filled indicator color.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', '0.375rem', 'Controls track thickness.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-size', '1rem', 'Controls thumb width and height.'],
];

export function SliderCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={sliderOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SliderCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={sliderPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function SliderExample() {
  return (
    <Slider defaultValue={40}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderThumb aria-label="Volume" />
    </Slider>
  );
}

export function RangeSliderExample() {
  const [value, setValue] = React.useState<readonly number[]>([20, 70]);

  return (
    <Slider value={value} min={0} max={100} onValueChange={setValue}>
      <SliderLabel>Price range</SliderLabel>
      <SliderValue>{([minValue, maxValue]) => `${minValue} - ${maxValue}`}</SliderValue>
      <SliderThumb index={0} aria-label="Minimum price" />
      <SliderThumb index={1} aria-label="Maximum price" />
    </Slider>
  );
}

export function SteppedRangeSliderExample() {
  const [value, setValue] = React.useState<readonly number[]>([250, 750]);

  return (
    <Slider
      value={value}
      min={0}
      max={1000}
      step={50}
      largeStep={200}
      minStepsBetweenValues={2}
      thumbCollisionBehavior="none"
      format={{
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }}
      onValueChange={setValue}
    >
      <SliderLabel>Budget</SliderLabel>
      <SliderValue>
        {(_, [minValue, maxValue]) =>
          `${priceFormatter.format(minValue)} - ${priceFormatter.format(maxValue)}`
        }
      </SliderValue>
      <SliderThumb index={0} aria-label="Minimum budget" />
      <SliderThumb index={1} aria-label="Maximum budget" />
    </Slider>
  );
}

export function ControlledSliderExample() {
  const [value, setValue] = React.useState(24);

  return (
    <div className={styles.stack}>
      <Slider value={value} onValueChange={setValue}>
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Brightness" />
      </Slider>
      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
      />
    </div>
  );
}

export function VerticalSliderExample() {
  return (
    <div className={styles.verticalContainer}>
      <Slider orientation="vertical" defaultValue={60} className={styles.verticalSlider}>
        <SliderLabel>Output</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Output" />
      </Slider>
    </div>
  );
}

export function EdgeThumbAlignmentSliderExample() {
  return (
    <Slider defaultValue={0} thumbAlignment="edge">
      <SliderLabel>Zoom</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderThumb aria-label="Zoom" />
    </Slider>
  );
}

export function DisabledSliderExample() {
  return (
    <Slider defaultValue={32} disabled>
      <SliderLabel>Notifications</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderThumb aria-label="Notifications" />
    </Slider>
  );
}

export function CustomCompositionSliderExample() {
  return (
    <SliderRoot defaultValue={56}>
      <SliderLabel>Temperature</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderControl className={styles.customControl}>
        <SliderTrack className={styles.customTrack}>
          <SliderIndicator className={styles.customIndicator} />
          <SliderThumb aria-label="Temperature" className={styles.customThumb} />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}
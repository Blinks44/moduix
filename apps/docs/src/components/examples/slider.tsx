import { Slider, SliderLabel, SliderThumb, SliderValue, type SliderProps } from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './slider.module.css';

export const sliderCssProperties: CssPropertyInput[] = [
  ['--slider-width', '12rem', 'Controls the horizontal slider root width.'],
  ['--slider-width-vertical', 'fit-content', 'Controls the vertical slider root width.'],
  ['--slider-height', '12rem', 'Controls the vertical slider control height.'],
  ['--slider-color', 'var(--color-foreground)', 'Controls the default slider text color.'],
  ['--slider-gap', '0.5rem', 'Controls spacing between slider slots.'],
  ['--slider-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled slider opacity.'],
  ['--slider-control-padding-y', '0.625rem', 'Controls horizontal control vertical padding.'],
  ['--slider-control-padding-x', '0.625rem', 'Controls vertical control horizontal padding.'],
  ['--slider-label-color', 'var(--slider-color)', 'Controls label text color.'],
  ['--slider-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--slider-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--slider-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--slider-value-color', 'var(--slider-color)', 'Controls value text color.'],
  ['--slider-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--slider-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--slider-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', '0.375rem', 'Controls track thickness.'],
  ['--slider-indicator-bg', 'var(--color-primary)', 'Controls filled indicator color.'],
  ['--slider-thumb-size', '1rem', 'Controls thumb width and height.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--slider-thumb-shadow-dragging', 'var(--shadow-md)', 'Controls thumb shadow while dragging.'],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-transition', 'var(--transition-default)', 'Controls thumb transition timing.'],
];

export function SliderExample({ defaultValue = 40, ...props }: SliderProps<number>) {
  return (
    <Slider defaultValue={defaultValue} {...props}>
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

export function CustomClassesSliderExample() {
  return (
    <Slider
      defaultValue={56}
      classNames={{
        control: styles.customControl,
        track: styles.customTrack,
        indicator: styles.customIndicator,
      }}
    >
      <SliderLabel>Temperature</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderThumb aria-label="Temperature" className={styles.customThumb} />
    </Slider>
  );
}
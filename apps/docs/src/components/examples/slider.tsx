import { Button, Slider, useSlider, useSliderContext } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './slider.module.css';

export const sliderOverrideCssProperties: CssPropertyInput[] = [
  ['--slider-color', 'var(--color-foreground)', 'Controls the default slider text color.'],
  ['--slider-control-size', 'var(--spacing-5)', 'Controls the control hit area thickness.'],
  ['--slider-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled slider opacity.'],
  [
    '--slider-dragging-indicator-bg',
    'var(--color-foreground)',
    'Controls dragging indicator background.',
  ],
  [
    '--slider-dragging-indicator-color',
    'var(--color-background)',
    'Controls dragging indicator text color.',
  ],
  [
    '--slider-dragging-indicator-font-size',
    'var(--text-xs)',
    'Controls dragging indicator font size.',
  ],
  [
    '--slider-dragging-indicator-font-weight',
    'var(--weight-medium)',
    'Controls dragging indicator font weight.',
  ],
  ['--slider-dragging-indicator-line-height', '1', 'Controls dragging indicator line height.'],
  [
    '--slider-dragging-indicator-radius',
    'var(--radius-sm)',
    'Controls dragging indicator corner radius.',
  ],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-gap', 'var(--spacing-2)', 'Controls spacing between slider slots.'],
  ['--slider-height', '12rem', 'Controls vertical slider height.'],
  ['--slider-label-color', 'var(--slider-color)', 'Controls label text color.'],
  ['--slider-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--slider-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--slider-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--slider-marker-color', 'var(--color-muted-foreground)', 'Controls marker text color.'],
  ['--slider-marker-dot-bg', 'var(--color-border)', 'Controls inactive marker dot color.'],
  ['--slider-marker-dot-bg-active', 'var(--slider-range-bg)', 'Controls active marker dot color.'],
  ['--slider-marker-dot-size', 'var(--spacing-1)', 'Controls marker dot size.'],
  ['--slider-marker-font-size', 'var(--text-xs)', 'Controls marker font size.'],
  [
    '--slider-marker-group-margin-inline-start',
    'var(--spacing-2)',
    'Controls vertical marker offset.',
  ],
  ['--slider-marker-group-margin-top', 'var(--spacing-2)', 'Controls horizontal marker offset.'],
  ['--slider-marker-line-height', 'var(--line-height-text-xs)', 'Controls marker line height.'],
  ['--slider-range-bg', 'var(--color-primary)', 'Controls filled range color.'],
  ['--slider-range-radius', 'inherit', 'Controls filled range corner radius.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-border-width', 'var(--border-width-sm)', 'Controls thumb border width.'],
  ['--slider-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--slider-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--slider-thumb-shadow-dragging', 'var(--shadow-md)', 'Controls thumb shadow while dragging.'],
  ['--slider-thumb-size', 'var(--spacing-4)', 'Controls thumb width and height.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', 'var(--spacing-1-5)', 'Controls track thickness.'],
  ['--slider-transition', 'var(--transition-default)', 'Controls thumb transition timing.'],
  ['--slider-value-text-color', 'var(--slider-color)', 'Controls value text color.'],
  ['--slider-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  ['--slider-value-text-font-weight', 'var(--weight-regular)', 'Controls value text font weight.'],
  [
    '--slider-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--slider-width', '12rem', 'Controls horizontal slider width.'],
  ['--slider-width-vertical', 'max-content', 'Controls vertical slider width.'],
];

export const sliderPlaygroundCssProperties: CssPropertyInput[] = [
  ['--slider-color', 'var(--color-foreground)', 'Controls default slider text color.'],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-range-bg', 'var(--color-primary)', 'Controls filled range color.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', 'var(--spacing-1-5)', 'Controls track thickness.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-size', 'var(--spacing-4)', 'Controls thumb width and height.'],
];

export const sliderMarks = [0, 25, 50, 75, 100];

export const sliderNoCss = `No additional styles are required.`;

export const sliderNoData = `No external data is required.`;

export const sliderMarksData = `const marks = [0, 25, 50, 75, 100];`;

export const sliderHeaderCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}
`;

export const sliderStackCss = `
.slider-stack {
  display: grid;
  gap: var(--spacing-4);
}
`;

export const sliderEventsCss = `
.slider-stack {
  display: grid;
  gap: var(--spacing-4);
}

.slider-header,
.slider-status {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}
`;

export const sliderVerticalCss = `
.slider-vertical {
  --slider-width-vertical: auto;
  --slider-height: 12rem;
}
`;

export const sliderContextCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}

.slider-value {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}
`;

export const sliderBasicCode = `
import { Slider } from "@moduix/react";

export function SliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div className="slider-header">
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderRangeCode = `
import { Slider } from "@moduix/react";

export function RangeSliderDemo() {
  return (
    <Slider defaultValue={[30, 60]}>
      <Slider.Label>Price range</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum price">
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Maximum price">
        </Slider.Thumb>
      </Slider.Control>
      <Slider.ValueText />
    </Slider>
  );
}
`;

export const sliderMinMaxCode = `
import { Slider } from "@moduix/react";

export function MinMaxSliderDemo() {
  return (
    <Slider min={-10} max={10} defaultValue={[0]}>
      <Slider.Label>Offset</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Offset">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderStepCode = `
import { Slider } from "@moduix/react";

export function StepSliderDemo() {
  return (
    <Slider step={0.01} min={5} max={10} defaultValue={[7.5]}>
      <div className="slider-header">
        <Slider.Label>Precision</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Precision">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderControlledCode = `
import { Slider } from "@moduix/react";
import { useState } from "react";

export function ControlledSliderDemo() {
  const [value, setValue] = useState([24]);

  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
      <div className="slider-header">
        <Slider.Label>Brightness</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Brightness">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderEventsCode = `
import { Slider } from "@moduix/react";
import { useState } from "react";

export function EventsSliderDemo() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);

  return (
    <div className="slider-stack">
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <div className="slider-header">
          <Slider.Label>Gain</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Gain">
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
      <div className="slider-status">
        Live {liveValue.join(", ")} / Committed {committedValue.join(", ")}
      </div>
    </div>
  );
}
`;

export const sliderVerticalCode = `
import { Slider } from "@moduix/react";

export function VerticalSliderDemo() {
  return (
    <Slider orientation="vertical" defaultValue={[60]} className="slider-vertical">
      <Slider.Label>Output</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Output">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderCenterOriginCode = `
import { Slider } from "@moduix/react";

export function CenterOriginSliderDemo() {
  return (
    <Slider min={-50} max={50} defaultValue={[20]} origin="center">
      <div className="slider-header">
        <Slider.Label>Balance</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Balance">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderMarksCode = `
import { Slider } from "@moduix/react";

export function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div className="slider-header">
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Progress">
        </Slider.Thumb>
      </Slider.Control>
      <Slider.MarkerGroup>
        {marks.map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}
`;

export const sliderDraggingIndicatorCode = `
import { Slider } from "@moduix/react";

export function DraggingIndicatorSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <Slider.Label>Gain</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Gain">
          <Slider.DraggingIndicator />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderThumbAlignmentCode = `
import { Slider } from "@moduix/react";

export function ThumbAlignmentSliderDemo() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <div className="slider-header">
        <Slider.Label>Centered thumb</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Centered thumb">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderThumbCollisionCode = `
import { Slider } from "@moduix/react";

export function ThumbCollisionSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} thumbCollisionBehavior="push">
      <div className="slider-header">
        <Slider.Label>Linked range</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum linked value">
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Maximum linked value">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderThumbOverlapCode = `
import { Slider } from "@moduix/react";

export function ThumbOverlapSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} minStepsBetweenThumbs={5}>
      <div className="slider-header">
        <Slider.Label>Minimum gap</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum gap start">
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Minimum gap end">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderDisabledCode = `
import { Slider } from "@moduix/react";

export function DisabledSliderDemo() {
  return (
    <Slider defaultValue={[32]} disabled>
      <div className="slider-header">
        <Slider.Label>Notifications</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Notifications">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderContextCode = `
import { Slider, useSliderContext } from "@moduix/react";

function SliderStatus() {
  const slider = useSliderContext();

  return (
    <div className="slider-header">
      <Slider.Label>Dragging: {String(slider.dragging)}</Slider.Label>
      <span className="slider-value">{slider.value.join(", ")}</span>
    </div>
  );
}

export function ContextSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <SliderStatus />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Context value">
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
`;

export const sliderRootProviderCode = `
import { Button, Slider, useSlider } from "@moduix/react";

export function RootProviderSliderDemo() {
  const slider = useSlider({ defaultValue: [40] });

  return (
    <div className="slider-stack">
      <Button onClick={() => slider.focus()}>Focus</Button>
      <Slider.RootProvider value={slider}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Volume">
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </div>
  );
}
`;

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

function SliderHeader({ label }: { label: string }) {
  return (
    <div className={styles.header}>
      <Slider.Label>{label}</Slider.Label>
      <Slider.ValueText />
    </div>
  );
}

function SliderControlExample() {
  return (
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumbs />
    </Slider.Control>
  );
}

export function SliderExample() {
  return (
    <Slider defaultValue={[40]}>
      <SliderHeader label="Volume" />
      <SliderControlExample />
    </Slider>
  );
}

export function RangeSliderExample() {
  return (
    <Slider defaultValue={[30, 60]}>
      <Slider.Label>Price range</Slider.Label>
      <SliderControlExample />
      <Slider.ValueText />
    </Slider>
  );
}

export function MinMaxSliderExample() {
  return (
    <Slider min={-10} max={10} defaultValue={[0]}>
      <SliderHeader label="Offset" />
      <SliderControlExample />
    </Slider>
  );
}

export function StepSliderExample() {
  return (
    <Slider step={0.01} min={5} max={10} defaultValue={[7.5]}>
      <SliderHeader label="Precision" />
      <SliderControlExample />
    </Slider>
  );
}

export function ControlledSliderExample() {
  const [value, setValue] = useState([24]);

  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
      <SliderHeader label="Brightness" />
      <SliderControlExample />
    </Slider>
  );
}

export function EventsSliderExample() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);

  return (
    <div className={styles.stack}>
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <SliderHeader label="Gain" />
        <SliderControlExample />
      </Slider>
      <div className={styles.status}>
        Live {liveValue.join(', ')} / Committed {committedValue.join(', ')}
      </div>
    </div>
  );
}

export function VerticalSliderExample() {
  return (
    <div className={styles.verticalContainer}>
      <Slider orientation="vertical" defaultValue={[60]} className={styles.verticalSlider}>
        <Slider.Label>Output</Slider.Label>
        <Slider.ValueText />
        <SliderControlExample />
      </Slider>
    </div>
  );
}

export function CenterOriginSliderExample() {
  return (
    <Slider min={-50} max={50} defaultValue={[20]} origin="center">
      <SliderHeader label="Balance" />
      <SliderControlExample />
    </Slider>
  );
}

export function MarksSliderExample() {
  return (
    <Slider defaultValue={[50]}>
      <SliderHeader label="Progress" />
      <SliderControlExample />
      <Slider.MarkerGroup>
        {sliderMarks.map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}

export function DraggingIndicatorSliderExample() {
  return (
    <Slider defaultValue={[40]}>
      <Slider.Label>Gain</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Gain">
          <Slider.DraggingIndicator />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

export function ThumbAlignmentSliderExample() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <SliderHeader label="Centered thumb" />
      <SliderControlExample />
    </Slider>
  );
}

export function ThumbCollisionSliderExample() {
  return (
    <Slider defaultValue={[25, 60]} thumbCollisionBehavior="push">
      <SliderHeader label="Linked range" />
      <SliderControlExample />
    </Slider>
  );
}

export function ThumbOverlapSliderExample() {
  return (
    <Slider defaultValue={[25, 60]} minStepsBetweenThumbs={5}>
      <SliderHeader label="Minimum gap" />
      <SliderControlExample />
    </Slider>
  );
}

export function DisabledSliderExample() {
  return (
    <Slider defaultValue={[32]} disabled>
      <SliderHeader label="Notifications" />
      <SliderControlExample />
    </Slider>
  );
}

export function ContextSliderExample() {
  return (
    <Slider defaultValue={[40]}>
      <SliderContextStatus />
      <SliderControlExample />
    </Slider>
  );
}

export function RootProviderSliderExample() {
  const slider = useSlider({ defaultValue: [40] });

  return (
    <div className={styles.stack}>
      <Button onClick={() => slider.focus()}>Focus</Button>
      <Slider.RootProvider value={slider}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
        <SliderControlExample />
      </Slider.RootProvider>
    </div>
  );
}

export function AdvancedCustomizationSliderExample() {
  return (
    <Slider defaultValue={[40]}>
      <SliderHeader label="Volume" />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume"></Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div className={styles.header}>
      <Slider.Label>Dragging: {String(slider.dragging)}</Slider.Label>
      <span className={styles.value}>{slider.value.join(', ')}</span>
    </div>
  );
}
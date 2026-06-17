import { AngleSlider } from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);

export const angleSliderOverrideCssProperties: CssPropertyInput[] = [
  ['--angle-slider-color', 'var(--color-foreground)', 'Controls the default dial text color.'],
  [
    '--angle-slider-center-dot-color',
    'var(--angle-slider-color)',
    'Controls the center dot color.',
  ],
  ['--angle-slider-center-dot-size', '0.375rem', 'Controls the center dot size.'],
  ['--angle-slider-control-bg', 'var(--color-background)', 'Controls the inner dial fill color.'],
  [
    '--angle-slider-control-border-color',
    'var(--color-border)',
    'Controls the inner dial border color.',
  ],
  [
    '--angle-slider-control-border-width',
    'var(--border-width-sm)',
    'Controls the inner dial border width.',
  ],
  ['--angle-slider-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled dial opacity.'],
  ['--angle-slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--angle-slider-gap', '0.75rem', 'Controls spacing between label, dial, and value text.'],
  [
    '--angle-slider-indicator-bg',
    'var(--color-primary)',
    'Controls the thumb and active line color.',
  ],
  [
    '--angle-slider-invalid-color',
    'var(--color-destructive)',
    'Controls invalid-state thumb and border color.',
  ],
  ['--angle-slider-label-color', 'var(--angle-slider-color)', 'Controls label text color.'],
  ['--angle-slider-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--angle-slider-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--angle-slider-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--angle-slider-marker-active-color',
    'var(--color-primary)',
    'Controls optional marker color below the current value.',
  ],
  [
    '--angle-slider-marker-color',
    'var(--color-muted-foreground)',
    'Controls optional inactive marker color.',
  ],
  [
    '--angle-slider-marker-current-color',
    'var(--color-foreground)',
    'Controls optional marker color at the current value.',
  ],
  ['--angle-slider-marker-height', '0.625rem', 'Controls optional marker height.'],
  ['--angle-slider-marker-width', '0.125rem', 'Controls optional marker width.'],
  ['--angle-slider-radius', 'var(--radius-full)', 'Controls dial corner radius.'],
  ['--angle-slider-ring-thickness', '0.875rem', 'Controls outer ring thickness.'],
  ['--angle-slider-shadow', 'none', 'Controls dial outer shadow.'],
  ['--angle-slider-size', '8rem', 'Controls the dial width and height.'],
  [
    '--angle-slider-thumb-bg',
    'var(--angle-slider-indicator-bg)',
    'Controls the thumb circle fill color.',
  ],
  ['--angle-slider-thumb-border-color', 'var(--color-border)', 'Controls the thumb border color.'],
  [
    '--angle-slider-thumb-border-width',
    'var(--border-width-sm)',
    'Controls the thumb border width.',
  ],
  ['--angle-slider-thumb-line-width', '0.1875rem', 'Controls the active line thickness.'],
  ['--angle-slider-thumb-radius', 'var(--radius-full)', 'Controls the thumb corner radius.'],
  ['--angle-slider-thumb-shadow', 'var(--shadow-sm)', 'Controls the thumb shadow.'],
  ['--angle-slider-thumb-size', '1rem', 'Controls the thumb circle size.'],
  ['--angle-slider-track-bg', 'var(--color-muted)', 'Controls the outer ring color.'],
  [
    '--angle-slider-track-border-color',
    'var(--color-border)',
    'Controls the outer ring border color.',
  ],
  [
    '--angle-slider-track-border-width',
    'var(--border-width-sm)',
    'Controls the outer ring border width.',
  ],
  ['--angle-slider-transition', 'var(--transition-default)', 'Controls thumb transition timing.'],
  ['--angle-slider-value-text-color', 'var(--angle-slider-color)', 'Controls value text color.'],
  ['--angle-slider-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--angle-slider-value-text-font-weight',
    'var(--weight-medium)',
    'Controls value text font weight.',
  ],
  [
    '--angle-slider-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
];

const angleSliderCssProperties = angleSliderOverrideCssProperties.map(normalizeCssProperty);

export const angleSliderMarkerCss = `
  .docs-angle-slider-markers {
    --angle-slider-size: 9rem;
    --angle-slider-track-bg: color-mix(in oklab, var(--color-chart-4) 14%, var(--color-muted));
    --angle-slider-indicator-bg: var(--color-chart-4);
    --angle-slider-thumb-bg: var(--color-chart-4);
    --angle-slider-thumb-border-color: var(--color-background);
    --angle-slider-marker-active-color: color-mix(
      in oklab,
      var(--color-chart-4) 70%,
      var(--color-foreground)
    );
    --angle-slider-marker-color: color-mix(
      in oklab,
      var(--color-chart-4) 18%,
      var(--color-border)
    );
  }
`;

export const angleSliderCustomStylingCss = `
  .docs-angle-slider-spotlight {
    --angle-slider-color: var(--color-chart-5);
    --angle-slider-control-bg: color-mix(in oklab, var(--color-chart-5) 10%, var(--color-card));
    --angle-slider-center-dot-color: var(--color-chart-5);
    --angle-slider-indicator-bg: var(--color-chart-5);
    --angle-slider-size: 10rem;
    --angle-slider-thumb-bg: var(--color-chart-5);
    --angle-slider-thumb-border-color: var(--color-background);
    --angle-slider-thumb-line-width: 0.25rem;
    --angle-slider-thumb-size: 1.125rem;
    --angle-slider-track-bg: color-mix(in oklab, var(--color-chart-5) 18%, var(--color-muted));
    --angle-slider-track-border-color: transparent;
  }
`;

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function AngleSliderCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={angleSliderCssProperties} />;
}

export function AngleSliderExample() {
  return (
    <AngleSlider.Root defaultValue={135} aria-label="Rotation">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

export function ControlledAngleSliderExample() {
  const [value, setValue] = useState(210);

  return (
    <AngleSlider.Root
      value={value}
      aria-label="Heading"
      onValueChange={(details) => setValue(details.value)}
    >
      <AngleSlider.Label>Heading</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

export function SteppedAngleSliderExample() {
  return (
    <AngleSlider.Root defaultValue={60} step={15} aria-label="Snap angle">
      <AngleSlider.Label>15 Step</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

export function ReadOnlyAngleSliderExample() {
  return (
    <AngleSlider.Root defaultValue={300} readOnly aria-label="Locked angle">
      <AngleSlider.Label>Locked angle</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

export function MarkerAngleSliderExample() {
  return (
    <>
      <style>{angleSliderMarkerCss}</style>
      <AngleSlider.Root
        defaultValue={45}
        aria-label="Compass heading"
        className="docs-angle-slider-markers"
      >
        <AngleSlider.Label>Compass</AngleSlider.Label>
        <AngleSlider.Control>
          <AngleSlider.MarkerGroup>
            {markerValues.map((value) => (
              <AngleSlider.Marker key={value} value={value} />
            ))}
          </AngleSlider.MarkerGroup>
          <AngleSlider.Thumb />
        </AngleSlider.Control>
        <AngleSlider.ValueText />
        <AngleSlider.HiddenInput />
      </AngleSlider.Root>
    </>
  );
}

export function CustomStylingAngleSliderExample() {
  return (
    <>
      <style>{angleSliderCustomStylingCss}</style>
      <AngleSlider.Root
        defaultValue={315}
        aria-label="Spotlight direction"
        className="docs-angle-slider-spotlight"
      >
        <AngleSlider.Label>Spotlight</AngleSlider.Label>
        <AngleSlider.Control>
          <AngleSlider.Thumb />
        </AngleSlider.Control>
        <AngleSlider.ValueText />
        <AngleSlider.HiddenInput />
      </AngleSlider.Root>
    </>
  );
}
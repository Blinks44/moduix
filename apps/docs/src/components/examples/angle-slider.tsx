import { useAngleSlider } from '@ark-ui/react/angle-slider';
import { AngleSlider } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export const angleSliderBasicCss = `
  .docs-angle-slider-basic {
    --angle-slider-size: 9rem;
  }
`;

export const angleSliderControlledCss = `
  .docs-angle-slider-controlled {
    --angle-slider-indicator-bg: var(--color-chart-2);
    --angle-slider-size: 9rem;
  }
`;

export const angleSliderStepCss = `
  .docs-angle-slider-step {
    --angle-slider-indicator-bg: var(--color-chart-3);
    --angle-slider-size: 9rem;
  }
`;

export const angleSliderDisabledCss = `
  .docs-angle-slider-disabled {
    --angle-slider-size: 9rem;
  }
`;

export const angleSliderReadOnlyCss = `
  .docs-angle-slider-readonly {
    --angle-slider-size: 9rem;
  }
`;

export const angleSliderRootProviderCss = `
  .docs-angle-slider-provider-layout {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .docs-angle-slider-provider {
    --angle-slider-size: 9rem;
  }

  .docs-angle-slider-provider-button {
    min-height: 2.5rem;
    padding-inline: 1rem;
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
    cursor: pointer;
  }

  .docs-angle-slider-provider-button:hover {
    background: var(--color-muted);
  }

  .docs-angle-slider-provider-button:focus-visible {
    outline: var(--border-width-md) solid var(--color-ring);
    outline-offset: 2px;
  }
`;

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
  ['--angle-slider-focus-ring-color', 'var(--color-ring)', 'Controls the focus ring color.'],
  ['--angle-slider-focus-ring-width', '0.1875rem', 'Controls the control focus ring width.'],
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
    'Controls marker color below the current value.',
  ],
  [
    '--angle-slider-marker-color',
    'var(--color-muted-foreground)',
    'Controls inactive marker color.',
  ],
  [
    '--angle-slider-marker-current-color',
    'var(--color-foreground)',
    'Controls marker color at the current value.',
  ],
  ['--angle-slider-marker-height', '0.625rem', 'Controls marker height.'],
  ['--angle-slider-marker-width', '0.125rem', 'Controls marker width.'],
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

export const angleSliderCssProperties = angleSliderOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function AngleSliderMarkers() {
  return (
    <AngleSlider.MarkerGroup>
      {markerValues.map((value) => (
        <AngleSlider.Marker key={value} value={value} />
      ))}
    </AngleSlider.MarkerGroup>
  );
}

function AngleSliderParts() {
  return (
    <>
      <AngleSlider.Control>
        <AngleSliderMarkers />
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </>
  );
}

export function AngleSliderCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={angleSliderCssProperties} />;
}

export function AngleSliderExample() {
  return (
    <>
      <style>{angleSliderBasicCss}</style>
      <AngleSlider.Root
        defaultValue={135}
        aria-label="Rotation"
        className="docs-angle-slider-basic"
      >
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    </>
  );
}

export function ControlledAngleSliderExample() {
  const [value, setValue] = useState(210);

  return (
    <>
      <style>{angleSliderControlledCss}</style>
      <AngleSlider.Root
        value={value}
        aria-label="Heading"
        className="docs-angle-slider-controlled"
        onValueChange={(details) => setValue(details.value)}
      >
        <AngleSlider.Label>Heading</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    </>
  );
}

export function SteppedAngleSliderExample() {
  return (
    <>
      <style>{angleSliderStepCss}</style>
      <AngleSlider.Root
        defaultValue={60}
        step={15}
        aria-label="Snap angle"
        className="docs-angle-slider-step"
      >
        <AngleSlider.Label>15 Step</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    </>
  );
}

export function DisabledAngleSliderExample() {
  return (
    <>
      <style>{angleSliderDisabledCss}</style>
      <AngleSlider.Root
        defaultValue={45}
        disabled
        aria-label="Disabled rotation"
        className="docs-angle-slider-disabled"
      >
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    </>
  );
}

export function ReadOnlyAngleSliderExample() {
  return (
    <>
      <style>{angleSliderReadOnlyCss}</style>
      <AngleSlider.Root
        defaultValue={300}
        readOnly
        aria-label="Locked angle"
        className="docs-angle-slider-readonly"
      >
        <AngleSlider.Label>Locked angle</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    </>
  );
}

export function RootProviderAngleSliderExample() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <>
      <style>{angleSliderRootProviderCss}</style>
      <div className="docs-angle-slider-provider-layout">
        <AngleSlider.RootProvider value={angleSlider} className="docs-angle-slider-provider">
          <AngleSlider.Label>Rotation</AngleSlider.Label>
          <AngleSliderParts />
        </AngleSlider.RootProvider>
        <button
          type="button"
          className="docs-angle-slider-provider-button"
          onClick={() => angleSlider.setValue(90)}
        >
          Set to 90°
        </button>
      </div>
    </>
  );
}
import { SegmentGroup, useSegmentGroup } from '@moduix/react';
import { useState, type FormEvent } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const frameworkItems = ['React', 'Solid', 'Svelte', 'Vue'].map((value) => ({
  value,
  label: value,
}));
const disabledFrameworkItems = frameworkItems.map((item) => ({
  ...item,
  disabled: item.value === 'Svelte',
}));
const viewItems = ['List', 'Board', 'Calendar'].map((value) => ({ value, label: value }));

export const segmentGroupFrameworksData = `
const frameworks = ["React", "Solid", "Svelte", "Vue"];
`;

export const segmentGroupViewsData = `
const views = ["List", "Board", "Calendar"];
`;

export const segmentGroupExampleCss = `
.segment-stack {
  display: grid;
  gap: var(--spacing-2);
  justify-items: start;
}

.segment-button {
  width: fit-content;
  min-height: 2rem;
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-md);
  padding-inline: var(--spacing-3);
  background: var(--color-background);
  color: var(--color-foreground);
}

.segment-output {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}
`;

export const segmentGroupVerticalCss = `
.segment-vertical {
  min-width: 10rem;
}
`;

export const segmentGroupFormCss = `
.segment-form {
  display: grid;
  gap: var(--spacing-3);
  justify-items: start;
}
`;

export const segmentGroupFormExampleCss = `${segmentGroupExampleCss}
${segmentGroupFormCss}`;

export const segmentGroupAsChildCss = `
.segment-card-item {
  display: grid;
  gap: 0.125rem;
  width: 9rem;
  min-height: 4.5rem;
  align-content: center;
  justify-items: start;
  padding: var(--spacing-3);
  white-space: normal;
}

.segment-card-title {
  font-weight: var(--weight-semibold);
}

.segment-card-description {
  position: relative;
  z-index: 1;
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}

.segment-card-item[data-state="checked"] .segment-card-description {
  color: var(--segment-group-item-color-checked, var(--color-foreground));
}
`;

export const segmentGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--segment-group-bg', 'var(--color-muted)', 'Controls the root background.'],
  ['--segment-group-border-color', 'var(--color-border)', 'Controls the root border color.'],
  [
    '--segment-group-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid root border color.',
  ],
  ['--segment-group-border-width', 'var(--border-width-sm)', 'Controls the root border width.'],
  ['--segment-group-color', 'var(--color-foreground)', 'Controls inherited group text color.'],
  [
    '--segment-group-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled root opacity.',
  ],
  ['--segment-group-focus-ring-color', 'var(--color-ring)', 'Controls item focus ring color.'],
  [
    '--segment-group-focus-ring-color-invalid',
    'var(--color-destructive)',
    'Controls invalid item focus ring color.',
  ],
  [
    '--segment-group-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls item focus ring offset.',
  ],
  ['--segment-group-focus-ring-width', 'var(--border-width-sm)', 'Controls item focus ring width.'],
  ['--segment-group-gap', 'var(--spacing-1)', 'Controls spacing between segment items.'],
  ['--segment-group-indicator-bg', 'var(--color-background)', 'Controls indicator background.'],
  ['--segment-group-indicator-radius', 'var(--radius-md)', 'Controls indicator radius.'],
  ['--segment-group-indicator-shadow', 'var(--shadow-sm)', 'Controls indicator shadow.'],
  [
    '--segment-group-indicator-transition-duration',
    'var(--duration-normal)',
    'Controls indicator movement duration.',
  ],
  [
    '--segment-group-indicator-transition-timing-function',
    'var(--ease-in-out)',
    'Controls indicator movement easing.',
  ],
  ['--segment-group-item-color', 'var(--color-muted-foreground)', 'Controls unchecked item text.'],
  ['--segment-group-item-color-checked', 'var(--color-foreground)', 'Controls checked item text.'],
  ['--segment-group-item-color-hover', 'var(--color-foreground)', 'Controls item hover text.'],
  [
    '--segment-group-item-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  ['--segment-group-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--segment-group-item-font-weight', 'var(--weight-medium)', 'Controls item font weight.'],
  ['--segment-group-item-gap', 'var(--spacing-2)', 'Controls spacing inside each item.'],
  ['--segment-group-item-height', '2rem', 'Controls item minimum height.'],
  ['--segment-group-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--segment-group-item-padding-x', '0.875rem', 'Controls horizontal item padding.'],
  ['--segment-group-item-radius', 'var(--radius-md)', 'Controls item radius.'],
  ['--segment-group-label-color', 'var(--segment-group-color)', 'Controls label text color.'],
  ['--segment-group-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--segment-group-label-font-weight', 'var(--weight-semibold)', 'Controls label font weight.'],
  [
    '--segment-group-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--segment-group-max-width', '100%', 'Controls root maximum width.'],
  ['--segment-group-padding', 'var(--spacing-1)', 'Controls root padding.'],
  ['--segment-group-radius', 'var(--radius-lg)', 'Controls root radius.'],
  ['--segment-group-transition', 'var(--transition-default)', 'Controls item transitions.'],
];

export function SegmentGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={segmentGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function SegmentGroupExample() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  );
}

export function ControlledSegmentGroupExample() {
  const [value, setValue] = useState<string | null>('React');

  return (
    <div className="segment-stack">
      <SegmentGroup
        aria-label="Framework"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworkItems} />
      </SegmentGroup>
      <output className="segment-output">selected: {value ?? 'none'}</output>
    </div>
  );
}

export function SegmentGroupRootProviderExample() {
  const segmentGroup = useSegmentGroup({ defaultValue: 'React' });

  return (
    <div className="segment-stack">
      <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworkItems} />
      </SegmentGroup.RootProvider>
      <button
        className="segment-button"
        type="button"
        onClick={() => segmentGroup.setValue('Solid')}
      >
        Set to Solid
      </button>
      <output className="segment-output">selected: {segmentGroup.value ?? 'none'}</output>
    </div>
  );
}

export function DisabledSegmentGroupExample() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={disabledFrameworkItems} />
    </SegmentGroup>
  );
}

export function ConditionalSegmentGroupExample() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="segment-stack">
      <button
        className="segment-button"
        type="button"
        onClick={() => setVisible((value) => !value)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {visible ? <SegmentGroupExample /> : null}
    </div>
  );
}

export function VerticalSegmentGroupExample() {
  return (
    <SegmentGroup
      aria-label="View"
      defaultValue="List"
      orientation="vertical"
      className="segment-vertical"
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={viewItems} />
    </SegmentGroup>
  );
}

export function FormSegmentGroupExample() {
  const [submitted, setSubmitted] = useState('none');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitted(String(formData.get('framework') ?? 'none'));
  };

  return (
    <form className="segment-form" onSubmit={handleSubmit}>
      <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworkItems} />
      </SegmentGroup>
      <button className="segment-button" type="submit">
        Submit
      </button>
      <output className="segment-output">submitted: {submitted}</output>
    </form>
  );
}

export function InvalidSegmentGroupExample() {
  return (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  );
}

export function SegmentGroupAsChildExample() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroup.Item key={item} value={item} asChild>
          <label className="segment-card-item">
            <SegmentGroup.ItemText className="segment-card-title">{item}</SegmentGroup.ItemText>
            <span className="segment-card-description">{description}</span>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </label>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}
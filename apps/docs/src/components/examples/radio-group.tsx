import { Field, Fieldset, RadioGroup, useRadioGroup } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';

const frameworks = ['React', 'Solid', 'Vue'] as const;

export const radioGroupFrameworksData = `
const frameworks = ["React", "Solid", "Vue"];
`;

export const radioGroupExampleCss = `
.radio-stack {
  display: grid;
  gap: var(--spacing-2);
}

.radio-field,
.radio-fieldset {
  width: fit-content;
  max-width: min(20rem, 100%);
  margin-inline: auto;
}

.radio-button {
  width: fit-content;
  min-height: 2rem;
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-md);
  padding-inline: var(--spacing-3);
  background: var(--color-background);
  color: var(--color-foreground);
}

.radio-inline-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--radio-group-gap, var(--spacing-2));
}
`;

export const radioGroupAsChildCss = `
.radio-card-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  width: 14rem;
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  gap: var(--spacing-2);
}

.radio-card-item[data-state="checked"] {
  border-color: var(--color-primary);
  background-color: var(--color-accent);
}
`;

export const radioGroupIndicatorCss = `
.radio-indicator-stack {
  display: grid;
  gap: var(--spacing-2);
}

.radio-indicator-root {
  padding: var(--spacing-1);
}

.radio-group-indicator {
  border-radius: var(--radius-md);
}
`;

export const radioGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--radio-bg', 'var(--color-background)', 'Controls unchecked item control background.'],
  ['--radio-bg-checked', 'var(--color-primary)', 'Controls checked item control background.'],
  ['--radio-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background.'],
  ['--radio-border-color', 'var(--color-border)', 'Controls unchecked item control border color.'],
  ['--radio-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--radio-border-width', 'var(--border-width-sm)', 'Controls item control border width.'],
  ['--radio-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled item opacity.'],
  ['--radio-focus-ring-color', 'var(--color-ring)', 'Controls item control focus ring color.'],
  ['--radio-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  [
    '--radio-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--radio-gap', 'var(--spacing-2)', 'Controls spacing between item control and text.'],
  ['--radio-group-color', 'var(--color-foreground)', 'Controls inherited group text color.'],
  ['--radio-group-gap', 'var(--spacing-2)', 'Controls spacing inside the root.'],
  ['--radio-group-indicator-opacity', '0.12', 'Controls optional group indicator opacity.'],
  [
    '--radio-group-label-color',
    'var(--radio-group-color, var(--color-foreground))',
    'Controls group label text color.',
  ],
  ['--radio-group-label-font-size', 'var(--text-sm)', 'Controls group label font size.'],
  [
    '--radio-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--radio-group-label-line-height',
    'var(--line-height-text-sm)',
    'Controls group label line height.',
  ],
  ['--radio-indicator-border-color', 'currentColor', 'Controls item dot border color.'],
  ['--radio-indicator-border-width', '0', 'Controls item dot border width.'],
  ['--radio-indicator-color', 'var(--color-primary-foreground)', 'Controls item dot color.'],
  ['--radio-indicator-radius', 'var(--radius-full)', 'Controls item dot and indicator radius.'],
  ['--radio-indicator-size-xs', 'var(--spacing-1)', 'Controls `xs` item dot size.'],
  ['--radio-indicator-size-sm', 'var(--spacing-1-5)', 'Controls `sm` item dot size.'],
  ['--radio-indicator-size-md', 'var(--spacing-2)', 'Controls `md` item dot size.'],
  ['--radio-indicator-size-lg', 'var(--spacing-2-5)', 'Controls `lg` item dot size.'],
  ['--radio-indicator-size-xl', 'var(--spacing-3)', 'Controls `xl` item dot size.'],
  ['--radio-label-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--radio-label-font-size', 'var(--text-sm)', 'Controls item text font size.'],
  ['--radio-label-font-weight', 'var(--weight-medium)', 'Controls item text font weight.'],
  ['--radio-label-line-height', 'var(--line-height-text-sm)', 'Controls item text line height.'],
  ['--radio-size-xs', 'var(--spacing-3-5)', 'Controls `xs` item control size.'],
  ['--radio-size-sm', 'var(--spacing-4)', 'Controls `sm` item control size.'],
  ['--radio-size-md', 'var(--spacing-5)', 'Controls `md` item control size.'],
  ['--radio-size-lg', 'var(--size-xs)', 'Controls `lg` item control size.'],
  ['--radio-size-xl', 'var(--spacing-7)', 'Controls `xl` item control size.'],
  ['--radio-transition', 'var(--transition-default)', 'Controls radio state transitions.'],
];

export function RadioGroupCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={radioGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function FrameworkItems({ items = frameworks }: { items?: readonly string[] }) {
  return (
    <>
      {items.map((framework) => (
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </>
  );
}

export function RadioGroupExample(props: ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup defaultValue="React" {...props}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <FrameworkItems />
    </RadioGroup>
  );
}

export function RadioGroupInitialValueExample() {
  return (
    <RadioGroup defaultValue="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <FrameworkItems />
    </RadioGroup>
  );
}

export function ControlledRadioGroupExample() {
  const [value, setValue] = useState<string | null>('React');

  return (
    <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <FrameworkItems />
    </RadioGroup>
  );
}

export function RadioGroupRootProviderExample() {
  const radioGroup = useRadioGroup({ defaultValue: 'React' });

  return (
    <div className="radio-stack">
      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <FrameworkItems />
      </RadioGroup.RootProvider>
      <button className="radio-button" type="button" onClick={() => radioGroup.setValue('Solid')}>
        Set to Solid
      </button>
    </div>
  );
}

export function DisabledRadioGroupExample() {
  return (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <FrameworkItems />
    </RadioGroup>
  );
}

export function RadioGroupOrientationExample() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div className="radio-inline-items">
        <FrameworkItems />
      </div>
    </RadioGroup>
  );
}

export function RadioGroupFieldsetExample() {
  return (
    <Fieldset className="radio-fieldset">
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
      <RadioGroup defaultValue="React">
        <FrameworkItems />
      </RadioGroup>
    </Fieldset>
  );
}

export function RadioGroupFieldExample() {
  return (
    <Field.Root invalid className="radio-field">
      <Field.Label>Account type</Field.Label>
      <RadioGroup required name="account-type">
        <RadioGroup.Option value="personal">Personal account</RadioGroup.Option>
        <RadioGroup.Option value="team">Team account</RadioGroup.Option>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      <Field.ErrorText>Choose an account type.</Field.ErrorText>
    </Field.Root>
  );
}

export function RadioGroupSizesExample() {
  return (
    <RadioGroup defaultValue="md">
      <RadioGroup.Label>Control Size</RadioGroup.Label>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <RadioGroup.Option key={size} value={size} size={size}>
          {size.toUpperCase()}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export function RadioGroupAsChildExample() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework} asChild>
          <label className="radio-card-item">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}

export function RadioGroupIndicatorExample() {
  return (
    <div className="radio-indicator-stack">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className="radio-indicator-root">
        <RadioGroup.Indicator className="radio-group-indicator" />
        <FrameworkItems />
      </RadioGroup>
    </div>
  );
}

export function RadioGroupAdvancedCustomizationExample() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}
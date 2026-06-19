import type { ComponentProps } from 'react';
import { Field, Input } from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

export const inputOverrideCssProperties: CssPropertyInput[] = [
  ['--input-bg', 'var(--color-background)', 'Controls the input background color.'],
  ['--input-border-color', 'var(--color-border)', 'Controls the input border color.'],
  [
    '--input-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--input-border-style', 'solid', 'Controls the input border style.'],
  ['--input-border-width', 'var(--border-width-sm)', 'Controls the input border width.'],
  ['--input-color', 'var(--color-foreground)', 'Controls the input text color.'],
  ['--input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled input opacity.'],
  ['--input-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--input-focus-ring-offset',
    'calc(0px - var(--input-border-width, var(--border-width-sm)))',
    'Controls focus ring offset.',
  ],
  [
    '--input-focus-ring-width',
    'var(--input-border-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--input-font-size', 'var(--text-md)', 'Controls default font size.'],
  ['--input-font-size-xs', 'var(--text-xs)', 'Controls extra-small input font size.'],
  ['--input-font-size-sm', 'var(--text-sm)', 'Controls small input font size.'],
  ['--input-font-size-md', 'var(--text-md)', 'Controls medium input font size.'],
  ['--input-font-size-lg', 'var(--text-lg)', 'Controls large input font size.'],
  ['--input-font-size-xl', 'var(--text-lg)', 'Controls extra-large input font size.'],
  ['--input-height', 'var(--size-lg)', 'Controls the default input minimum height.'],
  ['--input-height-xs', 'var(--size-sm)', 'Controls extra-small input height.'],
  ['--input-height-sm', '2rem', 'Controls small input height.'],
  ['--input-height-md', 'var(--size-lg)', 'Controls medium input height.'],
  ['--input-height-lg', 'var(--size-xl)', 'Controls large input height.'],
  ['--input-height-xl', '3rem', 'Controls extra-large input height.'],
  ['--input-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  ['--input-line-height-xs', 'var(--line-height-text-xs)', 'Controls extra-small line height.'],
  ['--input-line-height-sm', 'var(--line-height-text-sm)', 'Controls small line height.'],
  ['--input-line-height-md', 'var(--line-height-text-md)', 'Controls medium line height.'],
  ['--input-line-height-lg', 'var(--line-height-text-lg)', 'Controls large line height.'],
  ['--input-line-height-xl', 'var(--line-height-text-lg)', 'Controls extra-large line height.'],
  ['--input-max-width', 'none', 'Controls the input max width.'],
  ['--input-padding-x', '0.875rem', 'Controls default horizontal padding.'],
  ['--input-padding-x-xs', '0.625rem', 'Controls extra-small horizontal padding.'],
  ['--input-padding-x-sm', '0.75rem', 'Controls small horizontal padding.'],
  ['--input-padding-x-md', '0.875rem', 'Controls medium horizontal padding.'],
  ['--input-padding-x-lg', '1rem', 'Controls large horizontal padding.'],
  ['--input-padding-x-xl', '1.125rem', 'Controls extra-large horizontal padding.'],
  ['--input-padding-y', '0.5rem', 'Controls default vertical padding.'],
  ['--input-padding-y-xs', '0.25rem', 'Controls extra-small vertical padding.'],
  ['--input-padding-y-sm', '0.3125rem', 'Controls small vertical padding.'],
  ['--input-padding-y-md', '0.5rem', 'Controls medium vertical padding.'],
  ['--input-padding-y-lg', '0.625rem', 'Controls large vertical padding.'],
  ['--input-padding-y-xl', '0.75rem', 'Controls extra-large vertical padding.'],
  ['--input-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--input-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  [
    '--input-readonly-bg',
    'var(--input-bg, var(--color-background))',
    'Controls readonly input background color.',
  ],
  [
    '--input-readonly-color',
    'var(--input-color, var(--color-foreground))',
    'Controls readonly input text color.',
  ],
  ['--input-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--input-width', '100%', 'Controls the input width.'],
];
export const inputPlaygroundCssProperties: CssPropertyInput[] = inputOverrideCssProperties;

export function InputCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={inputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function InputCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={inputPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

const normalizeCssProperty = (property: CssPropertyInput) =>
  'name' in property
    ? property
    : { name: property[0], defaultValue: property[1], description: property[2] };

export function InputExample(props: ComponentProps<typeof Input>) {
  return (
    <Field className="input-demo-field">
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input placeholder="Enter your name" {...props} />
    </Field>
  );
}

export function ControlledInputExample() {
  const [value, setValue] = useState('');

  return (
    <Field className="input-demo-field">
      <Field.Label>Username</Field.Label>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}

export function InputSizesExample() {
  return (
    <div className="input-demo-stack">
      <Input size="xs" placeholder="Extra-small input" />
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
      <Input size="xl" placeholder="Extra-large input" />
    </div>
  );
}

export function InputNativeAttributesExample() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Security code</Field.Label>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        placeholder="000000"
        type="text"
        autoComplete="one-time-code"
      />
    </Field>
  );
}

export function DisabledAndReadOnlyInputExample() {
  return (
    <div className="input-demo-stack">
      <Input disabled placeholder="Disabled input" />
      <Input readOnly value="Assigned workspace" />
    </div>
  );
}

export function InputFieldValidationExample() {
  return (
    <Field className="input-demo-field" invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Please enter your email.</Field.ErrorText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}

export function CustomStylesInputExample() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Project key</Field.Label>
      <Input placeholder="MAPS" className="input-demo-custom-input" />
    </Field>
  );
}

export function StandaloneInputExample() {
  return (
    <div className="input-demo-field">
      <Input aria-label="Search projects" placeholder="Search projects" />
    </div>
  );
}

export function InputAsChildExample() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Repository</Field.Label>
      <Input asChild>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  );
}
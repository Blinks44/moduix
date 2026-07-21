import { Field, InputGroup } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../mdx/preview';

export const inputGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--input-group-addon-bg', 'var(--color-muted)', 'Controls addon background color.'],
  [
    '--input-group-addon-color',
    'var(--color-muted-foreground)',
    'Controls addon text and icon color.',
  ],
  ['--input-group-addon-gap', 'var(--spacing-2)', 'Controls space between addon children.'],
  ['--input-group-addon-padding-x', 'var(--spacing-3-5)', 'Controls default addon padding.'],
  ['--input-group-addon-padding-x-xs', 'var(--spacing-2-5)', 'Controls addon padding for `xs`.'],
  ['--input-group-addon-padding-x-sm', 'var(--spacing-3)', 'Controls addon padding for `sm`.'],
  ['--input-group-addon-padding-x-md', 'var(--spacing-3-5)', 'Controls addon padding for `md`.'],
  ['--input-group-addon-padding-x-lg', 'var(--spacing-4)', 'Controls addon padding for `lg`.'],
  ['--input-group-addon-padding-x-xl', 'var(--spacing-4-5)', 'Controls addon padding for `xl`.'],
  ['--input-group-bg', 'var(--color-background)', 'Controls group background color.'],
  ['--input-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  [
    '--input-group-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--input-group-border-style', 'solid', 'Controls group border style.'],
  ['--input-group-border-width', 'var(--border-width-sm)', 'Controls group border width.'],
  ['--input-group-button-color', 'var(--color-foreground)', 'Controls grouped button color.'],
  [
    '--input-group-button-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls grouped button focus offset.',
  ],
  ['--input-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--input-group-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--input-group-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--input-group-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--input-group-focus-ring-width',
    'var(--input-group-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--input-group-font-size', 'var(--text-md)', 'Controls default font size.'],
  ['--input-group-font-size-xs', 'var(--text-xs)', 'Controls font size for `xs`.'],
  ['--input-group-font-size-sm', 'var(--text-sm)', 'Controls font size for `sm`.'],
  ['--input-group-font-size-md', 'var(--text-md)', 'Controls font size for `md`.'],
  ['--input-group-font-size-lg', 'var(--text-lg)', 'Controls font size for `lg`.'],
  ['--input-group-font-size-xl', 'var(--text-lg)', 'Controls font size for `xl`.'],
  [
    '--input-group-height',
    'var(--input-group-height-md, var(--size-md))',
    'Controls group height.',
  ],
  ['--input-group-height-xs', 'var(--size-xs)', 'Controls height for `xs`.'],
  ['--input-group-height-sm', 'var(--size-sm)', 'Controls height for `sm`.'],
  ['--input-group-height-md', 'var(--size-md)', 'Controls height for `md`.'],
  ['--input-group-height-lg', 'var(--size-lg)', 'Controls height for `lg`.'],
  ['--input-group-height-xl', 'var(--size-xl)', 'Controls height for `xl`.'],
  ['--input-group-icon-size', 'var(--spacing-4)', 'Controls addon icon size.'],
  ['--input-group-input-padding-x', 'var(--spacing-3-5)', 'Controls default input inline padding.'],
  [
    '--input-group-input-padding-x-xs',
    'var(--spacing-2-5)',
    'Controls input inline padding for `xs`.',
  ],
  [
    '--input-group-input-padding-x-sm',
    'var(--spacing-3)',
    'Controls input inline padding for `sm`.',
  ],
  [
    '--input-group-input-padding-x-md',
    'var(--spacing-3-5)',
    'Controls input inline padding for `md`.',
  ],
  [
    '--input-group-input-padding-x-lg',
    'var(--spacing-4)',
    'Controls input inline padding for `lg`.',
  ],
  [
    '--input-group-input-padding-x-xl',
    'var(--spacing-4-5)',
    'Controls input inline padding for `xl`.',
  ],
  ['--input-group-input-padding-y', 'var(--spacing-2)', 'Controls default input block padding.'],
  [
    '--input-group-input-padding-y-xs',
    'var(--spacing-0-5)',
    'Controls input block padding for `xs`.',
  ],
  ['--input-group-input-padding-y-sm', '0.3125rem', 'Controls input block padding for `sm`.'],
  [
    '--input-group-input-padding-y-md',
    'var(--spacing-1)',
    'Controls input block padding for `md`.',
  ],
  [
    '--input-group-input-padding-y-lg',
    'var(--spacing-1)',
    'Controls input block padding for `lg`.',
  ],
  [
    '--input-group-input-padding-y-xl',
    'var(--spacing-2)',
    'Controls input block padding for `xl`.',
  ],
  ['--input-group-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  ['--input-group-line-height-xs', 'var(--line-height-text-xs)', 'Controls line height for `xs`.'],
  ['--input-group-line-height-sm', 'var(--line-height-text-sm)', 'Controls line height for `sm`.'],
  ['--input-group-line-height-md', 'var(--line-height-text-md)', 'Controls line height for `md`.'],
  ['--input-group-line-height-lg', 'var(--line-height-text-lg)', 'Controls line height for `lg`.'],
  ['--input-group-line-height-xl', 'var(--line-height-text-lg)', 'Controls line height for `xl`.'],
  ['--input-group-max-width', 'none', 'Controls group max width.'],
  ['--input-group-radius', 'var(--radius-md)', 'Controls group border radius.'],
  [
    '--input-group-readonly-bg',
    'var(--input-group-bg, var(--color-background))',
    'Controls shell background when the grouped input is read-only.',
  ],
  [
    '--input-group-readonly-border-color',
    'var(--input-group-border-color, var(--color-border))',
    'Controls shell border color when the grouped input is read-only.',
  ],
  [
    '--input-group-readonly-color',
    'var(--input-group-color, var(--color-foreground))',
    'Controls shell text color when the grouped input is read-only.',
  ],
  ['--input-group-separator-color', 'var(--color-border)', 'Controls addon separator color.'],
  ['--input-group-separator-width', 'var(--border-width-sm)', 'Controls addon separator width.'],
  ['--input-group-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--input-group-width', '100%', 'Controls group width.'],
];

export const inputGroupPlaygroundCssProperties: CssPropertyInput[] = [
  ['--input-group-addon-bg', 'var(--color-muted)', 'Controls addon background color.'],
  ['--input-group-addon-color', 'var(--color-muted-foreground)', 'Controls addon color.'],
  ['--input-group-bg', 'var(--color-background)', 'Controls group background color.'],
  ['--input-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  ['--input-group-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--input-group-height',
    'var(--input-group-height-md, var(--size-md))',
    'Controls group height.',
  ],
  ['--input-group-input-padding-x', 'var(--spacing-3-5)', 'Controls input inline padding.'],
  ['--input-group-radius', 'var(--radius-md)', 'Controls group border radius.'],
  [
    '--input-group-readonly-border-color',
    'var(--input-group-border-color, var(--color-border))',
    'Controls readonly shell border color.',
  ],
  [
    '--input-group-readonly-bg',
    'var(--input-group-bg, var(--color-background))',
    'Controls readonly shell background color.',
  ],
  ['--input-group-separator-color', 'var(--color-border)', 'Controls separator color.'],
];

export function InputGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={inputGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function InputGroupCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={inputGroupPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function InputGroupExample(props: ComponentProps<typeof InputGroup>) {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Workspace</Field.Label>
      <InputGroup {...props}>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="maps" />
      </InputGroup>
    </Field>
  );
}

export function InputGroupWithActionExample() {
  const [value, setValue] = useState('');

  return (
    <Field className="input-group-demo-field">
      <Field.Label>Invite by email</Field.Label>
      <InputGroup>
        <InputGroup.Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          type="email"
          placeholder="name@example.com"
        />
        <InputGroup.Button disabled={!value}>Send</InputGroup.Button>
      </InputGroup>
    </Field>
  );
}

export function InputGroupPrefixSuffixExample() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Monthly budget</Field.Label>
      <InputGroup>
        <InputGroup.Addon className="input-group-demo-currency">$</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup>
    </Field>
  );
}

export function InputGroupAsChildExample() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Repository</Field.Label>
      <InputGroup asChild>
        <div>
          <InputGroup.Addon>moduix/</InputGroup.Addon>
          <InputGroup.Input placeholder="components" />
        </div>
      </InputGroup>
    </Field>
  );
}

export function InputGroupSizesExample() {
  return (
    <div className="input-group-demo-stack">
      <InputGroup size="xs">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Extra-small group" />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Small group" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Medium group" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Large group" />
      </InputGroup>
      <InputGroup size="xl">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Extra-large group" />
      </InputGroup>
    </div>
  );
}

export function DisabledInputGroupExample() {
  return (
    <InputGroup className="input-group-demo-group" role="group" aria-label="Workspace handle">
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputGroup.Input disabled value="maps" />
      <InputGroup.Button disabled>Copy</InputGroup.Button>
    </InputGroup>
  );
}

export function InputGroupFieldValidationExample() {
  return (
    <Field className="input-group-demo-field" invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>.test.com</InputGroup.Text>
      </InputGroup>
      <Field.ErrorText>Please enter a domain.</Field.ErrorText>
    </Field>
  );
}
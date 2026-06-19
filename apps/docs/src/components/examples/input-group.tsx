import {
  Field,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  CheckIcon,
  CloseIcon,
  PencilIcon,
} from 'moduix';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

export const inputGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--input-group-addon-bg', 'var(--color-muted)', 'Controls addon background color.'],
  [
    '--input-group-addon-color',
    'var(--color-muted-foreground)',
    'Controls addon text and icon color.',
  ],
  ['--input-group-addon-gap', 'var(--spacing-2)', 'Controls space between addon children.'],
  ['--input-group-addon-padding-x', '0.875rem', 'Controls default addon padding.'],
  ['--input-group-addon-padding-x-xs', '0.625rem', 'Controls addon padding for `xs`.'],
  ['--input-group-addon-padding-x-sm', '0.75rem', 'Controls addon padding for `sm`.'],
  ['--input-group-addon-padding-x-md', '0.875rem', 'Controls addon padding for `md`.'],
  ['--input-group-addon-padding-x-lg', '1rem', 'Controls addon padding for `lg`.'],
  ['--input-group-addon-padding-x-xl', '1.125rem', 'Controls addon padding for `xl`.'],
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
  ['--input-group-button-focus-ring-offset', '-1px', 'Controls grouped button focus offset.'],
  ['--input-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--input-group-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--input-group-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--input-group-focus-ring-offset', '-1px', 'Controls focus ring offset.'],
  [
    '--input-group-focus-ring-width',
    'var(--input-group-border-width, var(--border-width-sm))',
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
    'var(--input-group-height-md, var(--size-lg))',
    'Controls group height.',
  ],
  ['--input-group-height-xs', 'var(--size-sm)', 'Controls height for `xs`.'],
  ['--input-group-height-sm', '2rem', 'Controls height for `sm`.'],
  ['--input-group-height-md', 'var(--size-lg)', 'Controls height for `md`.'],
  ['--input-group-height-lg', 'var(--size-xl)', 'Controls height for `lg`.'],
  ['--input-group-height-xl', '3rem', 'Controls height for `xl`.'],
  ['--input-group-icon-size', '1rem', 'Controls addon icon size.'],
  ['--input-group-input-padding-x', '0.875rem', 'Controls default input inline padding.'],
  ['--input-group-input-padding-x-xs', '0.625rem', 'Controls input inline padding for `xs`.'],
  ['--input-group-input-padding-x-sm', '0.75rem', 'Controls input inline padding for `sm`.'],
  ['--input-group-input-padding-x-md', '0.875rem', 'Controls input inline padding for `md`.'],
  ['--input-group-input-padding-x-lg', '1rem', 'Controls input inline padding for `lg`.'],
  ['--input-group-input-padding-x-xl', '1.125rem', 'Controls input inline padding for `xl`.'],
  ['--input-group-input-padding-y', '0.5rem', 'Controls default input block padding.'],
  ['--input-group-input-padding-y-xs', '0.25rem', 'Controls input block padding for `xs`.'],
  ['--input-group-input-padding-y-sm', '0.3125rem', 'Controls input block padding for `sm`.'],
  ['--input-group-input-padding-y-md', '0.5rem', 'Controls input block padding for `md`.'],
  ['--input-group-input-padding-y-lg', '0.625rem', 'Controls input block padding for `lg`.'],
  ['--input-group-input-padding-y-xl', '0.75rem', 'Controls input block padding for `xl`.'],
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
    'var(--input-group-height-md, var(--size-lg))',
    'Controls group height.',
  ],
  ['--input-group-input-padding-x', '0.875rem', 'Controls input inline padding.'],
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
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="maps" />
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
        <InputGroupInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          type="email"
          placeholder="name@example.com"
        />
        <InputGroupButton disabled={!value}>Send</InputGroupButton>
      </InputGroup>
    </Field>
  );
}

export function InputGroupInlineEditingExample() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('Workspace display name');
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    setDraft(value);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const handleSave = () => {
    setValue(draft);
    setEditing(false);
  };

  return (
    <Field className="input-group-demo-field">
      <Field.Label>Display name</Field.Label>
      <InputGroup>
        <InputGroupInput
          aria-label="Display name"
          ref={inputRef}
          readOnly={!editing}
          value={editing ? draft : value}
          onChange={(event) => setDraft(event.currentTarget.value)}
        />
        {editing ? (
          <>
            <InputGroupButton aria-label="Cancel editing" size="icon-md" onClick={handleCancel}>
              <CloseIcon />
            </InputGroupButton>
            <InputGroupButton aria-label="Save changes" size="icon-md" onClick={handleSave}>
              <CheckIcon />
            </InputGroupButton>
          </>
        ) : (
          <InputGroupButton aria-label="Edit display name" size="icon-md" onClick={handleEdit}>
            <PencilIcon />
          </InputGroupButton>
        )}
      </InputGroup>
    </Field>
  );
}

export function InputGroupPrefixSuffixExample() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Monthly budget</Field.Label>
      <InputGroup>
        <InputGroupAddon className="input-group-demo-currency">$</InputGroupAddon>
        <InputGroupInput inputMode="decimal" placeholder="2500" />
        <InputGroupText>USD</InputGroupText>
      </InputGroup>
    </Field>
  );
}

export function InputGroupSizesExample() {
  return (
    <div className="input-group-demo-stack">
      <InputGroup size="xs">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Extra-small group" />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Small group" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Medium group" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Large group" />
      </InputGroup>
      <InputGroup size="xl">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Extra-large group" />
      </InputGroup>
    </div>
  );
}

export function DisabledInputGroupExample() {
  return (
    <InputGroup className="input-group-demo-group" role="group" aria-label="Workspace handle">
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput disabled value="maps" />
      <InputGroupButton disabled>Copy</InputGroupButton>
    </InputGroup>
  );
}

export function InputGroupFieldValidationExample() {
  return (
    <Field className="input-group-demo-field" invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroupInput placeholder="company" />
        <InputGroupText>.test.com</InputGroupText>
      </InputGroup>
      <Field.ErrorText>Please enter a domain.</Field.ErrorText>
    </Field>
  );
}

export function CustomStylesInputGroupExample() {
  return (
    <InputGroup className="input-group-demo-custom-group">
      <InputGroupAddon className="input-group-demo-custom-addon">@</InputGroupAddon>
      <InputGroupInput placeholder="custom-group" />
      <InputGroupButton className="input-group-demo-custom-button">Check</InputGroupButton>
    </InputGroup>
  );
}
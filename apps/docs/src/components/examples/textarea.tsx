import { Field, FieldDescription, FieldError, FieldLabel, Textarea } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './textarea.module.css';

export const textareaOverrideCssProperties: CssPropertyInput[] = [
  ['--textarea-bg', 'var(--color-background)', 'Controls the textarea background color.'],
  ['--textarea-border-color', 'var(--color-border)', 'Controls the textarea border color.'],
  [
    '--textarea-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--textarea-border-style', 'solid', 'Controls the textarea border style.'],
  ['--textarea-border-width', 'var(--border-width-sm)', 'Controls the textarea border width.'],
  ['--textarea-color', 'var(--color-foreground)', 'Controls the textarea text color.'],
  ['--textarea-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--textarea-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--textarea-focus-ring-offset', 'depends on focus ring width', 'Controls focus ring offset.'],
  ['--textarea-focus-ring-width', 'depends on border width', 'Controls focus ring width.'],
  ['--textarea-font-size', 'var(--text-md)', 'Controls default font size.'],
  ['--textarea-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  ['--textarea-max-width', 'none', 'Controls the textarea max width.'],
  ['--textarea-min-height', '6rem', 'Controls default minimum textarea height.'],
  ['--textarea-padding-x', '0.875rem', 'Controls default horizontal padding.'],
  ['--textarea-padding-y', '0.5rem', 'Controls default vertical padding.'],
  ['--textarea-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--textarea-radius', 'var(--radius-md)', 'Controls textarea corner radius.'],
  [
    '--textarea-readonly-bg',
    'depends on textarea background',
    'Controls readonly background color.',
  ],
  ['--textarea-readonly-color', 'depends on textarea text color', 'Controls readonly text color.'],
  ['--textarea-resize', 'vertical', 'Controls default textarea resize behavior.'],
  ['--textarea-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--textarea-width', '100%', 'Controls textarea width.'],
];
export const textareaPlaygroundCssProperties: CssPropertyInput[] = [
  ['--textarea-bg', 'var(--color-background)', 'Controls the textarea background color.'],
  ['--textarea-border-color', 'var(--color-border)', 'Controls the textarea border color.'],
  ['--textarea-border-width', 'var(--border-width-sm)', 'Controls the textarea border width.'],
  ['--textarea-color', 'var(--color-foreground)', 'Controls the textarea text color.'],
  ['--textarea-font-size', 'var(--text-md)', 'Controls default font size.'],
  ['--textarea-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  ['--textarea-min-height', '6rem', 'Controls default minimum textarea height.'],
  ['--textarea-padding-x', '0.875rem', 'Controls default horizontal padding.'],
  ['--textarea-padding-y', '0.5rem', 'Controls default vertical padding.'],
  ['--textarea-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--textarea-radius', 'var(--radius-md)', 'Controls textarea corner radius.'],
  ['--textarea-width', '100%', 'Controls textarea width.'],
];

export function TextareaCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={textareaOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function TextareaCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={textareaPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function TextareaExample(props: React.ComponentProps<typeof Textarea>) {
  return (
    <Field className={styles.field}>
      <FieldLabel>Comment</FieldLabel>
      <Textarea className={styles.demoTextarea} placeholder="Write a short comment" {...props} />
    </Field>
  );
}

export function ControlledTextareaExample() {
  const [value, setValue] = React.useState('');

  return (
    <Field className={styles.field}>
      <FieldLabel>Feedback</FieldLabel>
      <Textarea
        className={styles.demoTextarea}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}

export function DisabledAndReadOnlyTextareaExample() {
  return (
    <div className={styles.stack}>
      <Textarea className={styles.demoTextarea} disabled placeholder="Disabled textarea" />
      <Textarea className={styles.demoTextarea} readOnly value="Read-only text value" />
    </div>
  );
}

export function NativePropsTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        className={styles.demoTextarea}
        rows={6}
        maxLength={280}
        placeholder="Add enough context for the next person reading this."
        style={{ resize: 'vertical' }}
      />
    </Field>
  );
}

export function AutoResizeTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        className={styles.demoTextarea}
        autoResize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}

export function TextareaFieldValidationExample() {
  return (
    <Field className={styles.field} validationMode="onBlur">
      <FieldLabel>Details</FieldLabel>
      <Textarea
        className={styles.demoTextarea}
        required
        minLength={10}
        placeholder="Add at least 10 characters"
      />
      <FieldDescription>
        Include enough detail for the team to reproduce the issue.
      </FieldDescription>
      <FieldError match="valueMissing">Please provide details.</FieldError>
      <FieldError match="tooShort">Enter at least 10 characters.</FieldError>
    </Field>
  );
}

export function CustomCompositionTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea className={styles.customTextarea} placeholder="Styled textarea" />
    </Field>
  );
}
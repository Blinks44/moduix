import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Textarea,
  type TextareaProps,
} from 'moduix';
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
  ['--textarea-font-size-xs', 'var(--text-xs)', 'Controls extra-small textarea font size.'],
  ['--textarea-font-size-sm', 'var(--text-sm)', 'Controls small textarea font size.'],
  ['--textarea-font-size-md', 'var(--text-md)', 'Controls medium textarea font size.'],
  ['--textarea-font-size-lg', 'var(--text-lg)', 'Controls large textarea font size.'],
  ['--textarea-font-size-xl', 'var(--text-lg)', 'Controls extra-large textarea font size.'],
  ['--textarea-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  [
    '--textarea-line-height-xs',
    'var(--line-height-text-xs)',
    'Controls extra-small textarea line height.',
  ],
  ['--textarea-line-height-sm', 'var(--line-height-text-sm)', 'Controls small line height.'],
  ['--textarea-line-height-md', 'var(--line-height-text-md)', 'Controls medium line height.'],
  ['--textarea-line-height-lg', 'var(--line-height-text-lg)', 'Controls large line height.'],
  ['--textarea-line-height-xl', 'var(--line-height-text-lg)', 'Controls extra-large line height.'],
  ['--textarea-max-width', 'none', 'Controls the textarea max width.'],
  ['--textarea-min-height', '6rem', 'Controls default minimum textarea height.'],
  ['--textarea-min-height-xs', '4rem', 'Controls extra-small textarea minimum height.'],
  ['--textarea-min-height-sm', '5rem', 'Controls small textarea minimum height.'],
  ['--textarea-min-height-md', '6rem', 'Controls medium textarea minimum height.'],
  ['--textarea-min-height-lg', '7rem', 'Controls large textarea minimum height.'],
  ['--textarea-min-height-xl', '8rem', 'Controls extra-large textarea minimum height.'],
  ['--textarea-padding-x', '0.875rem', 'Controls default horizontal padding.'],
  ['--textarea-padding-x-xs', '0.625rem', 'Controls extra-small horizontal padding.'],
  ['--textarea-padding-x-sm', '0.75rem', 'Controls small horizontal padding.'],
  ['--textarea-padding-x-md', '0.875rem', 'Controls medium horizontal padding.'],
  ['--textarea-padding-x-lg', '1rem', 'Controls large horizontal padding.'],
  ['--textarea-padding-x-xl', '1.125rem', 'Controls extra-large horizontal padding.'],
  ['--textarea-padding-y', '0.5rem', 'Controls default vertical padding.'],
  ['--textarea-padding-y-xs', '0.25rem', 'Controls extra-small vertical padding.'],
  ['--textarea-padding-y-sm', '0.3125rem', 'Controls small vertical padding.'],
  ['--textarea-padding-y-md', '0.5rem', 'Controls medium vertical padding.'],
  ['--textarea-padding-y-lg', '0.625rem', 'Controls large vertical padding.'],
  ['--textarea-padding-y-xl', '0.75rem', 'Controls extra-large vertical padding.'],
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

export function TextareaExample(props: TextareaProps) {
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

export function TextareaSizesExample() {
  return (
    <div className={styles.stack}>
      <Textarea className={styles.demoTextarea} size="xs" placeholder="Extra-small textarea" />
      <Textarea className={styles.demoTextarea} size="sm" placeholder="Small textarea" />
      <Textarea className={styles.demoTextarea} size="md" placeholder="Medium textarea" />
      <Textarea className={styles.demoTextarea} size="lg" placeholder="Large textarea" />
      <Textarea className={styles.demoTextarea} size="xl" placeholder="Extra-large textarea" />
    </div>
  );
}

export function TextareaResizeModesExample() {
  return (
    <div className={styles.stack}>
      <Textarea className={styles.demoTextarea} resize="none" placeholder="Resize disabled" />
      <Textarea className={styles.demoTextarea} resize="vertical" placeholder="Vertical resize" />
      <Textarea
        className={styles.demoTextarea}
        resize="horizontal"
        placeholder="Horizontal resize"
      />
      <Textarea
        className={styles.demoTextarea}
        resize="both"
        placeholder="Both directions resize"
      />
    </div>
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

export function DisabledAndReadOnlyTextareaExample() {
  return (
    <div className={styles.stack}>
      <Textarea className={styles.demoTextarea} disabled placeholder="Disabled textarea" />
      <Textarea className={styles.demoTextarea} readOnly value="Read-only text value" />
    </div>
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

export function CustomStylesTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea className={styles.customTextarea} placeholder="Styled textarea" />
    </Field>
  );
}
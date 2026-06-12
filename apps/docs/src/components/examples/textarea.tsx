import {
  Button,
  CheckIcon,
  CloseIcon,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  PencilIcon,
  Textarea,
} from 'moduix';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './textarea.module.css';

export const textareaCssProperties: CssPropertyInput[] = [
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
  [
    '--textarea-focus-ring-offset',
    'calc(0px - var(--textarea-border-width, var(--border-width-sm)))',
    'Controls focus ring offset.',
  ],
  [
    '--textarea-focus-ring-width',
    'var(--textarea-border-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
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
    'var(--textarea-bg, var(--color-background))',
    'Controls readonly background color.',
  ],
  [
    '--textarea-readonly-color',
    'var(--textarea-color, var(--color-foreground))',
    'Controls readonly text color.',
  ],
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
    <CSSPropertiesReferenceTable properties={textareaCssProperties.map(normalizeCssProperty)} />
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

export function TextareaExample(props: ComponentProps<typeof Textarea>) {
  return (
    <Field className={styles.field}>
      <FieldLabel>Comment</FieldLabel>
      <FieldDescription>Included in the issue summary visible to the whole team.</FieldDescription>
      <Textarea placeholder="Write a short comment" {...props} />
    </Field>
  );
}

export function ControlledTextareaExample() {
  const [value, setValue] = useState('');

  return (
    <Field className={styles.field}>
      <FieldLabel>Feedback</FieldLabel>
      <Textarea value={value} onValueChange={setValue} placeholder="Type to control value" />
    </Field>
  );
}

export function DisabledAndReadOnlyTextareaExample() {
  return (
    <div className={styles.stack}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  );
}

export function TextareaReadOnlyEditingExample() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(
    'Build the docs examples first, then harden the public API around real usage.',
  );
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editing) {
      textareaRef.current?.focus();
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
    <Field className={styles.field}>
      <FieldLabel>Team note</FieldLabel>
      <FieldDescription>
        The textarea stays mounted and only switches between read-only and editable modes.
      </FieldDescription>
      <Textarea
        autoResize
        ref={textareaRef}
        readOnly={!editing}
        rows={3}
        value={editing ? draft : value}
        onValueChange={setDraft}
      />
      <div className={styles.actions}>
        {editing ? (
          <>
            <Button
              aria-label="Cancel editing"
              size="icon-md"
              variant="ghost"
              onClick={handleCancel}
            >
              <CloseIcon />
            </Button>
            <Button aria-label="Save changes" size="icon-md" onClick={handleSave}>
              <CheckIcon />
            </Button>
          </>
        ) : (
          <Button aria-label="Edit team note" size="icon-md" variant="ghost" onClick={handleEdit}>
            <PencilIcon />
          </Button>
        )}
      </div>
    </Field>
  );
}

export function NativeAttributesTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        name="notes"
        rows={6}
        maxLength={280}
        spellCheck={false}
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
  );
}

export function AutoResizeTextareaExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        autoResize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}

export function FieldValidationTextareaExample() {
  return (
    <Field className={styles.field} validationMode="onBlur">
      <FieldLabel>Details</FieldLabel>
      <Textarea required minLength={10} placeholder="Add at least 10 characters" />
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
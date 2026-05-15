import { Checkbox, CheckboxField, CheckboxLabel, type CheckboxProps } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './checkbox.module.css';

export const checkboxOverrideCssProperties: CssPropertyInput[] = [
  ['--checkbox-size-xs', '0.875rem', 'Controls `xs` checkbox size.'],
  ['--checkbox-size-sm', '1rem', 'Controls `sm` checkbox size.'],
  ['--checkbox-size-md', '1.25rem', 'Controls `md` checkbox size.'],
  ['--checkbox-size-lg', '1.5rem', 'Controls `lg` checkbox size.'],
  ['--checkbox-size-xl', '1.75rem', 'Controls `xl` checkbox size.'],
  ['--checkbox-icon-size-xs', '0.5rem', 'Controls `xs` indicator icon size.'],
  ['--checkbox-icon-size-sm', '0.625rem', 'Controls `sm` indicator icon size.'],
  ['--checkbox-icon-size-md', '0.75rem', 'Controls `md` indicator icon size.'],
  ['--checkbox-icon-size-lg', '0.875rem', 'Controls `lg` indicator icon size.'],
  ['--checkbox-icon-size-xl', '1rem', 'Controls `xl` indicator icon size.'],
  ['--checkbox-radius', 'var(--radius-xs)', 'Controls checkbox corner radius.'],
  ['--checkbox-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--checkbox-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--checkbox-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--checkbox-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  [
    '--checkbox-border-color-checked',
    'var(--color-primary)',
    'Controls checked and indeterminate border color.',
  ],
  ['--checkbox-color', 'var(--color-primary-foreground)', 'Controls indicator icon color.'],
  ['--checkbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--checkbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--checkbox-gap', 'var(--spacing-2)', 'Controls spacing between control and label.'],
  ['--checkbox-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--checkbox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--checkbox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--checkbox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--checkbox-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];

export const checkboxPlaygroundCssProperties: CssPropertyInput[] = [
  ['--checkbox-radius', 'var(--radius-xs)', 'Controls checkbox corner radius.'],
  ['--checkbox-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--checkbox-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--checkbox-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--checkbox-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--checkbox-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--checkbox-color', 'var(--color-primary-foreground)', 'Controls indicator icon color.'],
  ['--checkbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--checkbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--checkbox-label-color', 'var(--color-foreground)', 'Controls label text color.'],
];

export function CheckboxCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={checkboxOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function CheckboxCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={checkboxPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function CustomPlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5 1.5V8.5M1.5 5H8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckboxExample(props: CheckboxProps) {
  return (
    <CheckboxField>
      <Checkbox defaultChecked {...props} />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
    </CheckboxField>
  );
}

export function CheckboxIndeterminateExample() {
  return (
    <CheckboxField>
      <Checkbox indeterminate />
      <CheckboxLabel>Select all team members</CheckboxLabel>
    </CheckboxField>
  );
}

export function CheckboxSizesExample() {
  return (
    <div className={styles.stack}>
      <CheckboxField>
        <Checkbox size="xs" defaultChecked />
        <CheckboxLabel>Extra-small</CheckboxLabel>
      </CheckboxField>
      <CheckboxField>
        <Checkbox size="sm" defaultChecked />
        <CheckboxLabel>Small</CheckboxLabel>
      </CheckboxField>
      <CheckboxField>
        <Checkbox size="md" defaultChecked />
        <CheckboxLabel>Medium</CheckboxLabel>
      </CheckboxField>
      <CheckboxField>
        <Checkbox size="lg" defaultChecked />
        <CheckboxLabel>Large</CheckboxLabel>
      </CheckboxField>
      <CheckboxField>
        <Checkbox size="xl" defaultChecked />
        <CheckboxLabel>Extra-large</CheckboxLabel>
      </CheckboxField>
    </div>
  );
}

export function CheckboxDisabledExample() {
  return (
    <div className={styles.stack}>
      <CheckboxField>
        <Checkbox disabled />
        <CheckboxLabel>Receive weekly summary</CheckboxLabel>
      </CheckboxField>
      <CheckboxField>
        <Checkbox defaultChecked disabled />
        <CheckboxLabel>Share anonymous usage data</CheckboxLabel>
      </CheckboxField>
    </div>
  );
}

export function ControlledCheckboxExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className={styles.stack}>
      <CheckboxField>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <CheckboxLabel>{checked ? 'Enabled' : 'Disabled'}</CheckboxLabel>
      </CheckboxField>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}

export function CustomIconCheckboxExample() {
  return (
    <CheckboxField>
      <Checkbox defaultChecked checkedIcon={<CustomPlusIcon />} />
      <CheckboxLabel>Use custom indicator icon</CheckboxLabel>
    </CheckboxField>
  );
}

export function CheckboxClassNameExample() {
  return (
    <div className={styles.row}>
      <CheckboxField className={styles.customField}>
        <Checkbox
          className={styles.customCheckbox}
          classNames={{
            indicator: styles.customIndicator,
            indicatorIcon: styles.customIndicatorIcon,
            checkedIcon: styles.customCheckedIcon,
            indeterminateIcon: styles.customIndeterminateIcon,
          }}
          defaultChecked
        />
        <CheckboxLabel className={styles.customLabel}>Styled with className</CheckboxLabel>
      </CheckboxField>
    </div>
  );
}

export const CustomStylesCheckboxExample = CheckboxClassNameExample;

export function CheckboxSiblingLabelNativeButtonExample() {
  const id = React.useId();

  return (
    <div className={styles.siblingRow}>
      <Checkbox nativeButton render={<button />} id={id} defaultChecked />
      <label htmlFor={id} className={styles.label}>
        Keep me signed in
      </label>
    </div>
  );
}
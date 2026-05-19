import { Field, FieldLabel, Switch, SwitchField, SwitchLabel, type SwitchProps } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './switch.module.css';

export const switchOverrideCssProperties: CssPropertyInput[] = [
  ['--switch-bg', 'var(--color-muted)', 'Controls unchecked background color.'],
  ['--switch-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  [
    '--switch-bg-checked-hover',
    'var(--switch-bg-checked, var(--color-primary))',
    'Controls checked hover background color.',
  ],
  ['--switch-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--switch-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--switch-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--switch-border-width', 'var(--border-width-sm)', 'Controls switch border width.'],
  ['--switch-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--switch-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--switch-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  ['--switch-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--switch-gap', 'var(--spacing-2)', 'Controls spacing between switch and label.'],
  ['--switch-height-xs', '1rem', 'Controls switch height for the xs size.'],
  ['--switch-height-sm', '1.25rem', 'Controls switch height for the sm size.'],
  ['--switch-height-md', '1.5rem', 'Controls switch height for the md size.'],
  ['--switch-height-lg', '1.75rem', 'Controls switch height for the lg size.'],
  ['--switch-height-xl', '2rem', 'Controls switch height for the xl size.'],
  ['--switch-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--switch-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--switch-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--switch-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--switch-padding', '0.125rem', 'Controls inner switch padding.'],
  ['--switch-radius', 'var(--radius-full)', 'Controls switch corner radius.'],
  [
    '--switch-thumb-bg',
    'var(--color-background)',
    'Controls thumb background color for both states.',
  ],
  [
    '--switch-thumb-bg-unchecked',
    'var(--switch-thumb-bg, var(--color-background))',
    'Controls unchecked thumb background color.',
  ],
  [
    '--switch-thumb-bg-checked',
    'var(--switch-thumb-bg, var(--color-primary-foreground))',
    'Controls checked thumb background color.',
  ],
  ['--switch-thumb-border-color', 'transparent', 'Controls thumb border color.'],
  ['--switch-thumb-border-width', '0', 'Controls thumb border width.'],
  ['--switch-thumb-color', 'var(--color-muted)', 'Controls thumb content color.'],
  [
    '--switch-thumb-color-unchecked',
    'var(--switch-thumb-color, var(--color-muted))',
    'Controls unchecked thumb content color.',
  ],
  [
    '--switch-thumb-color-checked',
    'var(--switch-thumb-color, var(--color-primary))',
    'Controls checked thumb content color.',
  ],
  ['--switch-thumb-icon-size', '65%', 'Controls custom thumb icon size.'],
  ['--switch-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--switch-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--switch-thumb-size-xs', '0.625rem', 'Controls thumb size for the xs switch size.'],
  ['--switch-thumb-size-sm', '0.875rem', 'Controls thumb size for the sm switch size.'],
  ['--switch-thumb-size-md', '1.125rem', 'Controls thumb size for the md switch size.'],
  ['--switch-thumb-size-lg', '1.375rem', 'Controls thumb size for the lg switch size.'],
  ['--switch-thumb-size-xl', '1.625rem', 'Controls thumb size for the xl switch size.'],
  [
    '--switch-thumb-transition',
    'var(--switch-transition, var(--transition-default))',
    'Controls thumb movement transition timing.',
  ],
  [
    '--switch-thumb-translate',
    'var(--switch-thumb-translate-default)',
    'Controls checked thumb translation distance.',
  ],
  ['--switch-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--switch-width-xs', '1.75rem', 'Controls switch width for the xs size.'],
  ['--switch-width-sm', '2rem', 'Controls switch width for the sm size.'],
  ['--switch-width-md', '2.5rem', 'Controls switch width for the md size.'],
  ['--switch-width-lg', '3rem', 'Controls switch width for the lg size.'],
  ['--switch-width-xl', '3.5rem', 'Controls switch width for the xl size.'],
];
export const switchPlaygroundCssProperties: CssPropertyInput[] = [
  ['--switch-bg', 'var(--color-muted)', 'Controls unchecked background color.'],
  ['--switch-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--switch-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--switch-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--switch-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--switch-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--switch-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--switch-thumb-color', 'var(--color-muted)', 'Controls thumb content color.'],
  ['--switch-label-color', 'var(--color-foreground)', 'Controls label text color.'],
];

export function SwitchCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={switchOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SwitchCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={switchPlaygroundCssProperties.map(normalizeCssProperty)}
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

function PowerIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SwitchExample(props: SwitchProps) {
  return (
    <SwitchField>
      <Switch defaultChecked {...props} />
      <SwitchLabel>Enable notifications</SwitchLabel>
    </SwitchField>
  );
}

export function SwitchSizesExample() {
  return (
    <div className={styles.stack}>
      <SwitchField>
        <Switch size="xs" defaultChecked />
        <SwitchLabel>Extra-small</SwitchLabel>
      </SwitchField>
      <SwitchField>
        <Switch size="sm" defaultChecked />
        <SwitchLabel>Small</SwitchLabel>
      </SwitchField>
      <SwitchField>
        <Switch size="md" defaultChecked />
        <SwitchLabel>Medium</SwitchLabel>
      </SwitchField>
      <SwitchField>
        <Switch size="lg" defaultChecked />
        <SwitchLabel>Large</SwitchLabel>
      </SwitchField>
      <SwitchField>
        <Switch size="xl" defaultChecked />
        <SwitchLabel>Extra-large</SwitchLabel>
      </SwitchField>
    </div>
  );
}

export function SwitchDisabledExample() {
  return (
    <div className={styles.stack}>
      <SwitchField>
        <Switch disabled />
        <SwitchLabel>Enable dark mode</SwitchLabel>
      </SwitchField>
      <SwitchField>
        <Switch defaultChecked disabled />
        <SwitchLabel>Keep me signed in</SwitchLabel>
      </SwitchField>
    </div>
  );
}

export function ControlledSwitchExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className={styles.stack}>
      <SwitchField>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
      </SwitchField>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}

export function CustomIconSwitchExample() {
  return (
    <SwitchField>
      <Switch defaultChecked thumb={<PowerIcon />} classNames={{ thumb: styles.customIconThumb }} />
      <SwitchLabel>Use custom thumb icon</SwitchLabel>
    </SwitchField>
  );
}

export function SwitchClassNameExample() {
  return (
    <div className={styles.row}>
      <SwitchField className={styles.customField}>
        <Switch className={styles.customSwitch} defaultChecked />
        <SwitchLabel className={styles.customLabel}>Styled with className</SwitchLabel>
      </SwitchField>
    </div>
  );
}

export function SwitchSiblingLabelNativeButtonExample() {
  const id = React.useId();

  return (
    <div className={styles.siblingRow}>
      <Switch nativeButton render={<button />} id={id} defaultChecked />
      <label htmlFor={id} className={styles.label}>
        Receive product updates
      </label>
    </div>
  );
}

export function SwitchNativeButtonRenderCallbackExample() {
  return (
    <Switch
      defaultChecked
      nativeButton
      render={(buttonProps) => (
        <label className={styles.siblingRow}>
          <button {...buttonProps} />
          <span className={styles.label}>Enable reminders</span>
        </label>
      )}
    />
  );
}

export function SwitchFormIntegrationExample() {
  return (
    <Field name="notifications">
      <FieldLabel>
        <Switch defaultChecked />
        <SwitchLabel>Notifications</SwitchLabel>
      </FieldLabel>
    </Field>
  );
}
import {
  Field,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Radio,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroupLabel,
  RadioGroupList,
  RadioLabel,
  type RadioGroupProps,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './radio.module.css';

const radioOptions = [
  { value: 'personal', label: 'Personal account' },
  { value: 'team', label: 'Team account' },
  { value: 'enterprise', label: 'Enterprise account' },
];

export const radioOverrideCssProperties: CssPropertyInput[] = [
  ['--radio-size-md', '1.25rem', 'Controls `md` radio size.'],
  ['--radio-indicator-size-md', '0.5rem', 'Controls `md` indicator size.'],
  ['--radio-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--radio-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--radio-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--radio-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--radio-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--radio-indicator-color', 'var(--color-primary-foreground)', 'Controls indicator color.'],
  ['--radio-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--radio-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--radio-gap', 'var(--spacing-2)', 'Controls spacing between control and label.'],
  ['--radio-label-color', 'var(--color-foreground)', 'Controls standalone label text color.'],
  ['--radio-label-font-size', 'var(--text-sm)', 'Controls standalone label font size.'],
  ['--radio-label-font-weight', 'var(--weight-medium)', 'Controls standalone label font weight.'],
  [
    '--radio-label-line-height',
    'var(--line-height-text-sm)',
    'Controls standalone label line height.',
  ],
  ['--radio-group-gap', 'var(--spacing-2)', 'Controls spacing inside the group root.'],
  ['--radio-group-color', 'var(--color-foreground)', 'Controls inherited group text color.'],
  ['--radio-group-list-gap', 'var(--spacing-2)', 'Controls spacing between group items.'],
  ['--radio-group-item-gap', 'var(--radio-gap)', 'Controls spacing inside each group item.'],
  [
    '--radio-group-item-label-color',
    'var(--radio-label-color)',
    'Controls group item label text color.',
  ],
  [
    '--radio-group-item-label-font-size',
    'var(--radio-label-font-size)',
    'Controls group item label font size.',
  ],
  [
    '--radio-group-item-label-font-weight',
    'var(--radio-label-font-weight)',
    'Controls group item label font weight.',
  ],
  [
    '--radio-group-item-label-line-height',
    'var(--radio-label-line-height)',
    'Controls group item label line height.',
  ],
  ['--radio-group-label-color', 'var(--radio-group-color)', 'Controls group label text color.'],
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
  ['--radio-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];
export const radioPlaygroundCssProperties: CssPropertyInput[] = [
  ['--radio-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--radio-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--radio-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--radio-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--radio-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--radio-indicator-color', 'var(--color-primary-foreground)', 'Controls indicator color.'],
  ['--radio-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
];

export function RadioCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={radioOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function RadioCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={radioPlaygroundCssProperties.map(normalizeCssProperty)}
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

function CustomRadioIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 1.5L10.5 6L6 10.5L1.5 6L6 1.5Z" fill="currentColor" />
    </svg>
  );
}

export function RadioExample(props: RadioGroupProps) {
  const labelId = React.useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team" {...props}>
      <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
      <RadioGroupList>
        {radioOptions.map((option) => (
          <RadioGroupItem key={option.value}>
            <RadioGroupItemControl value={option.value} />
            <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioSizesExample() {
  const labelId = React.useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="md">
      <RadioGroupLabel id={labelId}>Control Size</RadioGroupLabel>
      <RadioGroupList>
        <RadioGroupItem>
          <RadioGroupItemControl value="xs" size="xs" />
          <RadioGroupItemLabel>Extra-small</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItemControl value="sm" size="sm" />
          <RadioGroupItemLabel>Small</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItemControl value="md" size="md" />
          <RadioGroupItemLabel>Medium</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItemControl value="lg" size="lg" />
          <RadioGroupItemLabel>Large</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItemControl value="xl" size="xl" />
          <RadioGroupItemLabel>Extra-large</RadioGroupItemLabel>
        </RadioGroupItem>
      </RadioGroupList>
    </RadioGroup>
  );
}

export function ControlledRadioExample() {
  const labelId = React.useId();
  const [value, setValue] = React.useState('personal');

  return (
    <div className={styles.stack}>
      <RadioGroup aria-labelledby={labelId} value={value} onValueChange={setValue}>
        <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
        <RadioGroupList>
          <RadioGroupItem>
            <RadioGroupItemControl value="personal" />
            <RadioGroupItemLabel>Only me</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem>
            <RadioGroupItemControl value="team" />
            <RadioGroupItemLabel>Team</RadioGroupItemLabel>
          </RadioGroupItem>
        </RadioGroupList>
      </RadioGroup>
      <span className={styles.hint}>Current value: {value}</span>
    </div>
  );
}

export function DisabledRadioExample() {
  return <RadioExample defaultValue="enterprise" disabled />;
}

export function CustomIndicatorRadioExample() {
  const labelId = React.useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team">
      <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
      <RadioGroupList>
        {radioOptions.map((option) => (
          <RadioGroupItem key={option.value}>
            <RadioGroupItemControl
              value={option.value}
              indicator={<CustomRadioIcon className={styles.customIndicatorIcon} />}
            />
            <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioClassNameExample() {
  const labelId = React.useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team" className={styles.customGroup}>
      <RadioGroupLabel id={labelId} className={styles.customLabel}>
        Styled Account Type
      </RadioGroupLabel>
      <RadioGroupList className={styles.customList}>
        {radioOptions.map((option) => (
          <RadioGroupItem key={option.value} className={styles.customItem}>
            <RadioGroupItemControl
              value={option.value}
              className={styles.customRadio}
              classNames={{ indicator: styles.customIndicator }}
            />
            <RadioGroupItemLabel className={styles.customLabel}>{option.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioFieldCompositionExample() {
  const labelId = React.useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="personal">
      <RadioGroupLabel id={labelId}>Members</RadioGroupLabel>
      <div className={styles.stack}>
        {radioOptions.map((option) => (
          <RadioField key={option.value}>
            <Radio value={option.value} />
            <RadioLabel>{option.label}</RadioLabel>
          </RadioField>
        ))}
      </div>
    </RadioGroup>
  );
}

export function RadioSiblingLabelNativeButtonExample() {
  const id = React.useId();
  const labelId = React.useId();

  return (
    <div className={styles.siblingRow}>
      <div id={labelId} className={styles.hint}>
        Delivery method
      </div>
      <RadioGroup defaultValue="email" aria-labelledby={labelId}>
        <Radio nativeButton render={<button />} id={id} value="email" />
      </RadioGroup>
      <label htmlFor={id} className={styles.label}>
        Email
      </label>
    </div>
  );
}

export function RadioFormIntegrationExample() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <FieldLabel>
            <Radio value="ssd" />
            <RadioLabel>SSD</RadioLabel>
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="hdd" />
            <RadioLabel>HDD</RadioLabel>
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
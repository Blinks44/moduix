import type { ComponentProps } from 'react';
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxIndicator,
  CheckboxLabel,
  Field,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './checkbox-group.module.css';

const notificationOptions = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
];

const fruitValues = fruitOptions.map((option) => option.value);

const sizeOptions = [
  { value: 'xs', label: 'Extra-small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra-large' },
] as const;

export const checkboxGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--checkbox-bg', 'var(--color-background)', 'Controls unchecked checkbox background.'],
  ['--checkbox-bg-checked', 'var(--color-primary)', 'Controls checked checkbox background.'],
  ['--checkbox-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background.'],
  ['--checkbox-border-color', 'var(--color-border)', 'Controls unchecked checkbox border color.'],
  [
    '--checkbox-border-color-checked',
    'var(--color-primary)',
    'Controls checked and indeterminate border color.',
  ],
  ['--checkbox-border-width', 'var(--border-width-sm)', 'Controls checkbox border width.'],
  ['--checkbox-color', 'var(--color-primary-foreground)', 'Controls checkbox indicator color.'],
  ['--checkbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--checkbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--checkbox-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  ['--checkbox-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--checkbox-icon-size-xs', '0.5rem', 'Controls `xs` checkbox indicator icon size.'],
  ['--checkbox-icon-size-sm', '0.625rem', 'Controls `sm` checkbox indicator icon size.'],
  ['--checkbox-icon-size-md', '0.75rem', 'Controls `md` checkbox indicator icon size.'],
  ['--checkbox-icon-size-lg', '0.875rem', 'Controls `lg` checkbox indicator icon size.'],
  ['--checkbox-icon-size-xl', '1rem', 'Controls `xl` checkbox indicator icon size.'],
  ['--checkbox-radius', 'var(--radius-xs)', 'Controls checkbox corner radius.'],
  ['--checkbox-size-xs', '0.875rem', 'Controls `xs` checkbox size.'],
  ['--checkbox-size-sm', '1rem', 'Controls `sm` checkbox size.'],
  ['--checkbox-size-md', '1.25rem', 'Controls `md` checkbox size.'],
  ['--checkbox-size-lg', '1.5rem', 'Controls `lg` checkbox size.'],
  ['--checkbox-size-xl', '1.75rem', 'Controls `xl` checkbox size.'],
  ['--checkbox-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--checkbox-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--checkbox-group-gap', 'var(--spacing-2)', 'Controls spacing between label and list.'],
  [
    '--checkbox-group-item-gap',
    'var(--checkbox-gap, var(--spacing-2))',
    'Controls spacing between each checkbox and item label.',
  ],
  [
    '--checkbox-group-item-label-color',
    'var(--checkbox-label-color, var(--color-foreground))',
    'Controls item label color.',
  ],
  [
    '--checkbox-group-item-label-font-size',
    'var(--checkbox-label-font-size, var(--text-sm))',
    'Controls item label font size.',
  ],
  [
    '--checkbox-group-item-label-font-weight',
    'var(--checkbox-label-font-weight, var(--weight-medium))',
    'Controls item label font weight.',
  ],
  [
    '--checkbox-group-item-label-line-height',
    'var(--checkbox-label-line-height, var(--line-height-text-sm))',
    'Controls item label line height.',
  ],
  [
    '--checkbox-group-label-color',
    'var(--checkbox-group-color, var(--color-foreground))',
    'Controls group label color.',
  ],
  ['--checkbox-group-label-font-size', 'var(--text-sm)', 'Controls group label font size.'],
  [
    '--checkbox-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--checkbox-group-label-line-height',
    'var(--line-height-text-sm)',
    'Controls group label line height.',
  ],
  ['--checkbox-group-list-gap', 'var(--spacing-2)', 'Controls spacing between items.'],
];

export const checkboxGroupPlaygroundCssProperties = checkboxGroupOverrideCssProperties;

export function CheckboxGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={checkboxGroupOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function CheckboxGroupCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={checkboxGroupPlaygroundCssProperties.map(normalizeCssProperty)}
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

function CustomPlusIcon(props: ComponentProps<'svg'>) {
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

export function CheckboxGroupExample(props: ComponentProps<typeof CheckboxGroup>) {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId} {...props}>
      <CheckboxGroupLabel id={labelId}>Notification Channels</CheckboxGroupLabel>
      <CheckboxGroupList>
        {notificationOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} name="notifications" />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function CustomIconCheckboxGroupExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Custom Indicators</CheckboxGroupLabel>
      <CheckboxGroupList>
        {notificationOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} name="custom-indicators">
              <CheckboxIndicator>
                <CustomPlusIcon className={styles.customIndicatorIcon} />
              </CheckboxIndicator>
            </CheckboxGroupItemControl>
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function CheckboxGroupSizesExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['md']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Control Size</CheckboxGroupLabel>
      <CheckboxGroupList>
        {sizeOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} size={option.value} />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function ControlledCheckboxGroupExample() {
  const labelId = React.useId();
  const [value, setValue] = React.useState(['push']);

  return (
    <div className={styles.wrapper}>
      <CheckboxGroup value={value} onValueChange={setValue} aria-labelledby={labelId}>
        <CheckboxGroupLabel id={labelId}>Active Alerts</CheckboxGroupLabel>
        <CheckboxGroupList>
          {notificationOptions.map((option) => (
            <CheckboxGroupItem key={option.value}>
              <CheckboxGroupItemControl value={option.value} name="alerts" />
              <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
      <span className={styles.hint}>Current value: {value.join(', ') || 'none'}</span>
    </div>
  );
}

export function DisabledCheckboxGroupExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['push']} disabled aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Disabled Settings</CheckboxGroupLabel>
      <CheckboxGroupList>
        {notificationOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} name="disabled-settings" />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function ReadOnlyItemCheckboxGroupExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['push']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Partially Locked Settings</CheckboxGroupLabel>
      <CheckboxGroupList>
        {notificationOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl
              value={option.value}
              name="partially-locked-settings"
              readOnly={option.value === 'push'}
            />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function ParentCheckboxGroupExample() {
  const labelId = React.useId();
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <CheckboxGroup
      value={value}
      onValueChange={setValue}
      allValues={fruitValues}
      aria-labelledby={labelId}
    >
      <CheckboxGroupLabel id={labelId}>Fruits</CheckboxGroupLabel>
      <CheckboxGroupList>
        <CheckboxGroupItem>
          <CheckboxGroupItemControl parent />
          <CheckboxGroupItemLabel>Select all</CheckboxGroupItemLabel>
        </CheckboxGroupItem>

        {fruitOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function CustomCompositionCheckboxGroupExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup
      defaultValue={['email']}
      className={styles.customGroup}
      aria-labelledby={labelId}
    >
      <CheckboxGroupLabel id={labelId} className={styles.customLabel}>
        Styled Channels
      </CheckboxGroupLabel>
      <CheckboxGroupList className={styles.customList}>
        {notificationOptions.map((option) => (
          <CheckboxGroupItem key={option.value} className={styles.customItem}>
            <CheckboxGroupItemControl
              value={option.value}
              name="styled-notifications"
              className={styles.customControl}
            >
              <CheckboxIndicator className={styles.customIndicator} />
            </CheckboxGroupItemControl>
            <CheckboxGroupItemLabel className={styles.customItemLabel}>
              {option.label}
            </CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function CheckboxGroupFieldCompositionExample() {
  const labelId = React.useId();

  return (
    <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Channels</CheckboxGroupLabel>
      <CheckboxGroupList>
        {notificationOptions.map((option) => (
          <CheckboxField key={option.value}>
            <Checkbox value={option.value} name="field-composition" />
            <CheckboxLabel>{option.label}</CheckboxLabel>
          </CheckboxField>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}

export function CheckboxGroupSiblingLabelNativeButtonExample() {
  const id = React.useId();
  const labelId = React.useId();

  return (
    <div className={styles.siblingRow}>
      <div id={labelId} className={styles.hint}>
        Channels
      </div>
      <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
        <CheckboxGroupItemControl
          nativeButton
          render={<button />}
          id={id}
          value="email"
          name="sibling-notifications"
        />
      </CheckboxGroup>
      <label htmlFor={id} className={styles.label}>
        Email updates
      </label>
    </div>
  );
}

export function CheckboxGroupFormIntegrationExample() {
  return (
    <Field name="notificationChannels">
      <Fieldset render={<CheckboxGroup defaultValue={['email']} />}>
        <FieldsetLegend>Notification Channels</FieldsetLegend>
        {notificationOptions.map((option) => (
          <FieldItem key={option.value}>
            <FieldLabel>
              <Checkbox value={option.value} />
              <CheckboxLabel>{option.label}</CheckboxLabel>
            </FieldLabel>
          </FieldItem>
        ))}
      </Fieldset>
    </Field>
  );
}
import { Button, Checkbox, Field, Fieldset, useCheckbox } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './checkbox.module.css';

const notificationOptions = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

const frameworkOptionsWithSvelte = [...frameworkOptions, { value: 'svelte', label: 'Svelte' }];

const sizeOptions = [
  { value: 'xs', label: 'Extra-small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra-large' },
] as const;

export const checkboxExampleCss = `
  .checkbox-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .checkbox-state,
  .checkbox-result {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .checkbox-fieldset {
    width: fit-content;
    max-width: min(20rem, 100%);
  }

  .checkbox-field {
    --field-width: fit-content;
    --field-max-width: min(20rem, 100%);
  }

  .checkbox-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .checkbox-submit {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--color-background);
    color: var(--color-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const checkboxCustomIndicatorCss = `
  .checkbox-custom-group,
  .checkbox-custom-root {
    gap: var(--spacing-3);
  }

  .checkbox-custom-control {
    border-color: var(--color-primary);
  }

  .checkbox-custom-control[data-state='checked'],
  .checkbox-custom-control[data-state='indeterminate'] {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }

  .checkbox-custom-label {
    color: var(--color-primary);
  }

  .checkbox-custom-icon {
    transform: rotate(-8deg);
  }
`;

export const notificationOptionsData = `const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];`;

export const frameworkOptionsData = `const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];`;

export const frameworkOptionsWithSvelteData = `const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];`;

export const checkboxLabelsData = `const labels = {
  basic: 'Enable notifications',
  disabled: 'Receive weekly summary',
  readOnly: 'Keep current selection',
};`;

export const checkboxOverrideCssProperties: CssPropertyInput[] = [
  ['--checkbox-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--checkbox-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--checkbox-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  [
    '--checkbox-bg-invalid',
    'var(--color-destructive)',
    'Controls checked invalid background color.',
  ],
  ['--checkbox-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  [
    '--checkbox-border-color-checked',
    'var(--color-primary)',
    'Controls checked and indeterminate border color.',
  ],
  [
    '--checkbox-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--checkbox-border-width', 'var(--border-width-sm)', 'Controls checkbox border width.'],
  ['--checkbox-color', 'var(--color-primary-foreground)', 'Controls indicator icon color.'],
  [
    '--checkbox-color-invalid',
    'var(--color-primary-foreground)',
    'Controls checked invalid indicator icon color.',
  ],
  ['--checkbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--checkbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--checkbox-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  ['--checkbox-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--checkbox-gap', 'var(--spacing-2)', 'Controls spacing between control and label.'],
  ['--checkbox-group-color', 'var(--color-foreground)', 'Controls checkbox group text color.'],
  ['--checkbox-group-gap', 'var(--spacing-2)', 'Controls spacing between group items.'],
  ['--checkbox-icon-size-xs', '0.5rem', 'Controls `xs` indicator icon size.'],
  ['--checkbox-icon-size-sm', '0.625rem', 'Controls `sm` indicator icon size.'],
  ['--checkbox-icon-size-md', '0.75rem', 'Controls `md` indicator icon size.'],
  ['--checkbox-icon-size-lg', '0.875rem', 'Controls `lg` indicator icon size.'],
  ['--checkbox-icon-size-xl', '1rem', 'Controls `xl` indicator icon size.'],
  ['--checkbox-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--checkbox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--checkbox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--checkbox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--checkbox-radius', 'var(--radius-xs)', 'Controls checkbox corner radius.'],
  ['--checkbox-size-xs', '0.875rem', 'Controls `xs` checkbox size.'],
  ['--checkbox-size-sm', '1rem', 'Controls `sm` checkbox size.'],
  ['--checkbox-size-md', '1.25rem', 'Controls `md` checkbox size.'],
  ['--checkbox-size-lg', '1.5rem', 'Controls `lg` checkbox size.'],
  ['--checkbox-size-xl', '1.75rem', 'Controls `xl` checkbox size.'],
  ['--checkbox-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];

export function CheckboxCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={checkboxOverrideCssProperties.map(normalizeCssProperty)}
    />
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

function CheckboxItem({
  children,
  indicator = 'default',
  customStyled = false,
  ...props
}: ComponentProps<typeof Checkbox.Root> & {
  indicator?: 'default' | 'custom';
  customStyled?: boolean;
}) {
  return (
    <Checkbox.Root className={customStyled ? styles.customRoot : undefined} {...props}>
      <Checkbox.Control className={customStyled ? styles.customControl : undefined}>
        {indicator === 'custom' ? (
          <Checkbox.Indicator>
            <CustomPlusIcon className={styles.customIndicatorIcon} />
          </Checkbox.Indicator>
        ) : null}
      </Checkbox.Control>
      <Checkbox.Label className={customStyled ? styles.customLabel : undefined}>
        {children}
      </Checkbox.Label>
    </Checkbox.Root>
  );
}

function FrameworkCheckboxes({
  options = frameworkOptions,
}: {
  options?: typeof frameworkOptions;
}) {
  return options.map((option) => (
    <CheckboxItem key={option.value} value={option.value}>
      {option.label}
    </CheckboxItem>
  ));
}

export function CheckboxExample() {
  return <CheckboxItem>Enable notifications</CheckboxItem>;
}

export function CheckboxDefaultCheckedExample() {
  return <CheckboxItem defaultChecked>Enable notifications</CheckboxItem>;
}

export function CheckboxIndeterminateExample() {
  return <CheckboxItem checked="indeterminate">Select all team members</CheckboxItem>;
}

export function CheckboxSizesExample() {
  return (
    <div className={styles.stack}>
      {sizeOptions.map((option) => (
        <CheckboxItem key={option.value} size={option.value} defaultChecked>
          {option.label}
        </CheckboxItem>
      ))}
    </div>
  );
}

export function CheckboxDisabledExample() {
  return (
    <div className={styles.stack}>
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem defaultChecked disabled>
        Share anonymous usage data
      </CheckboxItem>
    </div>
  );
}

export function CheckboxReadOnlyExample() {
  return (
    <div className={styles.stack}>
      <CheckboxItem readOnly>Keep current selection</CheckboxItem>
      <CheckboxItem defaultChecked readOnly>
        Preserve existing setting
      </CheckboxItem>
    </div>
  );
}

export function ControlledCheckboxExample() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <CheckboxItem
        checked={checked}
        onCheckedChange={(details) => setChecked(details.checked === true)}
      >
        {checked ? 'Enabled' : 'Disabled'}
      </CheckboxItem>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}

export function CheckboxRootProviderExample() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
      </Checkbox.RootProvider>
      <button
        type="button"
        className={styles.submit}
        onClick={() => checkbox.setChecked(!checkbox.checked)}
      >
        {checkbox.checked ? 'Uncheck' : 'Check'}
      </button>
    </div>
  );
}

export function CheckboxWithFieldExample() {
  return (
    <Field className={styles.field}>
      <Checkbox.Root required name="terms" value="accepted">
        <Checkbox.Control />
        <Checkbox.Label>Accept terms</Checkbox.Label>
      </Checkbox.Root>
      <Field.HelperText>Required to continue.</Field.HelperText>
      <Field.ErrorText>Please accept the terms.</Field.ErrorText>
    </Field>
  );
}

export function CheckboxWithFormExample() {
  const [result, setResult] = useState('terms: none');

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(`terms: ${formData.get('terms') ?? 'none'}`);
      }}
    >
      <CheckboxItem name="terms" value="accepted">
        I agree to the terms and conditions
      </CheckboxItem>
      <Button type="submit" className={styles.submit}>
        Submit
      </Button>
      <span className={styles.hint}>{result}</span>
    </form>
  );
}

export function CustomIndicatorCheckboxExample() {
  return (
    <CheckboxItem defaultChecked indicator="custom">
      Use a custom indicator icon
    </CheckboxItem>
  );
}

export function CheckboxGroupExample(props: ComponentProps<typeof Checkbox.Group>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group defaultValue={['email']} name="notifications" {...props}>
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
    </div>
  );
}

export function ControlledCheckboxGroupExample() {
  const [value, setValue] = useState<string[]>(['push']);

  return (
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Active Alerts</div>
      <Checkbox.Group value={value} onValueChange={setValue} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
      <span className={styles.hint}>Current value: {value.join(', ') || 'none'}</span>
    </div>
  );
}

export function CheckboxGroupInvalidExample() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group invalid defaultValue={['email']} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
      <span className={styles.hint}>Use `invalid` when the group requires a valid selection.</span>
    </div>
  );
}

export function CheckboxGroupMaxSelectedExample() {
  return (
    <Checkbox.Group defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      <FrameworkCheckboxes options={frameworkOptionsWithSvelte} />
    </Checkbox.Group>
  );
}

export function CheckboxGroupSelectAllExample() {
  const [value, setValue] = useState<string[]>(['react']);
  const allValues = frameworkOptions.map((option) => option.value);
  const allSelected = value.length === allValues.length;
  const indeterminate = value.length > 0 && value.length < allValues.length;

  return (
    <div className={styles.wrapper}>
      <CheckboxItem
        checked={indeterminate ? 'indeterminate' : allSelected}
        onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
      >
        Select all
      </CheckboxItem>
      <Checkbox.Group value={value} onValueChange={setValue} name="frameworks">
        <FrameworkCheckboxes />
      </Checkbox.Group>
      <span className={styles.hint}>Selected: {JSON.stringify(value)}</span>
    </div>
  );
}

export function CheckboxGroupWithFormExample() {
  const [result, setResult] = useState('framework: []');

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(`framework: ${JSON.stringify(formData.getAll('framework'))}`);
      }}
    >
      <Checkbox.Group defaultValue={['react']} name="framework">
        <FrameworkCheckboxes />
      </Checkbox.Group>
      <Button type="submit" className={styles.submit}>
        Submit
      </Button>
      <span className={styles.hint}>{result}</span>
    </form>
  );
}

export function CheckboxGroupFieldsetExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Frameworks</Fieldset.Legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        <FrameworkCheckboxes />
      </Checkbox.Group>
    </Fieldset>
  );
}
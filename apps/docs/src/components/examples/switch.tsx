import { Button, Field, Switch, useSwitch, useSwitchContext } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './switch.module.css';

export const switchSizeOptions = [
  { label: 'Extra-small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra-large', value: 'xl' },
] as const;

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
  ['--switch-gap', 'var(--spacing-2)', 'Controls spacing between switch control and label.'],
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
    '--switch-thumb-bg-checked',
    'var(--switch-thumb-bg, var(--color-primary-foreground))',
    'Controls checked thumb background color.',
  ],
  [
    '--switch-thumb-bg-unchecked',
    'var(--switch-thumb-bg, var(--color-background))',
    'Controls unchecked thumb background color.',
  ],
  ['--switch-thumb-border-color', 'transparent', 'Controls thumb border color.'],
  ['--switch-thumb-border-width', '0', 'Controls thumb border width.'],
  ['--switch-thumb-color', 'var(--color-muted)', 'Controls thumb content color.'],
  [
    '--switch-thumb-color-checked',
    'var(--switch-thumb-color, var(--color-primary))',
    'Controls checked thumb content color.',
  ],
  [
    '--switch-thumb-color-unchecked',
    'var(--switch-thumb-color, var(--color-muted))',
    'Controls unchecked thumb content color.',
  ],
  ['--switch-thumb-icon-size', '65%', 'Controls custom thumb icon size.'],
  ['--switch-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--switch-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--switch-thumb-size-xs', '0.75rem', 'Controls thumb size for the xs switch size.'],
  ['--switch-thumb-size-sm', '1rem', 'Controls thumb size for the sm switch size.'],
  ['--switch-thumb-size-md', '1.25rem', 'Controls thumb size for the md switch size.'],
  ['--switch-thumb-size-lg', '1.5rem', 'Controls thumb size for the lg switch size.'],
  ['--switch-thumb-size-xl', '1.75rem', 'Controls thumb size for the xl switch size.'],
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
  ['--switch-width-sm', '2.25rem', 'Controls switch width for the sm size.'],
  ['--switch-width-md', '2.75rem', 'Controls switch width for the md size.'],
  ['--switch-width-lg', '3.25rem', 'Controls switch width for the lg size.'],
  ['--switch-width-xl', '3.75rem', 'Controls switch width for the xl size.'],
];

export function SwitchCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={switchOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function PowerIcon(props: ComponentProps<'svg'>) {
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

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <Switch.Label>Feature is {switchApi.checked ? 'enabled' : 'disabled'}</Switch.Label>;
}

export function SwitchExample(props: ComponentProps<typeof Switch>) {
  return (
    <Switch defaultChecked {...props}>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}

export function SwitchInitialCheckedExample() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Start enabled</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}

export function SwitchSizesExample() {
  return (
    <div className={styles.stack}>
      {switchSizeOptions.map((item) => (
        <Switch key={item.value} size={item.value} defaultChecked>
          <Switch.Control />
          <Switch.Label>{item.label}</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
      ))}
    </div>
  );
}

export function SwitchDisabledExample() {
  return (
    <div className={styles.stack}>
      <Switch disabled>
        <Switch.Control />
        <Switch.Label>Enable dark mode</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <Switch defaultChecked disabled>
        <Switch.Control />
        <Switch.Label>Keep me signed in</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
    </div>
  );
}

export function ControlledSwitchExample() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}

export function SwitchReadOnlyExample() {
  return (
    <div className={styles.stack}>
      <Switch readOnly>
        <Switch.Control />
        <Switch.Label>Managed by policy</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <Switch defaultChecked readOnly>
        <Switch.Control />
        <Switch.Label>Always on</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
    </div>
  );
}

export function SwitchContextExample() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <SwitchContextLabel />
      <Switch.HiddenInput />
    </Switch>
  );
}

export function SwitchRootProviderExample() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
        Toggle externally
      </Button>
      <Switch.RootProvider value={switchApi}>
        <Switch.Control />
        <Switch.Label>External state owner</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
    </div>
  );
}

export function SwitchAsChildExample() {
  return (
    <Switch asChild defaultChecked>
      <label className={styles.siblingRow}>
        <Switch.Control />
        <span className={styles.label}>Enable reminders</span>
        <Switch.HiddenInput />
      </label>
    </Switch>
  );
}

export function CustomIconSwitchExample() {
  return (
    <Switch defaultChecked>
      <Switch.Control>
        <Switch.Thumb className={styles.customIconThumb}>
          <PowerIcon />
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Use custom thumb icon</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}

export function SwitchFormIntegrationExample() {
  return (
    <Field invalid className={styles.formField}>
      <Switch defaultChecked name="notifications" required>
        <Switch.Control />
        <Switch.Label>Notifications</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <Field.HelperText>Used for product and account updates.</Field.HelperText>
      <Field.ErrorText>Notification preference is required.</Field.ErrorText>
    </Field>
  );
}
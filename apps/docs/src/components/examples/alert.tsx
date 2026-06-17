import { Alert, Button, CheckIcon, InfoIcon } from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './alert.module.css';

const statuses = ['neutral', 'info', 'success', 'warning', 'error'] as const;

export const alertOverrideCssProperties: CssPropertyInput[] = [
  ['--alert-bg', 'var(--alert-bg-default, var(--color-card))', 'Controls alert background.'],
  [
    '--alert-border-color',
    'var(--alert-border-color-default, var(--color-border))',
    'Controls alert border color.',
  ],
  ['--alert-border-width', 'var(--border-width-sm)', 'Controls alert border width.'],
  [
    '--alert-color',
    'var(--alert-color-default, var(--color-card-foreground))',
    'Controls alert text color.',
  ],
  ['--alert-content-gap', 'var(--spacing-1)', 'Controls gap inside AlertContent.'],
  [
    '--alert-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  ['--alert-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--alert-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line-height.',
  ],
  ['--alert-gap', 'var(--spacing-3)', 'Controls root column gap.'],
  [
    '--alert-indicator-color',
    'var(--alert-indicator-color-default, currentColor)',
    'Controls indicator color.',
  ],
  ['--alert-indicator-offset', '0.125rem', 'Controls indicator vertical offset.'],
  ['--alert-indicator-size', '1rem', 'Controls indicator size.'],
  ['--alert-padding', 'var(--spacing-4)', 'Controls alert padding.'],
  ['--alert-radius', 'var(--radius-lg)', 'Controls alert border radius.'],
  ['--alert-shadow', 'none', 'Controls alert shadow.'],
  [
    '--color-success',
    'oklch(0.627 0.194 149.214)',
    'Shared success palette token used by the success variant.',
  ],
  [
    '--alert-title-color',
    'var(--alert-color, var(--alert-color-default))',
    'Controls title text color.',
  ],
  ['--alert-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--alert-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--alert-title-line-height', 'var(--line-height-text-sm)', 'Controls title line-height.'],
  [
    '--color-warning',
    'oklch(0.795 0.184 86.047)',
    'Shared warning palette token used by the warning variant.',
  ],
];

export const alertPlaygroundCssProperties: CssPropertyInput[] = [
  ['--alert-bg', 'var(--alert-bg-default, var(--color-card))', 'Controls alert background.'],
  [
    '--alert-border-color',
    'var(--alert-border-color-default, var(--color-border))',
    'Controls alert border color.',
  ],
  ['--alert-border-width', 'var(--border-width-sm)', 'Controls alert border width.'],
  ['--alert-color', 'var(--alert-color-default)', 'Controls alert text color.'],
  ['--alert-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--alert-gap', 'var(--spacing-3)', 'Controls root column gap.'],
  ['--alert-indicator-color', 'var(--alert-indicator-color-default)', 'Controls indicator color.'],
  ['--alert-indicator-size', '1rem', 'Controls indicator size.'],
  ['--alert-padding', 'var(--spacing-4)', 'Controls alert padding.'],
  ['--alert-radius', 'var(--radius-lg)', 'Controls alert border radius.'],
  ['--alert-shadow', 'none', 'Controls alert shadow.'],
];

export function AlertCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={alertOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function AlertCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={alertPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function AlertExample(props: ComponentProps<typeof Alert.Root>) {
  return (
    <Alert.Root {...props}>
      <Alert.Content>
        <Alert.Title>Update available</Alert.Title>
        <Alert.Description>
          Install the latest version when your workflow allows it.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

export function AlertWithIconExample() {
  return (
    <Alert.Root status="info">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Workspace sync is active</Alert.Title>
        <Alert.Description>
          Changes are being synced across all connected devices.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

export function AlertStatusesExample() {
  return (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert.Root key={status} status={status}>
          <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
          <Alert.Content>
            <Alert.Title>{status}</Alert.Title>
            <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ))}
    </div>
  );
}

export function AlertErrorExample() {
  return (
    <Alert.Root status="error">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Payment failed</Alert.Title>
        <Alert.Description>
          Your payment could not be processed. Check the payment method and try again.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

export function AlertActionsExample() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert.Root status="warning" className={styles.customAlert}>
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Storage is almost full</Alert.Title>
        <Alert.Description>
          You are using 92% of the available storage. Archive old uploads or upgrade the plan.
        </Alert.Description>
        <div className={styles.actions}>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      </Alert.Content>
    </Alert.Root>
  );
}
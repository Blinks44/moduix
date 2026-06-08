import type { ComponentProps } from 'react';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CheckIcon,
  InfoIcon,
} from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './alert.module.css';

const variants = ['default', 'info', 'success', 'warning', 'destructive'] as const;

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
  ['--alert-icon-color', 'var(--alert-icon-color-default, currentColor)', 'Controls icon color.'],
  ['--alert-icon-offset', '0.125rem', 'Controls icon vertical offset.'],
  ['--alert-icon-size', '1rem', 'Controls icon size.'],
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
  ['--alert-icon-color', 'var(--alert-icon-color-default)', 'Controls icon color.'],
  ['--alert-icon-size', '1rem', 'Controls icon size.'],
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

export function AlertExample(props: ComponentProps<typeof Alert>) {
  return (
    <Alert {...props}>
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          Install the latest version when your workflow allows it.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}

export function AlertWithIconExample() {
  return (
    <Alert variant="info">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Workspace sync is active</AlertTitle>
        <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
      </AlertContent>
    </Alert>
  );
}

export function AlertVariantsExample() {
  return (
    <div className={styles.stack}>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon>{variant === 'success' ? <CheckIcon /> : <InfoIcon />}</AlertIcon>
          <AlertContent>
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Use this alert for {variant} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  );
}

export function AlertDestructiveExample() {
  return (
    <Alert variant="destructive">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Check the payment method and try again.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}

export function CustomCompositionAlertExample() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="warning" className={styles.customAlert}>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>
          You are using 92% of the available storage. Archive old uploads or upgrade the plan.
        </AlertDescription>
        <div className={styles.actions}>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      </AlertContent>
    </Alert>
  );
}
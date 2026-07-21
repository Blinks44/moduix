import { Alert, Button } from '@moduix/react';
import { Check as CheckIcon, Info as InfoIcon } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './alert.module.css';

const statuses = ['neutral', 'info', 'success', 'warning', 'error'] as const;

const basicAlert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};

const iconAlert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};

const errorAlert = {
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};

const actionAlert = {
  title: 'Storage is almost full',
  description:
    'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};

const headingAlert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export const alertExampleCss = `
  .alert-demo {
    max-width: 32rem;
  }
`;

export const alertStatusesCss = `
  .alert-stack {
    display: grid;
    width: min(38rem, 100%);
    gap: var(--spacing-3);
  }
`;

export const alertCustomCompositionCss = `
  .alert-custom {
    --alert-bg: color-mix(in oklab, var(--color-primary) 12%, var(--color-background));
    --alert-border-color: color-mix(in oklab, var(--color-primary) 38%, transparent);
    --alert-indicator-color: var(--color-primary);
    --alert-radius: var(--radius-md);
    --alert-shadow: var(--shadow-sm);

    max-width: 32rem;
  }
`;

export const alertBasicData = `const alert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};`;

export const alertIconData = `const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};`;

export const alertStatusesData = `const statuses = ['neutral', 'info', 'success', 'warning', 'error'] as const;`;

export const alertErrorData = `const alert = {
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};`;

export const alertActionsData = `const alert = {
  title: 'Storage is almost full',
  description: 'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};`;

export const alertHeadingData = `const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};`;

export const alertCssProperties: CssPropertyInput[] = [
  ['--alert-actions-gap', 'var(--spacing-2)', 'Controls gap between action elements.'],
  ['--alert-actions-margin-top', 'var(--spacing-2)', 'Controls spacing before the actions row.'],
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
  ['--alert-indicator-offset', 'var(--spacing-0-5)', 'Controls indicator vertical offset.'],
  ['--alert-indicator-size', 'var(--spacing-4)', 'Controls indicator size.'],
  ['--alert-padding', 'var(--spacing-3)', 'Controls alert padding.'],
  ['--alert-radius', 'var(--radius-lg)', 'Controls alert border radius.'],
  ['--alert-shadow', 'none', 'Controls alert shadow.'],
  [
    '--color-primary',
    'oklch(0.546 0.215 262.88)',
    'Shared primary palette token used by the info status.',
  ],
  [
    '--color-success',
    'oklch(0.627 0.194 149.214)',
    'Shared success palette token used by the success status.',
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
    'Shared warning palette token used by the warning status.',
  ],
  [
    '--color-destructive',
    'theme destructive',
    'Shared destructive palette token used by the error status.',
  ],
];

export function AlertCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={alertCssProperties.map(normalizeCssProperty)} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function AlertExample(props: ComponentProps<typeof Alert.Root>) {
  return (
    <Alert className={styles.demo} {...props}>
      <Alert.Title>{basicAlert.title}</Alert.Title>
      <Alert.Description>{basicAlert.description}</Alert.Description>
    </Alert>
  );
}

export function AlertWithIconExample() {
  return (
    <Alert status="info" className={styles.demo}>
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>{iconAlert.title}</Alert.Title>
      <Alert.Description>{iconAlert.description}</Alert.Description>
    </Alert>
  );
}

export function AlertStatusesExample() {
  return (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
          <Alert.Title>{status}</Alert.Title>
          <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
        </Alert>
      ))}
    </div>
  );
}

export function AlertErrorExample() {
  return (
    <Alert status="error" className={styles.demo}>
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>{errorAlert.title}</Alert.Title>
      <Alert.Description>{errorAlert.description}</Alert.Description>
    </Alert>
  );
}

export function AlertActionsExample() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert status="warning" className={styles.customAlert}>
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>{actionAlert.title}</Alert.Title>
        <Alert.Description>{actionAlert.description}</Alert.Description>
        <Alert.Actions>
          <Button size="sm">{actionAlert.primaryAction}</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            {actionAlert.secondaryAction}
          </Button>
        </Alert.Actions>
      </Alert.Content>
    </Alert>
  );
}

export function AlertHeadingExample() {
  return (
    <Alert status="info" className={styles.demo}>
      <Alert.Title asChild>
        <h2>{headingAlert.title}</h2>
      </Alert.Title>
      <Alert.Description>{headingAlert.description}</Alert.Description>
    </Alert>
  );
}
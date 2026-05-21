import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CheckFilledIcon,
  InfoIcon,
  type AlertProps,
} from 'moduix';
import * as React from 'react';
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
  ['--alert-close-bg-hover', 'var(--color-accent)', 'Controls close button hover background.'],
  ['--alert-close-color', 'var(--color-muted-foreground)', 'Controls close button color.'],
  ['--alert-close-color-hover', 'var(--color-foreground)', 'Controls close button hover color.'],
  ['--alert-close-icon-size', '0.75rem', 'Controls close icon size.'],
  ['--alert-close-margin-right', '-0.25rem', 'Controls close button inline offset.'],
  ['--alert-close-margin-top', '-0.25rem', 'Controls close button block offset.'],
  ['--alert-close-radius', 'var(--radius-md)', 'Controls close button border radius.'],
  ['--alert-close-size', '1.75rem', 'Controls close button size.'],
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
  [
    '--alert-description-font-size',
    'var(--alert-description-font-size-md)',
    'Controls description font size.',
  ],
  ['--alert-description-font-size-sm', 'var(--text-xs)', 'Controls `sm` description size.'],
  ['--alert-description-font-size-md', 'var(--text-sm)', 'Controls `md` description size.'],
  ['--alert-description-font-size-lg', 'var(--text-sm)', 'Controls `lg` description size.'],
  [
    '--alert-description-line-height',
    'var(--alert-description-line-height-md)',
    'Controls description line-height.',
  ],
  [
    '--alert-description-line-height-sm',
    'var(--line-height-text-xs)',
    'Controls `sm` description line-height.',
  ],
  [
    '--alert-description-line-height-md',
    'var(--line-height-text-sm)',
    'Controls `md` description line-height.',
  ],
  [
    '--alert-description-line-height-lg',
    'var(--line-height-text-sm)',
    'Controls `lg` description line-height.',
  ],
  ['--alert-dismiss-duration', '160ms', 'Controls dismiss animation duration.'],
  ['--alert-dismiss-easing', 'ease-out', 'Controls dismiss animation easing.'],
  ['--alert-enter-translate-y', '-0.25rem', 'Controls enter animation offset.'],
  ['--alert-exit-translate-y', '-0.25rem', 'Controls exit animation offset.'],
  ['--alert-gap', 'var(--spacing-3)', 'Controls root column gap.'],
  ['--alert-icon-color', 'var(--alert-icon-color-default, currentColor)', 'Controls icon color.'],
  ['--alert-icon-margin-top', '0.125rem', 'Controls icon vertical offset.'],
  ['--alert-icon-size', '1rem', 'Controls icon size.'],
  ['--alert-padding-x', 'var(--alert-padding-x-md)', 'Controls horizontal padding.'],
  ['--alert-padding-x-sm', 'var(--spacing-3)', 'Controls `sm` horizontal padding.'],
  ['--alert-padding-x-md', 'var(--spacing-4)', 'Controls `md` horizontal padding.'],
  ['--alert-padding-x-lg', 'var(--spacing-5)', 'Controls `lg` horizontal padding.'],
  ['--alert-padding-y', 'var(--alert-padding-y-md)', 'Controls vertical padding.'],
  ['--alert-padding-y-sm', 'var(--spacing-2)', 'Controls `sm` vertical padding.'],
  ['--alert-padding-y-md', 'var(--spacing-3)', 'Controls `md` vertical padding.'],
  ['--alert-padding-y-lg', 'var(--spacing-4)', 'Controls `lg` vertical padding.'],
  ['--alert-radius', 'var(--radius-lg)', 'Controls alert border radius.'],
  ['--alert-shadow', 'none', 'Controls alert shadow.'],
  ['--alert-success-color', '#16a34a', 'Controls success variant accent color.'],
  [
    '--alert-title-color',
    'var(--alert-color, var(--alert-color-default))',
    'Controls title text color.',
  ],
  ['--alert-title-font-size', 'var(--alert-title-font-size-md)', 'Controls title font size.'],
  ['--alert-title-font-size-sm', 'var(--text-sm)', 'Controls `sm` title size.'],
  ['--alert-title-font-size-md', 'var(--text-sm)', 'Controls `md` title size.'],
  ['--alert-title-font-size-lg', 'var(--text-md)', 'Controls `lg` title size.'],
  ['--alert-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--alert-title-line-height', 'var(--alert-title-line-height-md)', 'Controls title line-height.'],
  [
    '--alert-title-line-height-sm',
    'var(--line-height-text-sm)',
    'Controls `sm` title line-height.',
  ],
  [
    '--alert-title-line-height-md',
    'var(--line-height-text-sm)',
    'Controls `md` title line-height.',
  ],
  [
    '--alert-title-line-height-lg',
    'var(--line-height-text-md)',
    'Controls `lg` title line-height.',
  ],
  ['--alert-warning-color', '#ca8a04', 'Controls warning variant accent color.'],
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
  ['--alert-padding-x', 'var(--alert-padding-x-md)', 'Controls horizontal padding.'],
  ['--alert-padding-y', 'var(--alert-padding-y-md)', 'Controls vertical padding.'],
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

export function AlertExample(props: AlertProps) {
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
          <AlertIcon>
            <InfoIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Use this alert for {variant} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  );
}

export function AlertDismissibleExample() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className={styles.stack}>
      <Alert variant="success" open={open} onOpenChange={setOpen} withCloseButton>
        <AlertIcon>
          <CheckFilledIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>The alert closes with the default exit animation.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  );
}

export function AlertWithoutDismissAnimationExample() {
  return (
    <Alert variant="warning" withCloseButton withDismissAnimation={false}>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Closing is instant</AlertTitle>
        <AlertDescription>
          Use this mode when animation would conflict with layout changes.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}

export function CustomStylesAlertExample() {
  return (
    <Alert className={styles.customAlert} withCloseButton>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Custom alert</AlertTitle>
        <AlertDescription>Override CSS variables from the root alert slot.</AlertDescription>
      </AlertContent>
    </Alert>
  );
}
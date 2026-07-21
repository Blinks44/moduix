import { CloseButton } from '@moduix/react';
import type { ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './close-button.module.css';

export const closeButtonOverrideCssProperties: CssPropertyInput[] = [
  ['--close-button-bg', 'transparent', 'Controls close button background.'],
  ['--close-button-bg-hover', 'var(--color-muted)', 'Controls hover background color.'],
  ['--close-button-color', 'var(--color-muted-foreground)', 'Controls icon color.'],
  ['--close-button-color-hover', 'var(--color-foreground)', 'Controls hover icon color.'],
  ['--close-button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--close-button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--close-button-focus-ring-offset', 'var(--focus-ring-offset)', 'Controls focus ring offset.'],
  [
    '--close-button-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--close-button-icon-size', 'var(--spacing-3)', 'Controls nested SVG icon size.'],
  ['--close-button-radius', 'var(--radius-sm)', 'Controls close button corner radius.'],
  ['--close-button-size', 'var(--spacing-7)', 'Controls close button width and height.'],
  ['--close-button-transition', 'var(--transition-default)', 'Controls transition timing.'],
];

const closeButtonCssProperties = closeButtonOverrideCssProperties.map((property) =>
  'name' in property
    ? property
    : {
        name: property[0],
        defaultValue: property[1],
        description: property[2],
      },
);

export function CloseButtonCssPropertiesPanel() {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable properties={closeButtonCssProperties} />
    </div>
  );
}

export function CloseButtonExample(props: ComponentProps<typeof CloseButton>) {
  return (
    <div className={styles.surface}>
      <div className={styles.content}>
        <p className={styles.title}>Draft saved</p>
        <p className={styles.description}>The notification can be dismissed.</p>
      </div>
      <CloseButton aria-label="Dismiss notification" {...props} />
    </div>
  );
}

export function CloseButtonCustomChildrenExample() {
  return (
    <CloseButton className={styles.customChildrenButton} aria-label="Close panel">
      <CircleXIcon />
    </CloseButton>
  );
}

export function CloseButtonAsChildExample() {
  return (
    <CloseButton asChild className={styles.asChildButton} aria-label="Close composed panel">
      <button>
        <CircleXIcon />
      </button>
    </CloseButton>
  );
}

export function CloseButtonDisabledExample() {
  return (
    <CloseButton
      className={styles.disabledButton}
      aria-disabled="true"
      aria-label="Close unavailable message"
    />
  );
}

function CircleXIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  CollapsibleTriggerIcon,
  type CollapsibleProps,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './collapsible.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export const collapsibleCssProperties: CssPropertyInput[] = [
  ['--collapsible-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--collapsible-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--collapsible-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--collapsible-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
  ['--collapsible-trigger-padding-y', '0', 'Controls trigger vertical padding.'],
  ['--collapsible-trigger-padding-x', '0', 'Controls trigger horizontal padding.'],
  ['--collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  ['--collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--collapsible-trigger-bg-hover',
    'var(--collapsible-trigger-bg)',
    'Controls trigger background color on hover.',
  ],
  [
    '--collapsible-trigger-bg-active',
    'var(--collapsible-trigger-bg-hover)',
    'Controls trigger background color while pressed.',
  ],
  ['--collapsible-trigger-color', 'var(--collapsible-color)', 'Controls trigger text color.'],
  ['--collapsible-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  [
    '--collapsible-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls trigger line height.',
  ],
  [
    '--collapsible-trigger-transition',
    'var(--transition-default)',
    'Controls trigger color and background transition.',
  ],
  ['--collapsible-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--collapsible-icon-transition', 'var(--transition-default)', 'Controls icon transition.'],
  [
    '--collapsible-icon-open-transform',
    'rotate(90deg)',
    'Controls icon transform when the panel is open.',
  ],
  ['--collapsible-panel-color', 'var(--color-muted-foreground)', 'Controls panel text color.'],
  ['--collapsible-panel-font-size', 'var(--text-sm)', 'Controls panel font size.'],
  ['--collapsible-panel-line-height', 'var(--line-height-text-sm)', 'Controls panel line height.'],
  [
    '--collapsible-panel-transition',
    'var(--transition-default)',
    'Controls panel open and close transition.',
  ],
];

function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M1.5 3.5L5 7L8.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CollapsibleExample(props: CollapsibleProps) {
  return (
    <Collapsible className={styles.root} {...props}>
      <CollapsibleTrigger>
        <CollapsibleTriggerIcon />
        Recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className={styles.keysList}>
          {recoveryKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function ControlledCollapsibleExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={styles.root}>
      <CollapsibleTrigger>
        <CollapsibleTriggerIcon />
        Recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className={styles.keysList}>
          {recoveryKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </CollapsiblePanel>
      <span className={styles.status}>Current state: {open ? 'open' : 'closed'}</span>
    </Collapsible>
  );
}

export function DisabledCollapsibleExample() {
  return (
    <Collapsible disabled className={styles.root}>
      <CollapsibleTrigger>
        <CollapsibleTriggerIcon />
        Recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className={styles.keysList}>
          {recoveryKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function HiddenUntilFoundCollapsibleExample() {
  return (
    <Collapsible className={styles.root}>
      <CollapsibleTrigger>
        <CollapsibleTriggerIcon />
        Searchable recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel hiddenUntilFound>
        <ul className={styles.keysList}>
          {recoveryKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function CustomIconCollapsibleExample() {
  return (
    <Collapsible defaultOpen className={styles.root}>
      <CollapsibleTrigger>
        <CollapsibleTriggerIcon className={styles.customIcon}>
          <ChevronDownIcon />
        </CollapsibleTriggerIcon>
        Recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className={styles.keysList}>
          {recoveryKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function CollapsibleClassNameExample() {
  return (
    <Collapsible className={styles.customRoot}>
      <CollapsibleTrigger className={styles.customTrigger}>
        <CollapsibleTriggerIcon className={styles.customTriggerIcon} />
        Styled recovery keys
      </CollapsibleTrigger>
      <CollapsiblePanel className={styles.customPanel}>
        <div className={styles.customPanelContent}>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
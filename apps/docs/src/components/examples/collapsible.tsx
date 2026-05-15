import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  ChevronDownIcon,
  type CollapsibleProps,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './collapsible.module.css';

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
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

export const collapsiblePlaygroundCssProperties: CssPropertyInput[] = [
  ['--collapsible-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--collapsible-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--collapsible-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
  ['--collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  ['--collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  ['--collapsible-trigger-bg-hover', 'var(--collapsible-trigger-bg)', 'Controls hover bg.'],
  ['--collapsible-trigger-color', 'var(--collapsible-color)', 'Controls trigger text color.'],
  ['--collapsible-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--collapsible-panel-color', 'var(--color-muted-foreground)', 'Controls panel text color.'],
];

export function CollapsibleCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={collapsibleOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function CollapsibleCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={collapsiblePlaygroundCssProperties.map(normalizeCssProperty)}
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

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function CollapsibleExample(props: CollapsibleProps) {
  return (
    <Collapsible className={styles.root} {...props}>
      <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
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
      <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
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
      <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
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
      <CollapsibleTrigger>Searchable recovery keys</CollapsibleTrigger>
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

export function CustomStylesCollapsibleExample() {
  return (
    <Collapsible className={styles.customRoot}>
      <CollapsibleTrigger
        className={styles.customTrigger}
        icon={<ChevronDownIcon />}
        classNames={{ icon: styles.customTriggerIcon }}
      >
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
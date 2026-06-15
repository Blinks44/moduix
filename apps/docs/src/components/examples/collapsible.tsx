import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  CollapsibleTriggerIcon,
  ChevronDownIcon,
} from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './collapsible.module.css';

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
  ['--collapsible-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--collapsible-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--collapsible-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--collapsible-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--collapsible-focus-ring-width',
    'var(--border-width-sm)',
    'Controls trigger focus ring width.',
  ],
  ['--collapsible-max-width', '100%', 'Controls root max width.'],
  [
    '--collapsible-icon-open-transform',
    'rotate(90deg)',
    'Controls icon transform when the panel is open.',
  ],
  ['--collapsible-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--collapsible-icon-transition', 'var(--transition-default)', 'Controls icon transition.'],
  ['--collapsible-panel-color', 'var(--color-muted-foreground)', 'Controls panel text color.'],
  [
    '--collapsible-panel-ending-height',
    '0',
    'Controls panel height at the end of the closing transition.',
  ],
  [
    '--collapsible-panel-ending-opacity',
    '1',
    'Controls panel opacity at the end of the closing transition.',
  ],
  [
    '--collapsible-panel-ending-scale',
    '1',
    'Controls panel scale at the end of the closing transition.',
  ],
  [
    '--collapsible-panel-ending-translate-x',
    '0',
    'Controls panel horizontal offset at the end of the closing transition.',
  ],
  [
    '--collapsible-panel-ending-translate-y',
    '0',
    'Controls panel vertical offset at the end of the closing transition.',
  ],
  ['--collapsible-panel-font-size', 'var(--text-sm)', 'Controls panel font size.'],
  ['--collapsible-panel-height', 'auto (runtime)', 'Current panel height used for animation.'],
  ['--collapsible-panel-line-height', 'var(--line-height-text-sm)', 'Controls panel line height.'],
  [
    '--collapsible-panel-starting-height',
    '0',
    'Controls panel height at the start of the opening transition.',
  ],
  [
    '--collapsible-panel-starting-opacity',
    '1',
    'Controls panel opacity at the start of the opening transition.',
  ],
  [
    '--collapsible-panel-starting-scale',
    '1',
    'Controls panel scale at the start of the opening transition.',
  ],
  [
    '--collapsible-panel-starting-translate-x',
    '0',
    'Controls panel horizontal offset at the start of the opening transition.',
  ],
  [
    '--collapsible-panel-starting-translate-y',
    '0',
    'Controls panel vertical offset at the start of the opening transition.',
  ],
  [
    '--collapsible-panel-transition',
    'var(--transition-default)',
    'Controls panel open and close transition.',
  ],
  ['--collapsible-panel-width', 'auto (runtime)', 'Current panel width set by Base UI runtime.'],
  ['--collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--collapsible-trigger-bg-active',
    'var(--collapsible-trigger-bg-hover)',
    'Controls trigger background color while pressed.',
  ],
  [
    '--collapsible-trigger-bg-hover',
    'var(--collapsible-trigger-bg)',
    'Controls trigger background color on hover.',
  ],
  ['--collapsible-trigger-color', 'var(--collapsible-color)', 'Controls trigger text color.'],
  ['--collapsible-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--collapsible-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
  [
    '--collapsible-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls trigger line height.',
  ],
  ['--collapsible-trigger-padding-x', 'var(--spacing-2)', 'Controls trigger horizontal padding.'],
  ['--collapsible-trigger-padding-y', 'var(--spacing-1)', 'Controls trigger vertical padding.'],
  ['--collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  [
    '--collapsible-trigger-transition',
    'var(--transition-default)',
    'Controls trigger color and background transition.',
  ],
  ['--collapsible-width', '14rem', 'Controls root width.'],
];

export const collapsiblePlaygroundCssProperties: CssPropertyInput[] = [
  ...collapsibleOverrideCssProperties,
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

export function CollapsibleExample(props: ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleTriggerIcon />
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
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleTriggerIcon />
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
    <Collapsible disabled>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleTriggerIcon />
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
    <Collapsible>
      <CollapsibleTrigger>
        Searchable recovery keys
        <CollapsibleTriggerIcon />
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

export function CustomCompositionCollapsibleExample() {
  return (
    <Collapsible>
      <CollapsibleTrigger render={<div />} nativeButton={false} className={styles.customTrigger}>
        <span className={styles.triggerLabel}>Styled recovery keys</span>
        <CollapsibleTriggerIcon className={styles.customTriggerIcon}>
          <ChevronDownIcon />
        </CollapsibleTriggerIcon>
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
import { ChevronDownIcon, Collapsible, useCollapsible } from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
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
    '--collapsible-indicator-open-transform',
    'rotate(90deg)',
    'Controls indicator transform while open.',
  ],
  ['--collapsible-indicator-size', '0.75rem', 'Controls indicator size.'],
  [
    '--collapsible-indicator-transition',
    'var(--transition-default)',
    'Controls indicator transition.',
  ],
  ['--collapsible-content-color', 'var(--color-muted-foreground)', 'Controls content color.'],
  ['--collapsible-content-closed-opacity', '0.01', 'Controls content opacity while closed.'],
  ['--collapsible-content-font-size', 'var(--text-sm)', 'Controls content font size.'],
  [
    '--collapsible-content-line-height',
    'var(--line-height-text-sm)',
    'Controls content line height.',
  ],
  ['--collapsible-content-open-opacity', '1', 'Controls content opacity while open.'],
  [
    '--collapsible-content-transition',
    'var(--transition-default)',
    'Controls content open and close animation.',
  ],
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

const collapsibleCssProperties = collapsibleOverrideCssProperties.map(normalizeCssProperty);

export function CollapsibleCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable properties={collapsibleCssProperties} />
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

function RecoveryKeys() {
  return (
    <ul className={styles.keysList}>
      {recoveryKeys.map((key) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  );
}

export function CollapsibleExample(props: ComponentProps<typeof Collapsible.Root>) {
  return (
    <Collapsible.Root {...props}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function ControlledCollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
      <span className={styles.status}>Current state: {open ? 'open' : 'closed'}</span>
    </Collapsible.Root>
  );
}

export function DisabledCollapsibleExample() {
  return (
    <Collapsible.Root disabled>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function LazyMountCollapsibleExample() {
  return (
    <Collapsible.Root lazyMount unmountOnExit>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function PartialCollapseCollapsibleExample() {
  return (
    <Collapsible.Root collapsedHeight="3rem">
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function NestedCollapsibleExample() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        Account security
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={styles.nestedContent}>
          <p>Security options for this account.</p>
          <Collapsible.Root className={styles.nestedRoot}>
            <Collapsible.Trigger>
              Recovery keys
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <RecoveryKeys />
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function RootProviderCollapsibleExample() {
  const collapsible = useCollapsible();

  return (
    <div className={styles.providerLayout}>
      <output>Current state: {collapsible.open ? 'open' : 'closed'}</output>
      <Collapsible.RootProvider value={collapsible}>
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <RecoveryKeys />
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </div>
  );
}

export function CustomCompositionCollapsibleExample() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>
        <button type="button" className={styles.customTrigger}>
          Styled recovery keys
          <Collapsible.Indicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={styles.customContentBody}>
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
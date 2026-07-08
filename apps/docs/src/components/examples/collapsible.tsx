import { useCollapsible } from '@ark-ui/react/collapsible';
import { ChevronDownIcon, Collapsible } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const collapsibleExampleCss = `
  .collapsible-root {
    width: 14rem;
  }

  .collapsible-content-body {
    padding-block: var(--spacing-2);
    padding-inline: var(--spacing-2);
  }

  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    margin: 0;
    padding-inline-start: var(--spacing-2);
  }

  .collapsible-state {
    margin-top: var(--spacing-2);
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .collapsible-provider-layout {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .collapsible-nested-content {
    padding: var(--spacing-2);
  }

  .collapsible-nested-content > p {
    margin: 0 0 var(--spacing-2);
  }

  .collapsible-nested-root {
    width: 100%;
  }
`;

export const collapsibleCustomCompositionCss = `
  .collapsible-root {
    width: 14rem;
  }

  .collapsible-custom-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2);
    width: 100%;
    padding: var(--spacing-2) var(--spacing-3);
    border: 0;
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-foreground);
  }

  .collapsible-custom-trigger:hover {
    background-color: var(--color-accent);
  }

  .collapsible-custom-indicator {
    --collapsible-indicator-open-transform: rotate(180deg);
    color: var(--color-primary);
  }

  .collapsible-custom-content-body {
    margin-top: var(--spacing-1);
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }

  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    margin: 0;
    padding-inline-start: var(--spacing-2);
  }
`;

export const recoveryKeysData = `const recoveryKeys = [
  'alien-bean-pasta',
  'wild-irish-burrito',
  'horse-battery-staple',
];`;

export const collapsibleLongContentData = `const paragraphs = [
  'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.',
  'Built on top of Zag.js state machines, Ark UI keeps behavior consistent while leaving styling under your control.',
  'Use partial collapse when a short preview should stay visible while the rest of the content is inert.',
];`;

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

const paragraphs = [
  'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.',
  'Built on top of Zag.js state machines, Ark UI keeps behavior consistent while leaving styling under your control.',
  'Use partial collapse when a short preview should stay visible while the rest of the content is inert.',
];

function RecoveryKeys() {
  return (
    <ul className="collapsible-keys-list">
      {recoveryKeys.map((key) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  );
}

export function CollapsibleExample(props: ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible className="collapsible-root" {...props}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}

export function ControlledCollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="collapsible-root"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
      <span className="collapsible-state">Current state: {open ? 'open' : 'closed'}</span>
    </Collapsible>
  );
}

export function DisabledCollapsibleExample() {
  return (
    <Collapsible className="collapsible-root" disabled>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}

export function LazyMountCollapsibleExample() {
  return (
    <Collapsible className="collapsible-root" lazyMount unmountOnExit>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}

export function PartialCollapseCollapsibleExample() {
  return (
    <Collapsible className="collapsible-root" collapsedHeight="3rem">
      <Collapsible.Trigger>
        Read more
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}

export function NestedCollapsibleExample() {
  return (
    <Collapsible className="collapsible-root">
      <Collapsible.Trigger>
        Account security
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-nested-content">
          <p>Security options for this account.</p>
          <Collapsible className="collapsible-nested-root">
            <Collapsible.Trigger>
              Recovery keys
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className="collapsible-content-body">
                <RecoveryKeys />
              </div>
            </Collapsible.Content>
          </Collapsible>
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}

export function RootProviderCollapsibleExample() {
  const collapsible = useCollapsible();

  return (
    <div className="collapsible-provider-layout">
      <output>
        open: {String(collapsible.open)}, visible: {String(collapsible.visible)}
      </output>
      <Collapsible.RootProvider value={collapsible} className="collapsible-root">
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="collapsible-content-body">
            <RecoveryKeys />
          </div>
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </div>
  );
}

export function CustomCompositionCollapsibleExample() {
  return (
    <Collapsible className="collapsible-root">
      <Collapsible.Trigger asChild>
        <button type="button" className="collapsible-custom-trigger">
          Styled recovery keys
          <Collapsible.Indicator className="collapsible-custom-indicator">
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-custom-content-body">
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
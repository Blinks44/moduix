import { useClipboard } from '@ark-ui/react/clipboard';
import { Clipboard } from '@moduix/react';
import { useState, type ReactNode } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const clipboardBasicData = `
  const clipboardValue = "https://moduix.dev/docs/clipboard";
  const clipboardLabel = "Copy this link";
`;

export const clipboardControlledData = `
  const initialValue = "https://ark-ui.com";
  const nextValue = "https://chakra-ui.com";
`;

export const clipboardCopyStatusData = `
  const clipboardValue = "maps-platform-token";
`;

export const clipboardTimeoutData = `
  const clipboardValue = "workspace-secret";
  const copiedStateTimeout = 5000;
`;

export const clipboardValueTextData = `
  const clipboardValue = "moduix/clipboard";
`;

export const clipboardRootProviderData = `
  const clipboardValue = "https://moduix.dev/docs/clipboard";
`;

export const clipboardCustomStylingData = `
  const clipboardValue = "workspace-secret";
`;

export const clipboardExampleCss = `
  .clipboard-demo {
    width: min(24rem, 100%);
  }

  .clipboard-demo-root {
    margin-inline: auto;
  }

  .clipboard-demo-root--compact {
    width: max-content;
    max-width: 100%;
  }

  .clipboard-provider-stack,
  .clipboard-status-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-3);
  }

  .clipboard-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--size-lg);
    padding-inline: 1rem;
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
    cursor: pointer;
  }

  .clipboard-action-button:focus-visible {
    outline: var(--border-width-md) solid var(--color-ring);
    outline-offset: calc(var(--border-width-sm) * -1);
  }

  .clipboard-value-text {
    flex: 1 1 auto;
  }

  .clipboard-status-text {
    margin: 0;
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const clipboardCustomStylingCss = `
  .clipboard-demo {
    width: min(24rem, 100%);
  }

  .clipboard-demo-root {
    margin-inline: auto;
  }

  .clipboard-custom-input[data-copied] {
    border-color: color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
  }

  .clipboard-custom-trigger[data-copied] {
    border-color: color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
    background-color: color-mix(in srgb, var(--color-primary) 4%, var(--color-background));
    color: color-mix(in srgb, var(--color-primary) 70%, var(--color-foreground));
  }
`;

export const clipboardOverrideCssProperties: CssPropertyInput[] = [
  ['--clipboard-color', 'var(--color-foreground)', 'Controls the default text color of the root.'],
  ['--clipboard-width', '100%', 'Controls the root width.'],
  ['--clipboard-max-width', '20rem', 'Controls the default maximum width.'],
  ['--clipboard-gap', '0.375rem', 'Controls spacing between label and control.'],
  [
    '--clipboard-control-gap',
    'var(--spacing-2)',
    'Controls spacing between value surface and trigger.',
  ],
  ['--clipboard-label-color', 'currentColor', 'Controls label text color.'],
  ['--clipboard-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--clipboard-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--clipboard-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--clipboard-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled input and trigger opacity.',
  ],
  [
    '--clipboard-input-border-color',
    'var(--input-border-color, var(--color-border))',
    'Controls the input border color.',
  ],
  [
    '--clipboard-input-border-width',
    'var(--input-border-width, var(--border-width-sm))',
    'Controls input border width.',
  ],
  [
    '--clipboard-input-bg',
    'var(--input-bg, var(--color-background))',
    'Controls the input background.',
  ],
  [
    '--clipboard-input-color',
    'var(--input-color, var(--color-foreground))',
    'Controls the input text color.',
  ],
  [
    '--clipboard-input-focus-ring-color',
    'var(--input-focus-ring-color, var(--color-ring))',
    'Controls input focus ring color.',
  ],
  [
    '--clipboard-input-focus-ring-offset',
    'var(--clipboard-input-border-width, var(--input-border-width, var(--border-width-sm)))',
    'Controls input focus ring offset.',
  ],
  [
    '--clipboard-input-focus-ring-width',
    'var(--input-focus-ring-width, var(--border-width-sm))',
    'Controls input focus ring width.',
  ],
  [
    '--clipboard-input-font-size',
    'var(--input-font-size-md, var(--text-md))',
    'Controls input font size.',
  ],
  [
    '--clipboard-input-height',
    'var(--input-height-md, var(--size-lg))',
    'Controls input minimum height.',
  ],
  [
    '--clipboard-input-line-height',
    'var(--input-line-height-md, var(--line-height-text-md))',
    'Controls input line height.',
  ],
  [
    '--clipboard-input-padding-x',
    'var(--input-padding-x-md, 0.875rem)',
    'Controls input horizontal padding.',
  ],
  [
    '--clipboard-input-padding-y',
    'var(--input-padding-y-md, 0.5rem)',
    'Controls input vertical padding.',
  ],
  [
    '--clipboard-input-placeholder-color',
    'var(--input-placeholder-color, var(--color-muted-foreground))',
    'Controls input placeholder color.',
  ],
  [
    '--clipboard-input-radius',
    'var(--input-radius, var(--radius-md))',
    'Controls the input radius.',
  ],
  [
    '--clipboard-input-readonly-bg',
    'var(--input-readonly-bg, var(--clipboard-input-bg, var(--color-background)))',
    'Controls read-only input background.',
  ],
  [
    '--clipboard-input-readonly-color',
    'var(--input-readonly-color, var(--clipboard-input-color, var(--color-foreground)))',
    'Controls read-only input text color.',
  ],
  [
    '--clipboard-trigger-bg',
    'var(--button-outline-bg, var(--color-background))',
    'Controls trigger background color.',
  ],
  [
    '--clipboard-trigger-bg-hover',
    'var(--button-outline-bg-hover, var(--color-accent))',
    'Controls trigger hover background.',
  ],
  [
    '--clipboard-trigger-border-color',
    'var(--button-outline-border-color, var(--color-border))',
    'Controls trigger border color.',
  ],
  [
    '--clipboard-trigger-border-width',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls trigger border width.',
  ],
  [
    '--clipboard-trigger-color',
    'var(--button-outline-color, var(--color-foreground))',
    'Controls trigger text and icon color.',
  ],
  [
    '--clipboard-trigger-focus-ring-color',
    'var(--button-focus-ring-color, var(--color-ring))',
    'Controls trigger focus ring color.',
  ],
  [
    '--clipboard-trigger-focus-ring-offset',
    'var(--clipboard-trigger-border-width, var(--button-border-width, var(--border-width-sm)))',
    'Controls trigger focus ring offset.',
  ],
  [
    '--clipboard-trigger-focus-ring-width',
    'var(--button-focus-ring-width, var(--border-width-md))',
    'Controls trigger focus ring width.',
  ],
  [
    '--clipboard-trigger-font-size',
    'var(--button-font-size, var(--text-sm))',
    'Controls trigger font size.',
  ],
  [
    '--clipboard-trigger-font-weight',
    'var(--button-font-weight, var(--weight-medium))',
    'Controls trigger font weight.',
  ],
  [
    '--clipboard-trigger-gap',
    'var(--button-content-gap, var(--spacing-2))',
    'Controls gap between trigger children.',
  ],
  [
    '--clipboard-trigger-height',
    'var(--button-size-md, var(--size-lg))',
    'Controls trigger minimum height.',
  ],
  [
    '--clipboard-trigger-line-height',
    'var(--button-line-height, var(--line-height-text-sm))',
    'Controls trigger line height.',
  ],
  [
    '--clipboard-trigger-padding-x',
    'var(--button-padding-x-md, 1rem)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--clipboard-trigger-radius',
    'var(--button-radius, var(--radius-md))',
    'Controls trigger radius.',
  ],
  [
    '--clipboard-indicator-size',
    'var(--button-icon-size, 1rem)',
    'Controls idle and copied icon size.',
  ],
  [
    '--clipboard-value-text-color',
    'currentColor',
    'Controls value text color when using `Clipboard.ValueText`.',
  ],
  ['--clipboard-value-text-font-size', 'inherit', 'Controls value text font size.'],
  ['--clipboard-value-text-font-weight', 'inherit', 'Controls value text font weight.'],
  ['--clipboard-value-text-line-height', 'inherit', 'Controls value text line height.'],
  [
    '--clipboard-transition',
    'var(--transition-default)',
    'Controls input and trigger transition timing.',
  ],
];

const clipboardCssPropertiesReference = clipboardOverrideCssProperties.map(normalizeCssProperty);

export function ClipboardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={clipboardCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function ClipboardExampleFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{clipboardExampleCss}</style>
      <div className="clipboard-demo">{children}</div>
    </>
  );
}

export function ClipboardExample() {
  return (
    <ClipboardExampleFrame>
      <Clipboard.Root
        className="clipboard-demo-root"
        defaultValue="https://moduix.dev/docs/clipboard"
      >
        <Clipboard.Label>Copy this link</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy link">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    </ClipboardExampleFrame>
  );
}

export function ControlledClipboardExample() {
  const [value, setValue] = useState('https://ark-ui.com');

  return (
    <ClipboardExampleFrame>
      <div className="clipboard-provider-stack">
        <Clipboard.Root
          className="clipboard-demo-root"
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <Clipboard.Label>Share URL</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input />
            <Clipboard.Trigger aria-label="Copy URL">
              <Clipboard.Indicator />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>

        <button
          className="clipboard-action-button"
          onClick={() => setValue('https://chakra-ui.com')}
        >
          Change URL
        </button>
      </div>
    </ClipboardExampleFrame>
  );
}

export function CopyStatusClipboardExample() {
  const [copyCount, setCopyCount] = useState(0);

  return (
    <ClipboardExampleFrame>
      <div className="clipboard-status-stack">
        <Clipboard.Root
          className="clipboard-demo-root clipboard-demo-root--compact"
          defaultValue="maps-platform-token"
          onStatusChange={(details) => {
            if (details.copied) {
              setCopyCount((value) => value + 1);
            }
          }}
        >
          <Clipboard.Control>
            <Clipboard.Trigger>
              <Clipboard.Indicator />
              <Clipboard.ValueText />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>
        <p className="clipboard-status-text">Copied {copyCount} times</p>
      </div>
    </ClipboardExampleFrame>
  );
}

export function TimeoutClipboardExample() {
  return (
    <ClipboardExampleFrame>
      <Clipboard.Root
        className="clipboard-demo-root"
        defaultValue="workspace-secret"
        timeout={5000}
      >
        <Clipboard.Label>Five second copied state</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy workspace secret">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    </ClipboardExampleFrame>
  );
}

export function ValueTextClipboardExample() {
  return (
    <ClipboardExampleFrame>
      <Clipboard.Root
        className="clipboard-demo-root clipboard-demo-root--compact"
        defaultValue="moduix/clipboard"
      >
        <Clipboard.Control>
          <Clipboard.ValueText className="clipboard-value-text" />
          <Clipboard.Trigger aria-label="Copy package name">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    </ClipboardExampleFrame>
  );
}

export function RootProviderClipboardExample() {
  const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

  return (
    <ClipboardExampleFrame>
      <div className="clipboard-provider-stack">
        <p className="clipboard-status-text">Copied: {String(clipboard.copied)}</p>
        <Clipboard.RootProvider className="clipboard-demo-root" value={clipboard}>
          <Clipboard.Label>Provider-driven clipboard</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input readOnly />
            <Clipboard.Trigger aria-label="Copy provider value">
              <Clipboard.Indicator />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.RootProvider>
      </div>
    </ClipboardExampleFrame>
  );
}

export function CustomStylingClipboardExample() {
  return (
    <>
      <style>{clipboardCustomStylingCss}</style>
      <div className="clipboard-demo">
        <Clipboard.Root className="clipboard-demo-root" defaultValue="workspace-secret">
          <Clipboard.Label>Styled copied state</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input readOnly className="clipboard-custom-input" />
            <Clipboard.Trigger
              className="clipboard-custom-trigger"
              aria-label="Copy workspace secret"
            >
              <Clipboard.Indicator />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>
      </div>
    </>
  );
}
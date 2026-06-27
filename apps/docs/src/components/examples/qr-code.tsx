import { Button, QrCode, useQrCode } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './qr-code.module.css';

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

const fillValues = [
  { label: 'Primary', className: styles.brandFrame },
  { label: 'Danger', className: styles.accentFrame },
];

export const qrCodeExampleCss = `
  .qr-code-root {
    --qr-code-size: 9rem;
  }

  .qr-code-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: center;
  }

  .qr-code-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    justify-content: center;
  }

  .qr-code-status {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
    text-align: center;
  }
`;

export const qrCodeFillCss = `
  .qr-code-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    gap: var(--spacing-4);
    align-items: start;
  }

  .qr-code-primary {
    --qr-code-fill: var(--color-primary);
  }

  .qr-code-danger {
    --qr-code-fill: var(--color-destructive);
  }
`;

export const qrCodeOverlayCss = `
  .qr-code-brand {
    --qr-code-fill: var(--color-primary);
  }

  .qr-code-overlay {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    line-height: var(--line-height-text-xs);
  }
`;

export const qrCodeCustomStylingCss = `
  .qr-code-custom {
    --qr-code-size: 10rem;
    --qr-code-fill: var(--color-primary);
    --qr-code-overlay-bg: var(--color-card);
    --qr-code-download-trigger-bg: var(--color-primary);
    --qr-code-download-trigger-bg-hover: color-mix(
      in srgb,
      var(--color-primary) 88%,
      black
    );
    --qr-code-download-trigger-border-color: transparent;
    --qr-code-download-trigger-color: var(--color-primary-foreground);
  }
`;

export const qrCodeBasicData = `const qrValue = 'https://moduix.dev/docs/qr-code';`;

export const qrCodeControlledData = `const destinations = [
  'https://ark-ui.com',
  'https://moduix.dev',
];`;

export const qrCodeErrorCorrectionData = `const errorLevels = ['L', 'M', 'Q', 'H'] as const;`;

export const qrCodeFillData = `const fills = [
  { label: 'Primary', className: 'qr-code-primary' },
  { label: 'Danger', className: 'qr-code-danger' },
];`;

export const qrCodeContextData = `const qrValue = 'https://moduix.dev/docs/qr-code';`;

const qrValue = 'https://moduix.dev/docs/qr-code';
const destinations = ['https://ark-ui.com', 'https://moduix.dev'];
const errorLevels = ['L', 'M', 'Q', 'H'] as const;

export const qrCodeCssProperties: CssPropertyInput[] = [
  ['--qrcode-height', 'computed by Ark', 'Runtime height for the generated frame.'],
  ['--qrcode-pixel-size', 'computed by Ark', 'Runtime pixel size used by the generator.'],
  ['--qrcode-width', 'computed by Ark', 'Runtime width for the generated frame.'],
  ['--qr-code-color', 'var(--color-foreground)', 'Controls root text and inherited SVG color.'],
  [
    '--qr-code-disabled-opacity',
    'var(--button-disabled-opacity, var(--opacity-disabled))',
    'Controls disabled trigger opacity.',
  ],
  [
    '--qr-code-download-trigger-bg',
    'var(--button-outline-bg, var(--color-background))',
    'Controls download trigger background.',
  ],
  [
    '--qr-code-download-trigger-bg-hover',
    'var(--button-outline-bg-hover, var(--color-accent))',
    'Controls download trigger hover background.',
  ],
  [
    '--qr-code-download-trigger-border-color',
    'var(--button-outline-border-color, var(--color-border))',
    'Controls download trigger border color.',
  ],
  [
    '--qr-code-download-trigger-border-width',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls download trigger border width.',
  ],
  [
    '--qr-code-download-trigger-color',
    'var(--button-outline-color, var(--color-foreground))',
    'Controls download trigger text color.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-color',
    'var(--button-focus-ring-color, var(--color-ring))',
    'Controls download trigger focus ring color.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-offset',
    'var(--qr-code-download-trigger-border-width, var(--button-border-width, var(--border-width-sm)))',
    'Controls download trigger focus ring offset.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-width',
    'var(--button-focus-ring-width, var(--border-width-md))',
    'Controls download trigger focus ring width.',
  ],
  [
    '--qr-code-download-trigger-font-size',
    'var(--button-font-size, var(--text-sm))',
    'Controls download trigger font size.',
  ],
  [
    '--qr-code-download-trigger-font-weight',
    'var(--button-font-weight, var(--weight-medium))',
    'Controls download trigger font weight.',
  ],
  [
    '--qr-code-download-trigger-gap',
    'var(--button-content-gap, var(--spacing-2))',
    'Controls download trigger content gap.',
  ],
  [
    '--qr-code-download-trigger-height',
    'var(--button-size-md, var(--size-lg))',
    'Controls download trigger minimum height.',
  ],
  [
    '--qr-code-download-trigger-icon-size',
    'var(--button-icon-size, 1rem)',
    'Controls icon size inside the download trigger.',
  ],
  [
    '--qr-code-download-trigger-line-height',
    'var(--button-line-height, var(--line-height-text-sm))',
    'Controls download trigger line height.',
  ],
  [
    '--qr-code-download-trigger-padding-x',
    'var(--button-padding-x-md, 1rem)',
    'Controls download trigger inline padding.',
  ],
  [
    '--qr-code-download-trigger-radius',
    'var(--button-radius, var(--radius-md))',
    'Controls download trigger border radius.',
  ],
  ['--qr-code-fill', 'currentColor', 'Controls QR module fill color.'],
  ['--qr-code-gap', 'var(--spacing-3)', 'Controls root spacing between parts.'],
  ['--qr-code-max-width', '100%', 'Controls root maximum width.'],
  ['--qr-code-overlay-bg', 'var(--color-background)', 'Controls overlay background.'],
  ['--qr-code-overlay-color', 'var(--color-foreground)', 'Controls overlay text color.'],
  ['--qr-code-overlay-padding', 'var(--spacing-1)', 'Controls overlay padding.'],
  ['--qr-code-overlay-radius', 'var(--radius-sm)', 'Controls overlay radius.'],
  ['--qr-code-overlay-size', '2.5rem', 'Controls overlay width and height.'],
  ['--qr-code-size', '8rem', 'Controls frame width and height.'],
  ['--qr-code-transition', 'var(--transition-default)', 'Controls trigger transitions.'],
];

const qrCodeCssPropertiesReference = qrCodeCssProperties.map(normalizeCssProperty);

export function QrCodeCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={qrCodeCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function QrCodeExample() {
  return (
    <QrCode className={styles.root} defaultValue={qrValue}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode>
  );
}

export function ControlledQrCodeExample() {
  const [value, setValue] = useState(destinations[0]);

  return (
    <div className={styles.stack}>
      <QrCode
        className={styles.root}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <div className={styles.actions}>
        {destinations.map((destination) => (
          <Button
            key={destination}
            size="sm"
            variant="outline"
            onClick={() => setValue(destination)}
          >
            {new URL(destination).hostname}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function DownloadQrCodeExample() {
  return (
    <QrCode className={styles.root} defaultValue={qrValue}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}

export function ErrorCorrectionQrCodeExample() {
  const [errorLevel, setErrorLevel] = useState('L' as ErrorLevel);

  return (
    <div className={styles.stack}>
      <QrCode className={styles.root} defaultValue={qrValue} encoding={{ ecc: errorLevel }}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <div className={styles.actions}>
        {errorLevels.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={level === errorLevel ? 'default' : 'outline'}
            onClick={() => setErrorLevel(level)}
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function FillQrCodeExample() {
  return (
    <div className={styles.grid}>
      {fillValues.map((fill) => (
        <QrCode key={fill.label} className={styles.root} defaultValue={qrValue}>
          <QrCode.Frame className={fill.className}>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
      ))}
    </div>
  );
}

export function OverlayQrCodeExample() {
  return (
    <QrCode className={styles.root} defaultValue={qrValue} encoding={{ ecc: 'H' }}>
      <QrCode.Frame className={styles.brandFrame}>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
    </QrCode>
  );
}

export function RootProviderQrCodeExample() {
  const qrCode = useQrCode({ value: qrValue });

  return (
    <div className={styles.stack}>
      <QrCode.RootProvider value={qrCode} className={styles.root}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
      <output className={styles.status}>{qrCode.value}</output>
    </div>
  );
}

export function ContextQrCodeExample() {
  const [status, setStatus] = useState('Ready to export');

  return (
    <div className={styles.stack}>
      <QrCode className={styles.root} defaultValue={qrValue}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
        <QrCode.Context>
          {(qrCode) => (
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                const dataUrl = await qrCode.getDataUrl('image/png');
                setStatus(`${Math.round(dataUrl.length / 1000)} KB PNG data URL ready`);
              }}
            >
              Create PNG data URL
            </Button>
          )}
        </QrCode.Context>
      </QrCode>
      <output className={styles.status}>{status}</output>
    </div>
  );
}

export function CustomStylingQrCodeExample() {
  return (
    <QrCode className={styles.customRoot} defaultValue={qrValue} encoding={{ ecc: 'H' }}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}
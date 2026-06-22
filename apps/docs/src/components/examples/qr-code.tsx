import type { ComponentProps } from 'react';
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

const qrValue = 'https://moduix.dev/docs/qr-code';
const destinations = ['https://ark-ui.com', 'https://moduix.dev'];
const errorLevels = ['L', 'M', 'Q', 'H'] as const;

export const qrCodeCssProperties: CssPropertyInput[] = [
  ['--qrcode-height', 'computed by Ark', 'Runtime height for the generated frame.'],
  ['--qrcode-pixel-size', 'computed by Ark', 'Runtime pixel size used by the generator.'],
  ['--qrcode-width', 'computed by Ark', 'Runtime width for the generated frame.'],
  ['--qr-code-color', 'var(--color-foreground)', 'Controls root text and inherited SVG color.'],
  ['--qr-code-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
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
  [
    '--qr-code-download-trigger-*',
    'button token fallbacks',
    'Controls download trigger sizing, color, radius, border, and focus ring.',
  ],
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

function QrGraphic({ className }: { className?: string }) {
  return (
    <QrCode.Frame className={className}>
      <QrCode.Pattern />
    </QrCode.Frame>
  );
}

export function QrCodeExample(props: ComponentProps<typeof QrCode.Root>) {
  return (
    <QrCode className={styles.root} defaultValue={qrValue} {...props}>
      <QrGraphic />
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
        <QrGraphic />
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
      <QrGraphic />
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
        <QrGraphic />
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
          <QrGraphic className={fill.className} />
        </QrCode>
      ))}
    </div>
  );
}

export function OverlayQrCodeExample() {
  return (
    <QrCode className={styles.root} defaultValue={qrValue} encoding={{ ecc: 'H' }}>
      <QrGraphic className={styles.brandFrame} />
      <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
    </QrCode>
  );
}

export function RootProviderQrCodeExample() {
  const qrCode = useQrCode({ value: qrValue });

  return (
    <div className={styles.stack}>
      <QrCode.RootProvider value={qrCode} className={styles.root}>
        <QrGraphic />
      </QrCode.RootProvider>
      <output className={styles.status}>{qrCode.value}</output>
    </div>
  );
}

export function CustomStylingQrCodeExample() {
  return (
    <QrCode className={styles.customRoot} defaultValue={qrValue} encoding={{ ecc: 'H' }}>
      <QrGraphic />
      <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}
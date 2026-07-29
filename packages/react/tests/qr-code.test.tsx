import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { QrCode, useQrCode, useQrCodeContext } from '../src';

function QrCodeValue() {
  const qrCode = useQrCodeContext();

  return <output>{qrCode.value}</output>;
}

test('renders Ark anatomy with stable hooks, accessible SVG output, and forwarded refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const frameRef = createRef<SVGSVGElement>();
  const patternRef = createRef<SVGPathElement>();

  render(
    <QrCode ref={rootRef} defaultValue="https://moduix.dev/docs/qr-code">
      <QrCode.Frame ref={frameRef} role="img" aria-label="QR code for moduix documentation">
        <QrCode.Pattern ref={patternRef} />
      </QrCode.Frame>
      <QrCode.Overlay>MX</QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>,
  );

  const root = rootRef.current!;
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

  expect(QrCode.Root).toBe(QrCode);
  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'qr-code-root');
  expect(frameRef.current).toBe(frame);
  expect(frame).toHaveAttribute('data-part', 'frame');
  expect(frame).toHaveAttribute('data-slot', 'qr-code-frame');
  expect(patternRef.current).toHaveAttribute('data-part', 'pattern');
  expect(patternRef.current).toHaveAttribute('data-slot', 'qr-code-pattern');
  expect(screen.getByText('MX')).toHaveAttribute('data-slot', 'qr-code-overlay');
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
});

test('renders externally controlled values', () => {
  function ControlledQrCode() {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <>
        <QrCode value={value}>
          <QrCode.Frame>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
        <button type="button" onClick={() => setValue('https://moduix.dev')}>
          Update code
        </button>
        <output>{value}</output>
      </>
    );
  }

  const { container } = render(<ControlledQrCode />);
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const initialPath = pattern.getAttribute('d');

  fireEvent.click(screen.getByRole('button', { name: 'Update code' }));

  expect(screen.getByText('https://moduix.dev')).toBeTruthy();
  expect(pattern).not.toHaveAttribute('d', initialPath!);
});

test('keeps RootProvider, Context, and useQrCodeContext on the moduix surface', () => {
  function ProviderQrCode() {
    const qrCode = useQrCode({ defaultValue: 'https://moduix.dev/docs/qr-code' });

    return (
      <QrCode.RootProvider value={qrCode} data-testid="qr-code-provider">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
        <QrCodeValue />
        <QrCode.Context>{(context) => <output>Context: {context.value}</output>}</QrCode.Context>
      </QrCode.RootProvider>
    );
  }

  render(<ProviderQrCode />);

  const root = screen.getByTestId('qr-code-provider');

  expect(root).toHaveAttribute('data-slot', 'qr-code-root-provider');
  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(screen.getByText('https://moduix.dev/docs/qr-code')).toBeTruthy();
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')).toBeTruthy();
});

test('preserves semantic download trigger composition with asChild', () => {
  render(
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.DownloadTrigger asChild fileName="moduix-qr-code.svg" mimeType="image/svg+xml">
        <a href="#download">Download SVG</a>
      </QrCode.DownloadTrigger>
    </QrCode>,
  );

  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
  expect(trigger).toHaveAttribute('href', '#download');
});
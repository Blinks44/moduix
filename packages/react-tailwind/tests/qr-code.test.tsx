import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
  useQrCodeContext,
} from '../src';

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
      <QrCodeFrame ref={frameRef} role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern ref={patternRef} />
      </QrCodeFrame>
      <QrCodeOverlay>MX</QrCodeOverlay>
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCodeDownloadTrigger>
    </QrCode>,
  );

  const root = rootRef.current!;
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

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
          <QrCodeFrame>
            <QrCodePattern />
          </QrCodeFrame>
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
      <QrCodeRootProvider value={qrCode} data-testid="qr-code-provider">
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
        <QrCodeValue />
        <QrCodeContext>{(context) => <output>Context: {context.value}</output>}</QrCodeContext>
      </QrCodeRootProvider>
    );
  }

  render(<ProviderQrCode />);

  const root = screen.getByTestId('qr-code-provider');

  expect(root).toHaveAttribute('data-slot', 'qr-code-root-provider');
  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(screen.getByText('https://moduix.dev/docs/qr-code')).toBeTruthy();
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')).toBeTruthy();
});

test('keeps the disabled download trigger unavailable', () => {
  render(
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger disabled fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCodeDownloadTrigger>
    </QrCode>,
  );

  expect(screen.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
});

test('preserves semantic download trigger composition with asChild', () => {
  render(
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger asChild fileName="moduix-qr-code.svg" mimeType="image/svg+xml">
        <a href="#download">Download SVG</a>
      </QrCodeDownloadTrigger>
    </QrCode>,
  );

  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
  expect(trigger).toHaveAttribute('href', '#download');
});

test('applies native utilities to the component-owned visual parts', () => {
  const { container } = render(
    <QrCode>
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay />
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png" />
    </QrCode>,
  );

  expect(container.querySelector('[data-slot="qr-code-root"]')).toHaveClass(
    'relative',
    'inline-flex',
    'w-32',
    'max-w-full',
    'flex-col',
    'items-center',
    'gap-3',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="qr-code-frame"]')).toHaveClass(
    'h-auto',
    'w-full',
    'aspect-square',
    'fill-current',
  );
  expect(container.querySelector('[data-slot="qr-code-pattern"]')).toHaveClass('fill-inherit');
  expect(container.querySelector('[data-slot="qr-code-overlay"]')).toHaveClass(
    'inline-flex',
    'size-control-lg',
    'items-center',
    'justify-center',
    'rounded-sm',
    'bg-background',
    'p-1',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="qr-code-download-trigger"]')).toHaveClass(
    'inline-flex',
    'min-h-control-md',
    'gap-2',
    'rounded-md',
    'border-border',
    'bg-background',
    'px-4',
    'text-sm',
    'font-medium',
    'text-foreground',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <QrCode className="w-48 gap-4 text-primary">
      <QrCodeFrame className="w-1/2">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay className="size-control-xl bg-muted p-2" />
      <QrCodeDownloadTrigger
        className="rounded-lg bg-muted px-2"
        fileName="moduix-qr-code.png"
        mimeType="image/png"
      />
    </QrCode>,
  );

  const root = container.querySelector('[data-slot="qr-code-root"]');
  const frame = container.querySelector('[data-slot="qr-code-frame"]');
  const overlay = container.querySelector('[data-slot="qr-code-overlay"]');
  const trigger = container.querySelector('[data-slot="qr-code-download-trigger"]');

  expect(root).toHaveClass('w-48', 'gap-4', 'text-primary');
  expect(root).not.toHaveClass('w-32', 'gap-3', 'text-foreground');
  expect(frame).toHaveClass('w-1/2');
  expect(frame).not.toHaveClass('w-full');
  expect(overlay).toHaveClass('size-control-xl', 'bg-muted', 'p-2');
  expect(overlay).not.toHaveClass('size-control-lg', 'bg-background', 'p-1');
  expect(trigger).toHaveClass('rounded-lg', 'bg-muted', 'px-2');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background', 'px-4');
});
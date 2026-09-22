import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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

  return <output>{qrCode().value}</output>;
}

test('renders Ark anatomy with stable hooks, accessible SVG output, and forwarded refs', () => {
  let rootRef!: HTMLDivElement;
  let frameRef!: SVGSVGElement;
  let patternRef!: SVGPathElement;

  render(() => (
    <QrCode ref={(element) => (rootRef = element)} defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame
        ref={(element) => (frameRef = element)}
        role="img"
        aria-label="QR code for moduix documentation"
      >
        <QrCodePattern ref={(element) => (patternRef = element)} />
      </QrCodeFrame>
      <QrCodeOverlay>MX</QrCodeOverlay>
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCodeDownloadTrigger>
    </QrCode>
  ));

  const root = rootRef;
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'qr-code-root');
  expect(frameRef).toBe(frame);
  expect(frame).toHaveAttribute('data-part', 'frame');
  expect(frame).toHaveAttribute('data-slot', 'qr-code-frame');
  expect(patternRef).toHaveAttribute('data-part', 'pattern');
  expect(patternRef).toHaveAttribute('data-slot', 'qr-code-pattern');
  expect(screen.getByText('MX')).toHaveAttribute('data-slot', 'qr-code-overlay');
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
});

test('renders externally controlled values', async () => {
  function ControlledQrCode() {
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <>
        <QrCode value={value()}>
          <QrCodeFrame>
            <QrCodePattern />
          </QrCodeFrame>
        </QrCode>
        <button type="button" onClick={() => setValue('https://moduix.dev')}>
          Update code
        </button>
        <output>{value()}</output>
      </>
    );
  }

  const { container } = render(() => <ControlledQrCode />);
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const initialPath = pattern.getAttribute('d');

  fireEvent.click(screen.getByRole('button', { name: 'Update code' }));

  await waitFor(() => expect(screen.getByText('https://moduix.dev')).toBeInTheDocument());
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
        <QrCodeContext>{(context) => <output>Context: {context().value}</output>}</QrCodeContext>
      </QrCodeRootProvider>
    );
  }

  render(() => <ProviderQrCode />);

  const root = screen.getByTestId('qr-code-provider');

  expect(root).toHaveAttribute('data-slot', 'qr-code-root-provider');
  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(screen.getByText('https://moduix.dev/docs/qr-code')).toBeTruthy();
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')).toBeTruthy();
});

test('keeps the disabled download trigger unavailable', () => {
  render(() => (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger disabled fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCodeDownloadTrigger>
    </QrCode>
  ));

  expect(screen.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
});

test('preserves semantic download trigger composition with native asChild', () => {
  render(() => (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger
        asChild={(props) => (
          <a {...props()} href="#download">
            Download SVG
          </a>
        )}
        fileName="moduix-qr-code.svg"
        mimeType="image/svg+xml"
      />
    </QrCode>
  ));

  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
  expect(trigger).toHaveAttribute('href', '#download');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <QrCode
      ref={(element) => (rootRef = element)}
      asChild={(props) => (
        <section {...props()} aria-label="QR code">
          QR code
        </section>
      )}
    />
  ));

  expect(screen.getByRole('region', { name: 'QR code' })).toHaveAttribute(
    'data-slot',
    'qr-code-root',
  );
  expect(rootRef).toBeUndefined();
});

test('applies native utilities to the component-owned visual parts', () => {
  const { container } = render(() => (
    <QrCode>
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay />
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png" />
    </QrCode>
  ));

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
  const { container } = render(() => (
    <QrCode class="w-48 gap-4 text-primary">
      <QrCodeFrame class="w-1/2">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay class="size-control-xl bg-muted p-2" />
      <QrCodeDownloadTrigger
        class="rounded-lg bg-muted px-2"
        fileName="moduix-qr-code.png"
        mimeType="image/png"
      />
    </QrCode>
  ));

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

import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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

  const { container } = render(() => (
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

  expect(root.getAttribute('data-scope')).toBe('qr-code');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('qr-code-root');
  expect(frameRef).toBe(frame);
  expect(frame.getAttribute('data-part')).toBe('frame');
  expect(frame.getAttribute('data-slot')).toBe('qr-code-frame');
  expect(patternRef.getAttribute('data-part')).toBe('pattern');
  expect(patternRef.getAttribute('data-slot')).toBe('qr-code-pattern');
  expect(screen.getByText('MX')!.getAttribute('data-slot')).toBe('qr-code-overlay');
  expect(trigger.getAttribute('type')).toBe('button');
  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
  expect([...container.querySelector('[data-slot="qr-code-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'relative',
      'inline-flex',
      'w-32',
      'max-w-full',
      'flex-col',
      'items-center',
      'gap-3',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="qr-code-frame"]')!.classList]).toEqual(
    expect.arrayContaining(['h-auto', 'w-full', 'aspect-square', 'fill-current']),
  );
  expect([...container.querySelector('[data-slot="qr-code-pattern"]')!.classList]).toEqual(
    expect.arrayContaining(['fill-inherit']),
  );
  expect([...container.querySelector('[data-slot="qr-code-overlay"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-control-lg',
      'items-center',
      'justify-center',
      'rounded-sm',
      'bg-background',
      'p-1',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="qr-code-download-trigger"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
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

  await page.getByRole('button', { name: 'Update code' }).click();

  await expect.element(page.getByText('https://moduix.dev', { exact: true })).toBeVisible();
  expect(initialPath).toBeTruthy();
  await expect
    .element(page.locator('[data-slot="qr-code-pattern"]'))
    .not.toHaveAttribute('d', initialPath!);
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

  expect(root.getAttribute('data-slot')).toBe('qr-code-root-provider');
  expect(root.getAttribute('data-scope')).toBe('qr-code');
  expect(screen.getByText('https://moduix.dev/docs/qr-code')).toBeTruthy();
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')).toBeTruthy();
});

test('keeps the disabled download trigger unavailable', async () => {
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

  await expect.element(page.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
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

  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
  expect(trigger.getAttribute('href')).toBe('#download');
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

  expect(screen.getByRole('region', { name: 'QR code' })!.getAttribute('data-slot')).toBe(
    'qr-code-root',
  );
  expect(rootRef).toBeUndefined();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
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

  const root = container.querySelector('[data-slot="qr-code-root"]')!;
  const frame = container.querySelector('[data-slot="qr-code-frame"]')!;
  const overlay = container.querySelector('[data-slot="qr-code-overlay"]')!;
  const trigger = container.querySelector('[data-slot="qr-code-download-trigger"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-48', 'gap-4', 'text-primary']));
  expect(['w-32', 'gap-3', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(
    false,
  );
  expect([...frame.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect(frame.classList.contains('w-full')).toBe(false);
  expect([...overlay.classList]).toEqual(
    expect.arrayContaining(['size-control-xl', 'bg-muted', 'p-2']),
  );
  expect(
    ['size-control-lg', 'bg-background', 'p-1'].some((name) => overlay.classList.contains(name)),
  ).toBe(false);
  expect([...trigger.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  expect(
    ['rounded-md', 'bg-background', 'px-4'].some((name) => trigger.classList.contains(name)),
  ).toBe(false);
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('width', '192px');
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="qr-code-frame"]')).toHaveCSS('width', '96px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('padding', '8px');
  await expect
    .element(page.locator('[data-slot="qr-code-download-trigger"]'))
    .toHaveCSS('padding-left', '8px');
});
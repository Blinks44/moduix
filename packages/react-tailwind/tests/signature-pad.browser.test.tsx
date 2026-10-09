import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
  useSignaturePadContext,
} from '../src';

const defaultPaths = ['M1,1 L2,2'];
const translations = {
  clearTrigger: 'Clear signature',
  control: 'Signature drawing area',
};

function SignaturePadParts({ label = 'Signature' }: { label?: string }) {
  const signaturePad = useSignaturePadContext();

  return (
    <>
      <SignaturePadLabel>{label}</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadHiddenInput value={signaturePad.paths.join(' ')} />
    </>
  );
}

test('serializes an explicit hidden input with Ark defaults', async () => {
  const { container } = render(
    <form>
      <SignaturePad defaultPaths={defaultPaths} name="signature">
        <SignaturePadParts />
      </SignaturePad>
    </form>,
  );

  const form = container.querySelector('form');

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'signature');
  expect(new FormData(form!).get('signature')).toBe(defaultPaths.join(' '));
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  render(
    <SignaturePad
      defaultPaths={defaultPaths}
      onDrawEnd={(details) => drawEnds.push(details.paths)}
      translations={translations}
    >
      <SignaturePadParts />
    </SignaturePad>,
  );

  await page.getByRole('button', { name: 'Clear signature', exact: true }).click();

  await expect.element(page.locator('input[hidden]')).toHaveValue('');
  await expect.poll(() => drawEnds).toEqual([[]]);
});

test('keeps the disabled control and clear action unavailable', async () => {
  render(
    <SignaturePad defaultPaths={defaultPaths} disabled translations={translations}>
      <SignaturePadParts label="Disabled signature" />
    </SignaturePad>,
  );

  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', async () => {
  const drawEnds: string[][] = [];

  render(
    <Field readOnly>
      <SignaturePad
        defaultPaths={defaultPaths}
        onDrawEnd={(details) => drawEnds.push(details.paths)}
        translations={translations}
      >
        <SignaturePadParts label="Read-only signature" />
      </SignaturePad>
    </Field>,
  );

  const clearTrigger = screen.getByRole('button', { name: 'Clear signature' });

  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
  (clearTrigger as HTMLButtonElement).click();
  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toBeAttached();
  expect(drawEnds).toEqual([]);
});

test('forwards Canvas control props and ref', async () => {
  const canvasRef = createRef<HTMLDivElement>();

  render(
    <SignaturePad translations={translations}>
      <SignaturePadLabel>Signature</SignaturePadLabel>
      <SignaturePadCanvas
        ref={canvasRef}
        aria-label="Contract signature area"
        data-testid="canvas"
      />
    </SignaturePad>,
  );

  expect(canvasRef.current).toBe(screen.getByTestId('canvas'));
  expect(canvasRef.current!.getAttribute('data-slot')).toBe('signature-pad-control');
  expect(canvasRef.current).toBe(
    screen.getByRole(canvasRef.current!.getAttribute('role') || 'button', {
      name: 'Contract signature area',
    }),
  );
});

test('preserves root asChild composition and RootProvider state', async () => {
  const rootRef = createRef<HTMLDivElement>();

  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths });

    return (
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePadRootProvider>
    );
  }

  const { container } = render(
    <>
      <SignaturePad asChild defaultPaths={defaultPaths} ref={rootRef}>
        <section>
          <SignaturePadParts label="Custom signature" />
        </section>
      </SignaturePad>
      <ProviderSignaturePad />
    </>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('signature-pad-root');
  expect(container.querySelector('section input[hidden]')).not.toBeNull();
  await expect
    .element(page.locator('[data-slot="signature-pad-root-provider"] input[hidden]'))
    .toHaveValue(defaultPaths.join(' '));
});

test('preserves read-only behavior through useSignaturePad and RootProvider', async () => {
  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths, readOnly: true });

    return (
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePadRootProvider>
    );
  }

  render(<ProviderSignaturePad />);

  await expect
    .element(page.getByRole('button', { name: /clear signature/i, exact: true }))
    .toBeDisabled();
});

test('uses native utility defaults for component-owned visual parts', async () => {
  render(
    <SignaturePad defaultPaths={defaultPaths} data-testid="root" translations={translations}>
      <SignaturePadLabel data-testid="label">Signature</SignaturePadLabel>
      <SignaturePadCanvas data-testid="control" />
    </SignaturePad>,
  );

  const control = screen.getByTestId('control');
  const segment = control.querySelector('[data-slot="signature-pad-segment"]')!;
  const guide = control.querySelector('[data-slot="signature-pad-guide"]')!;
  const clearTrigger = screen.getByRole('button', { name: 'Clear signature' });

  expect(getComputedStyle(screen.getByTestId('root'))).toMatchObject({
    display: 'inline-flex',
    width: '280px',
    gap: '8px',
  });
  expect(getComputedStyle(screen.getByTestId('label'))).toMatchObject({
    fontSize: '14px',
    fontWeight: '500',
  });
  expect(getComputedStyle(control)).toMatchObject({
    height: '160px',
    minHeight: '160px',
    borderWidth: '1px',
    borderRadius: '8px',
  });
  expect(getComputedStyle(segment).fill).toBe(getComputedStyle(segment).color);
  expect(getComputedStyle(guide)).toMatchObject({
    position: 'absolute',
    insetInlineStart: '24px',
    insetInlineEnd: '24px',
    bottom: '32px',
    borderStyle: 'dashed',
  });
  expect(getComputedStyle(clearTrigger)).toMatchObject({
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    position: 'absolute',
    top: '8px',
    insetInlineEnd: '8px',
  });
  expect([...clearTrigger.classList]).toEqual(
    expect.arrayContaining([
      'focus-visible:outline-1',
      'focus-visible:outline-offset-1',
      '[@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted',
    ]),
  );
  expect(getComputedStyle(clearTrigger.querySelector('svg')!)).toMatchObject({
    width: '16px',
    height: '16px',
  });
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <SignaturePad
      className="w-full gap-6 text-primary"
      data-testid="root"
      translations={translations}
    >
      <SignaturePadParts />
    </SignaturePad>,
  );

  const root = screen.getByTestId('root');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'gap-6', 'text-primary']));
  expect(['w-70', 'gap-2', 'text-foreground'].some((name) => root!.classList.contains(name))).toBe(
    false,
  );
});

test('preserves raw Ark provider values without private readonly metadata', async () => {
  function ArkProvider() {
    const signaturePad = useArkSignaturePad({ defaultPaths, translations });
    return (
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadParts />
      </SignaturePadRootProvider>
    );
  }
  render(<ArkProvider />);
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();
});

test('updates provider readonly metadata and preserves explicit Field overrides', async () => {
  function Provider({ readOnly }: { readOnly?: boolean }) {
    const signaturePad = useSignaturePad({ defaultPaths, translations, readOnly });
    return (
      <SignaturePadRootProvider value={signaturePad}>
        <output data-testid="readonly">{String(signaturePad.readOnly)}</output>
        <SignaturePadParts />
      </SignaturePadRootProvider>
    );
  }
  const { rerender } = render(
    <Field readOnly>
      <Provider />
    </Field>,
  );
  await expect.element(page.getByTestId('readonly')).toContainText('true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();

  rerender(
    <Field readOnly>
      <Provider readOnly={false} />
    </Field>,
  );
  await expect.element(page.getByTestId('readonly')).toContainText('false');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();

  rerender(
    <Field readOnly>
      <Provider readOnly />
    </Field>,
  );
  await expect.element(page.getByTestId('readonly')).toContainText('true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});
import { useSignaturePad as useArkSignaturePad } from '@ark-ui/react/signature-pad';
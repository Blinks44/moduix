import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Field,
  SignaturePad,
  SignaturePadClearTrigger,
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

function SignaturePadParts(props: { label?: string }) {
  const signaturePad = useSignaturePadContext();

  return (
    <>
      <SignaturePadLabel>{props.label ?? 'Signature'}</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadHiddenInput value={signaturePad().paths.join(' ')} />
    </>
  );
}

test('serializes an explicit hidden input with Ark defaults', async () => {
  const { container } = render(() => (
    <form>
      <SignaturePad defaultPaths={defaultPaths} name="signature">
        <SignaturePadParts />
      </SignaturePad>
    </form>
  ));

  const form = container.querySelector('form');

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'signature');
  expect(new FormData(form! as HTMLFormElement).get('signature')).toBe(defaultPaths.join(' '));
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  render(() => (
    <SignaturePad
      defaultPaths={defaultPaths}
      onDrawEnd={(details) => drawEnds.push(details.paths)}
      translations={translations}
    >
      <SignaturePadParts />
    </SignaturePad>
  ));

  await page.getByRole('button', { name: 'Clear signature', exact: true }).click();

  await expect.element(page.locator('input[hidden]')).toHaveValue('');
  await expect.poll(() => drawEnds).toEqual([[]]);
});

test('keeps the disabled control and clear action unavailable', async () => {
  render(() => (
    <SignaturePad defaultPaths={defaultPaths} disabled translations={translations}>
      <SignaturePadParts label="Disabled signature" />
    </SignaturePad>
  ));

  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', async () => {
  const drawEnds: string[][] = [];

  render(() => (
    <Field readOnly>
      <SignaturePad
        defaultPaths={defaultPaths}
        onDrawEnd={(details) => drawEnds.push(details.paths)}
        translations={translations}
      >
        <SignaturePadParts label="Read-only signature" />
      </SignaturePad>
    </Field>
  ));

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
  let canvasRef!: HTMLDivElement;

  render(() => (
    <SignaturePad translations={translations}>
      <SignaturePadLabel>Signature</SignaturePadLabel>
      <SignaturePadCanvas
        ref={(element) => (canvasRef = element)}
        aria-label="Contract signature area"
        data-testid="canvas"
      />
    </SignaturePad>
  ));

  expect(canvasRef).toBe(screen.getByTestId('canvas'));
  expect(canvasRef!.getAttribute('data-slot')).toBe('signature-pad-control');
  expect(canvasRef).toBe(
    screen.getByRole(canvasRef!.getAttribute('role') || 'button', {
      name: 'Contract signature area',
    }),
  );
});

test('preserves root asChild composition and RootProvider state', async () => {
  let rootRef: HTMLDivElement | undefined;

  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths });

    return (
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePadRootProvider>
    );
  }

  const { container } = render(() => (
    <>
      <SignaturePad
        asChild={(props) => <section {...props()} />}
        defaultPaths={defaultPaths}
        ref={(element) => (rootRef = element)}
      >
        <SignaturePadParts label="Custom signature" />
      </SignaturePad>
      <ProviderSignaturePad />
    </>
  ));

  expect(rootRef).toBeUndefined();
  await expect.element(page.locator('section')).toHaveAttribute('data-slot', 'signature-pad-root');
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

  render(() => <ProviderSignaturePad />);

  await expect
    .element(page.getByRole('button', { name: /clear signature/i, exact: true }))
    .toBeDisabled();
});

test('uses native utility defaults for component-owned visual parts', async () => {
  render(() => (
    <SignaturePad defaultPaths={defaultPaths} data-testid="root" translations={translations}>
      <SignaturePadLabel data-testid="label">Signature</SignaturePadLabel>
      <SignaturePadCanvas data-testid="control" />
    </SignaturePad>
  ));

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
  render(() => (
    <SignaturePad class="w-full gap-6 text-primary" data-testid="root" translations={translations}>
      <SignaturePadParts />
    </SignaturePad>
  ));

  const root = screen.getByTestId('root');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'gap-6', 'text-primary']));
  expect(['w-70', 'gap-2', 'text-foreground'].some((name) => root!.classList.contains(name))).toBe(
    false,
  );
});
import { useSignaturePad as useArkSignaturePad } from '@ark-ui/solid/signature-pad';
import { createSignal } from 'solid-js';

test('accepts a native Ark provider API without moduix metadata', async () => {
  function NativeProvider() {
    const value = useArkSignaturePad({ defaultPaths, translations });
    return (
      <SignaturePadRootProvider value={value}>
        <SignaturePadParts />
      </SignaturePadRootProvider>
    );
  }
  render(() => <NativeProvider />);
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();
});

test('keeps plain readOnly metadata reactive with Field inheritance and explicit overrides', async () => {
  const [readOnly, setReadOnly] = createSignal<boolean | undefined>(undefined);
  function Provider() {
    const value = useSignaturePad(() => ({ defaultPaths, translations, readOnly: readOnly() }));
    return (
      <SignaturePadRootProvider value={value}>
        <output data-testid="read-only">{String(value.readOnly())}</output>
        <SignaturePadParts />
      </SignaturePadRootProvider>
    );
  }
  render(() => (
    <Field readOnly>
      <Provider />
    </Field>
  ));
  await expect.element(page.getByTestId('read-only')).toContainText('true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
  setReadOnly(false);
  await expect.element(page.getByTestId('read-only')).toContainText('false');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();
  setReadOnly(true);
  await expect.element(page.getByTestId('read-only')).toContainText('true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});

test.each([false, true])('updates the clear trigger class (asChild=%s)', async (asChild) => {
  const [className, setClassName] = createSignal('before');
  const { container } = render(() => (
    <SignaturePad defaultPaths={defaultPaths}>
      <SignaturePadClearTrigger
        class={className()}
        asChild={asChild ? (props) => <button {...props()}>Clear</button> : undefined}
      />
    </SignaturePad>
  ));
  const trigger = container.querySelector('button')!;

  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['before']));
  setClassName('after');
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['after']));
  expect(['before'].some((name) => trigger!.classList.contains(name))).toBe(false);
  expect(container.querySelector('button')).toBe(trigger);
});

test('SignaturePadClearTrigger updates consumer labels and Ark translations', async () => {
  const [label, setLabel] = createSignal<string | undefined>();
  const [translation, setTranslation] = createSignal('Clear signature');
  render(() => (
    <SignaturePad defaultPaths={['M1,1 L2,2']} translations={{ clearTrigger: translation() }}>
      <SignaturePadClearTrigger aria-label={label()} />
    </SignaturePad>
  ));
  const trigger = screen.getByRole('button', { name: 'Clear signature' });

  setLabel('Remove signature');
  expect(trigger).toBe(
    screen.getByRole(trigger!.getAttribute('role') || 'button', { name: 'Remove signature' }),
  );
  setLabel(undefined);
  setTranslation('Erase drawing');
  expect(trigger).toBe(
    screen.getByRole(trigger!.getAttribute('role') || 'button', { name: 'Erase drawing' }),
  );
});
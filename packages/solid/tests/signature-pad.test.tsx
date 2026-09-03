import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Field, SignaturePad, useSignaturePad } from '../src';

const defaultPaths = ['M1,1 L2,2'];
const translations = {
  clearTrigger: 'Clear signature',
  control: 'Signature drawing area',
};

function SignaturePadParts(props: { label?: string }) {
  return (
    <>
      <SignaturePad.Label>{props.label ?? 'Signature'}</SignaturePad.Label>
      <SignaturePad.Canvas />
    </>
  );
}

test('serializes the automatic hidden input with the configured form value', () => {
  const { container } = render(() => (
    <form>
      <SignaturePad
        defaultPaths={defaultPaths}
        getFormValue={(paths) => JSON.stringify(paths)}
        name="signature"
      >
        <SignaturePadParts />
      </SignaturePad>
    </form>
  ));

  const form = container.querySelector('form');
  const input = container.querySelector('[data-slot="signature-pad-hidden-input"]');

  expect(input).toHaveAttribute('name', 'signature');
  expect(new FormData(form! as HTMLFormElement).get('signature')).toBe(
    JSON.stringify(defaultPaths),
  );
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  const { container } = render(() => (
    <SignaturePad
      defaultPaths={defaultPaths}
      onDrawEnd={(details) => drawEnds.push(details.paths)}
      translations={translations}
    >
      <SignaturePadParts />
    </SignaturePad>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Clear signature' }));

  await waitFor(() => {
    expect(container.querySelector('[data-slot="signature-pad-hidden-input"]')).toHaveValue('');
    expect(drawEnds).toEqual([[]]);
  });
});

test('keeps the disabled control and clear action unavailable', () => {
  render(() => (
    <SignaturePad defaultPaths={defaultPaths} disabled translations={translations}>
      <SignaturePadParts label="Disabled signature" />
    </SignaturePad>
  ));

  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  expect(screen.getByRole('button', { name: 'Clear signature' })).toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', () => {
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

  expect(clearTrigger).toBeDisabled();
  fireEvent.click(clearTrigger);
  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toBeInTheDocument();
  expect(drawEnds).toEqual([]);
});

test('forwards Canvas control props and ref', () => {
  let canvasRef!: HTMLDivElement;

  render(() => (
    <SignaturePad translations={translations}>
      <SignaturePad.Label>Signature</SignaturePad.Label>
      <SignaturePad.Canvas
        ref={(element) => (canvasRef = element)}
        aria-label="Contract signature area"
        data-testid="canvas"
      />
    </SignaturePad>
  ));

  expect(canvasRef).toBe(screen.getByTestId('canvas'));
  expect(canvasRef).toHaveAttribute('data-slot', 'signature-pad-control');
  expect(canvasRef).toHaveAccessibleName('Contract signature area');
});

test('preserves root asChild composition and RootProvider state', () => {
  let rootRef: HTMLDivElement | undefined;

  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths });

    return (
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePad.RootProvider>
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
  expect(
    container.querySelector('section [data-slot="signature-pad-hidden-input"]'),
  ).not.toBeNull();
  expect(
    container.querySelector(
      '[data-slot="signature-pad-root-provider"] [data-slot="signature-pad-hidden-input"]',
    ),
  ).toHaveValue(defaultPaths.join(' '));
});

test('preserves read-only behavior through useSignaturePad and RootProvider', () => {
  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths, readOnly: true });

    return (
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePad.RootProvider>
    );
  }

  render(() => <ProviderSignaturePad />);

  expect(screen.getByRole('button', { name: /clear signature/i })).toBeDisabled();
});
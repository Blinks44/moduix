import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Field, SignaturePad, useSignaturePad } from '../src';

const defaultPaths = ['M1,1 L2,2'];
const translations = {
  clearTrigger: 'Clear signature',
  control: 'Signature drawing area',
};

function SignaturePadParts({ label = 'Signature' }: { label?: string }) {
  return (
    <>
      <SignaturePad.Label>{label}</SignaturePad.Label>
      <SignaturePad.Canvas />
    </>
  );
}

test('serializes the automatic hidden input with the configured form value', () => {
  const { container } = render(
    <form>
      <SignaturePad
        defaultPaths={defaultPaths}
        getFormValue={(paths) => JSON.stringify(paths)}
        name="signature"
      >
        <SignaturePadParts />
      </SignaturePad>
    </form>,
  );

  const form = container.querySelector('form');
  const input = container.querySelector('[data-slot="signature-pad-hidden-input"]');

  expect(input).toHaveAttribute('name', 'signature');
  expect(new FormData(form!).get('signature')).toBe(JSON.stringify(defaultPaths));
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  const { container } = render(
    <SignaturePad
      defaultPaths={defaultPaths}
      onDrawEnd={(details) => drawEnds.push(details.paths)}
      translations={translations}
    >
      <SignaturePadParts />
    </SignaturePad>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Clear signature' }));

  await waitFor(() => {
    expect(container.querySelector('[data-slot="signature-pad-hidden-input"]')).toHaveValue('');
    expect(drawEnds).toEqual([[]]);
  });
});

test('keeps the disabled control and clear action unavailable', () => {
  render(
    <SignaturePad defaultPaths={defaultPaths} disabled translations={translations}>
      <SignaturePadParts label="Disabled signature" />
    </SignaturePad>,
  );

  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  expect(screen.getByRole('button', { name: 'Clear signature' })).toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', () => {
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

  expect(clearTrigger).toBeDisabled();
  fireEvent.click(clearTrigger);
  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toBeInTheDocument();
  expect(drawEnds).toEqual([]);
});

test('forwards Canvas control props and ref', () => {
  const canvasRef = createRef<HTMLDivElement>();

  render(
    <SignaturePad translations={translations}>
      <SignaturePad.Label>Signature</SignaturePad.Label>
      <SignaturePad.Canvas
        ref={canvasRef}
        aria-label="Contract signature area"
        data-testid="canvas"
      />
    </SignaturePad>,
  );

  expect(canvasRef.current).toBe(screen.getByTestId('canvas'));
  expect(canvasRef.current).toHaveAttribute('data-slot', 'signature-pad-control');
  expect(canvasRef.current).toHaveAccessibleName('Contract signature area');
});

test('preserves root asChild composition and RootProvider state', () => {
  const rootRef = createRef<HTMLDivElement>();

  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths });

    return (
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePad.RootProvider>
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

  expect(rootRef.current).toHaveAttribute('data-slot', 'signature-pad-root');
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

  render(<ProviderSignaturePad />);

  expect(screen.getByRole('button', { name: /clear signature/i })).toBeDisabled();
});
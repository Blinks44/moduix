import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Field, SignaturePad, useSignaturePad, useSignaturePadContext } from '../src';

const defaultPaths = ['M1,1 L2,2'];
const translations = {
  clearTrigger: 'Clear signature',
  control: 'Signature drawing area',
};

function SignaturePadParts({ label = 'Signature' }: { label?: string }) {
  const signaturePad = useSignaturePadContext();

  return (
    <>
      <SignaturePad.Label>{label}</SignaturePad.Label>
      <SignaturePad.Canvas />
      <SignaturePad.HiddenInput value={signaturePad.paths.join(' ')} />
    </>
  );
}

test('serializes an explicit hidden input with Ark defaults', () => {
  const { container } = render(
    <form>
      <SignaturePad defaultPaths={defaultPaths} name="signature">
        <SignaturePadParts />
      </SignaturePad>
    </form>,
  );

  const form = container.querySelector('form');
  const input = container.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'signature');
  expect(new FormData(form!).get('signature')).toBe(defaultPaths.join(' '));
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
    expect(container.querySelector('input[hidden]')).toHaveValue('');
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
  expect(container.querySelector('section input[hidden]')).not.toBeNull();
  expect(
    container.querySelector('[data-slot="signature-pad-root-provider"] input[hidden]'),
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

test('uses native utility defaults for component-owned visual parts', () => {
  render(
    <SignaturePad defaultPaths={defaultPaths} data-testid="root" translations={translations}>
      <SignaturePad.Label data-testid="label">Signature</SignaturePad.Label>
      <SignaturePad.Canvas data-testid="control" />
    </SignaturePad>,
  );

  const control = screen.getByTestId('control');
  const segment = control.querySelector('[data-slot="signature-pad-segment"]')!;
  const guide = control.querySelector('[data-slot="signature-pad-guide"]')!;
  const clearTrigger = screen.getByRole('button', { name: 'Clear signature' });

  expect(screen.getByTestId('root')).toHaveClass('inline-flex', 'w-70', 'gap-2');
  expect(screen.getByTestId('label')).toHaveClass('text-sm', 'font-medium');
  expect(control).toHaveClass('h-40', 'min-h-40', 'rounded-md', 'border', 'bg-background');
  expect(segment).toHaveClass('fill-current');
  expect(guide).toHaveClass('absolute', 'start-6', 'end-6', 'bottom-8', 'border-dashed');
  expect(clearTrigger).toHaveClass('absolute', 'top-2', 'end-2');
  expect(clearTrigger.querySelector('svg')).toHaveClass('size-4');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
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

  expect(root).toHaveClass('w-full', 'gap-6', 'text-primary');
  expect(root).not.toHaveClass('w-70', 'gap-2', 'text-foreground');
});
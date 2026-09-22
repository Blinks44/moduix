import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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

test('serializes an explicit hidden input with Ark defaults', () => {
  const { container } = render(() => (
    <form>
      <SignaturePad defaultPaths={defaultPaths} name="signature">
        <SignaturePadParts />
      </SignaturePad>
    </form>
  ));

  const form = container.querySelector('form');
  const input = container.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'signature');
  expect(new FormData(form! as HTMLFormElement).get('signature')).toBe(defaultPaths.join(' '));
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
    expect(container.querySelector('input[hidden]')).toHaveValue('');
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
      <SignaturePadLabel>Signature</SignaturePadLabel>
      <SignaturePadCanvas
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
  expect(container.querySelector('section')).toHaveAttribute('data-slot', 'signature-pad-root');
  expect(container.querySelector('section input[hidden]')).not.toBeNull();
  expect(
    container.querySelector('[data-slot="signature-pad-root-provider"] input[hidden]'),
  ).toHaveValue(defaultPaths.join(' '));
});

test('preserves read-only behavior through useSignaturePad and RootProvider', () => {
  function ProviderSignaturePad() {
    const signaturePad = useSignaturePad({ defaultPaths, readOnly: true });

    return (
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadParts label="Provider signature" />
      </SignaturePadRootProvider>
    );
  }

  render(() => <ProviderSignaturePad />);

  expect(screen.getByRole('button', { name: /clear signature/i })).toBeDisabled();
});
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  useSignaturePadContext,
} from '@/index';

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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <SignaturePad class="w-full gap-6 text-primary" data-testid="root" translations={translations}>
      <SignaturePadParts />
    </SignaturePad>
  ));

  const root = screen.getByTestId('root');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'gap-6', 'text-primary']));
});
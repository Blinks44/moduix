import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
});
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  PinInput,
  PinInputLabel,
  PinInputControl,
  PinInputInput,
  PinInputSeparator,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <PinInput className="w-80 max-w-sm gap-4">
      <PinInputLabel className="text-lg text-primary">Verification code</PinInputLabel>
      <PinInputControl className="gap-4">
        <PinInputInput
          className="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
          index={0}
        />
        <PinInputSeparator className="size-8 text-primary" />
      </PinInputControl>
    </PinInput>,
  );

  const root = container.querySelector('[data-slot="pin-input-root"]');
  const label = container.querySelector('[data-slot="pin-input-label"]');
  const control = container.querySelector('[data-slot="pin-input-control"]');
  const input = container.querySelector('[data-slot="pin-input-input"]');
  const separator = container.querySelector('[data-slot="pin-input-separator"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4']));
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-lg', 'text-primary']));
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect(getComputedStyle(input!).width).toBe('160px');
  expect(getComputedStyle(input!).height).toBe('48px');
  expect([...input!.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-40',
      'rounded-lg',
      'border-2',
      'bg-muted',
      'px-2',
      'py-1',
      'text-primary',
    ]),
  );
  expect([...separator!.classList]).toEqual(expect.arrayContaining(['size-8', 'text-primary']));
});
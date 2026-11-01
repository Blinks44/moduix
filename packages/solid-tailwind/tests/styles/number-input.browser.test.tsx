import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <NumberInput class="w-80 max-w-sm gap-4 text-primary">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputControl class="gap-4">
        <NumberInputDecrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
        <NumberInputInput class="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
        <NumberInputIncrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
      </NumberInputControl>
    </NumberInput>
  ));

  const root = container.querySelector('[data-slot="number-input-root"]');
  const control = container.querySelector('[data-slot="number-input-control"]');
  const decrement = container.querySelector('[data-slot="number-input-decrement-trigger"]');
  const input = container.querySelector('[data-slot="number-input-input"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...decrement!.classList]).toEqual(
    expect.arrayContaining(['size-12', 'min-w-12', 'rounded-lg', 'bg-muted', 'p-2']),
  );
  expect([...input!.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-40',
      'rounded-md',
      'bg-muted',
      'px-0',
      'py-0',
      'text-primary',
    ]),
  );
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(input!).paddingLeft).toBe('0px');
});
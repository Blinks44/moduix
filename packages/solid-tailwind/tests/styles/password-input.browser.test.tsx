import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@/index';

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(() => (
    <PasswordInput class="w-80 max-w-sm gap-4 text-muted-foreground">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl class="min-h-20 rounded-lg border-2 border-primary bg-muted pe-0">
        <PasswordInputInput />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  ));

  const root = container.querySelector('[data-slot="password-input-root"]');
  const control = container.querySelector('[data-slot="password-input-control"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-muted-foreground']),
  );
  expect([...control!.classList]).toEqual(
    expect.arrayContaining([
      'min-h-20',
      'rounded-lg',
      'border-2',
      'border-primary',
      'bg-muted',
      'pe-0',
    ]),
  );
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(control!).minHeight).toBe('80px');
  expect(getComputedStyle(control!).paddingRight).toBe('0px');
});
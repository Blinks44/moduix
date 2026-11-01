import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, h } from 'vue';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@/components/password-input';

function label() {
  return h(PasswordInputLabel, null, { default: () => 'Password' });
}

test('lets consumer utilities replace component defaults', () => {
  const App = defineComponent({
    setup() {
      return () =>
        h(
          PasswordInput,
          {
            class: 'w-80 max-w-sm gap-4 text-muted-foreground',
          },
          {
            default: () => [
              label(),
              h(
                PasswordInputControl,
                {
                  class: 'min-h-20 rounded-lg border-2 border-primary bg-muted pe-0',
                },
                {
                  default: () => [
                    h(PasswordInputInput),
                    h(PasswordInputVisibilityTrigger, null, {
                      default: () => h(PasswordInputIndicator),
                    }),
                  ],
                },
              ),
            ],
          },
        );
    },
  });
  const { container } = render(App);

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
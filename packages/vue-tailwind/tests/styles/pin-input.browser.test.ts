import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  Field,
  FieldErrorText,
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
} from '@/index';

const pinInputComponents = {
  Field,
  FieldErrorText,
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
} as Record<string, Component>;

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <PinInput class="w-80 max-w-sm gap-4">
        <PinInputLabel class="text-lg text-primary">Verification code</PinInputLabel>
        <PinInputControl class="gap-4">
          <PinInputInput
            class="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
            :index="0"
          />
          <PinInputSeparator class="size-8 text-primary" />
        </PinInputControl>
      </PinInput>
    `,
  });

  const { container } = render(App);
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
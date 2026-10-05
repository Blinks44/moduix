import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { CloseButton } from '../src';

test('respects stopImmediatePropagation from a consumer capture listener', async () => {
  const handleClick = rs.fn();
  const handleChildClick = rs.fn();
  const handleCapture = rs.fn((event: MouseEvent) => event.stopImmediatePropagation());
  render({
    components: { CloseButton },
    setup: () => ({ handleClick, handleCapture, handleChildClick }),
    template: `
      <CloseButton as-child aria-label="Stop propagation" @click.capture="handleCapture" @click="handleClick">
        <button type="button" @click="handleChildClick">Stop propagation</button>
      </CloseButton>
    `,
  });
  await page.getByRole('button', { name: 'Stop propagation' }).click();
  expect(handleCapture).toHaveBeenCalledTimes(1);
  expect(handleClick).not.toHaveBeenCalled();
  expect(handleChildClick).not.toHaveBeenCalled();
});

test('keeps merged Vue listener arrays ordered and forwards the native event', async () => {
  const calls: string[] = [];

  render({
    components: { CloseButton },
    setup: () => ({
      listeners: {
        onClickCapture: [() => calls.push('capture first'), () => calls.push('capture second')],
        onClick: [() => calls.push('bubble first'), () => calls.push('bubble second')],
      },
    }),
    template: '<CloseButton v-bind="listeners" aria-label="Merged handlers" />',
  });
  await page.getByRole('button', { name: 'Merged handlers' }).click();
  expect(calls).toEqual(['capture first', 'capture second', 'bubble first', 'bubble second']);
});

test('reacts to aria-disabled changes and blocks all same-host listeners while disabled', async () => {
  const ariaDisabled = ref<boolean | 'true' | 'false' | undefined>(undefined);
  const handleClick = rs.fn();
  const handleCapture = rs.fn();
  render({
    components: { CloseButton },
    setup: () => ({ ariaDisabled, handleClick, handleCapture }),
    template: `
      <CloseButton as-child :aria-disabled="ariaDisabled" aria-label="Reactive disabled"
        @click="handleClick" @click.capture="handleCapture">
        <button type="button">Reactive disabled</button>
      </CloseButton>
    `,
  });
  const button = screen.getByRole('button', { name: 'Reactive disabled' });
  const handleSameHostCapture = rs.fn();
  button.addEventListener('click', handleSameHostCapture, { capture: true });
  for (const value of [true, 'true'] as const) {
    ariaDisabled.value = value;
    await nextTick();
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .toHaveAttribute('aria-disabled', 'true');
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .toHaveAttribute('data-disabled');
    expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
      false,
    );
  }
  expect(handleClick).not.toHaveBeenCalled();
  expect(handleCapture).not.toHaveBeenCalled();
  expect(handleSameHostCapture).not.toHaveBeenCalled();

  for (const value of [false, 'false', undefined] as const) {
    ariaDisabled.value = value;
    await nextTick();
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .not.toHaveAttribute('data-disabled');
    await page.getByRole('button', { name: 'Reactive disabled' }).click();
  }
  expect(handleClick).toHaveBeenCalledTimes(3);
  expect(handleCapture).toHaveBeenCalledTimes(3);
  expect(handleSameHostCapture).toHaveBeenCalledTimes(3);
});

test('renders an accessible native button with safe defaults and a Vue ref', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: { CloseButton },
    setup() {
      return { buttonRef };
    },
    template: '<CloseButton ref="buttonRef" data-testid="close-button" />',
  });

  const button = screen.getByTestId('close-button');

  expect(buttonRef.value?.$el).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});

test('keeps the close fallback when conditional slot content is absent', () => {
  render({
    components: { CloseButton },
    setup() {
      return { showContent: ref(false) };
    },
    template: '<CloseButton><span v-if="showContent">Custom content</span></CloseButton>',
  });

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
});

test('preserves a custom button host, attrs, and its DOM root through a Vue ref', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: { CloseButton },
    setup() {
      return { buttonRef };
    },
    template: `
      <CloseButton ref="buttonRef" as-child aria-label="Close documentation">
        <button type="button" data-owner="consumer"><svg aria-hidden="true" /></button>
      </CloseButton>
    `,
  });

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(buttonRef.value?.$el).toBe(button);
  await expect
    .element(page.getByRole('button', { name: 'Close documentation' }))
    .toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({ owner: 'consumer', slot: 'close-button-root' });
});

test('keeps disabled asChild hosts semantic and prevents their activation', async () => {
  const childClick = rs.fn();
  const closeClick = rs.fn();

  render({
    components: { CloseButton },
    setup() {
      return { childClick, closeClick };
    },
    template: `
      <CloseButton as-child disabled aria-label="Close documentation" @click="closeClick">
        <button type="button" @click="childClick"><svg aria-hidden="true" /></button>
      </CloseButton>
    `,
  });

  const button = screen.getByRole('button', { name: 'Close documentation' });

  const close = page.getByRole('button', { name: 'Close documentation' });

  await expect.element(close).not.toHaveAttribute('disabled');
  await expect.element(close).toHaveAttribute('aria-disabled', 'true');
  await expect.element(close).toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(childClick).not.toHaveBeenCalled();
  expect(closeClick).not.toHaveBeenCalled();
});

test('preserves composed click handlers while enabled', async () => {
  const calls: string[] = [];

  render({
    components: { CloseButton },
    setup() {
      return {
        onCloseCapture: () => calls.push('close capture'),
        onChildClick: () => calls.push('button click'),
        onCloseClick: () => calls.push('close click'),
      };
    },
    template: `
      <CloseButton
        as-child
        aria-label="Dismiss notification"
        @click.capture="onCloseCapture"
        @click="onCloseClick"
      >
        <button type="button" @click="onChildClick">Dismiss notification</button>
      </CloseButton>
    `,
  });

  await page.getByRole('button', { name: 'Dismiss notification' }).click();

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
});

test('prevents activation for native and aria-disabled buttons', async () => {
  const disabled = ref(true);
  const ariaDisabled = ref<boolean | 'true' | undefined>();
  const handleClick = rs.fn();

  render({
    components: { CloseButton },
    setup() {
      return { disabled, ariaDisabled, handleClick };
    },
    template: `
      <CloseButton
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        aria-label="Close documentation"
        @click="handleClick"
      />
    `,
  });

  const button = screen.getByRole('button', { name: 'Close documentation' });

  await expect.element(page.getByRole('button', { name: 'Close documentation' })).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();

  disabled.value = false;
  ariaDisabled.value = 'true';
  await nextTick();

  await expect
    .element(page.getByRole('button', { name: 'Close documentation' }))
    .toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('preserves parent data hooks through asChild and merges a consumer class', async () => {
  render({
    components: { CloseButton },
    template: `
      <CloseButton
        as-child
        aria-label="Delete item"
        data-scope="accordion"
        data-part="trigger"
        data-slot="accordion-trigger"
        data-disabled=""
        class="consumer-class"
      >
        <button type="button"><svg aria-hidden="true" /></button>
      </CloseButton>
    `,
  });

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({
    scope: 'accordion',
    part: 'trigger',
    slot: 'accordion-trigger',
  });
  await expect
    .element(page.getByRole('button', { name: 'Delete item' }))
    .toHaveAttribute('data-disabled');
  expect(button.className.endsWith('consumer-class')).toBe(true);
});

test('uses aria-labelledby without adding the default aria-label', async () => {
  render({
    components: { CloseButton },
    template: `
      <span id="close-label">Dismiss dialog</span>
      <CloseButton aria-labelledby="close-label" />
    `,
  });

  await expect
    .element(page.getByRole('button', { name: 'Dismiss dialog' }))
    .not.toHaveAttribute('aria-label');
});
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { CloseButton } from '../src';

test('renders an accessible native button with safe defaults and a Vue ref', () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { CloseButton },
    setup() {
      return { buttonRef };
    },
    template: '<CloseButton ref="buttonRef" data-testid="close-button" />',
  });

  render(Harness);

  const button = screen.getByTestId('close-button');

  expect(buttonRef.value?.$el).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAccessibleName('Close');
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button).toHaveAttribute('data-scope', 'close-button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('keeps the close fallback when conditional slot content is absent', () => {
  const Harness = defineComponent({
    components: { CloseButton },
    setup() {
      return { showContent: ref(false) };
    },
    template: '<CloseButton><span v-if="showContent">Custom content</span></CloseButton>',
  });

  render(Harness);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
});

test('preserves a custom button host, attrs, and its DOM root through a Vue ref', () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(buttonRef.value?.$el).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-owner', 'consumer');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('keeps disabled asChild hosts semantic and prevents their activation', async () => {
  const childClick = rs.fn();
  const closeClick = rs.fn();
  const Harness = defineComponent({
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

  render(Harness);

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).not.toHaveAttribute('disabled');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(childClick).not.toHaveBeenCalled();
  expect(closeClick).not.toHaveBeenCalled();
});

test('preserves composed click handlers while enabled', async () => {
  const calls: string[] = [];
  const Harness = defineComponent({
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

  render(Harness);

  const button = screen.getByRole('button', { name: 'Dismiss notification' });
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(true);

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
});

test('prevents activation for native and aria-disabled buttons', async () => {
  const disabled = ref(true);
  const ariaDisabled = ref<boolean | 'true' | undefined>();
  const handleClick = rs.fn();
  const Harness = defineComponent({
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

  render(Harness);

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();

  disabled.value = false;
  ariaDisabled.value = 'true';
  await nextTick();

  await fireEvent.click(button);

  expect(button).toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('preserves parent data hooks through asChild and lets consumer utilities override defaults', () => {
  render({
    components: { CloseButton },
    template: `
      <CloseButton
        as-child
        aria-label="Close panel"
        data-scope="accordion"
        data-part="trigger"
        data-slot="accordion-trigger"
        data-disabled=""
        class="size-10"
      >
        <button type="button"><svg aria-hidden="true" /></button>
      </CloseButton>
    `,
  });

  const button = screen.getByRole('button', { name: 'Close panel' });

  expect(button).toHaveClass('size-10');
  expect(button.className).not.toContain('size-7');
  expect(button).toHaveAttribute('data-scope', 'accordion');
  expect(button).toHaveAttribute('data-part', 'trigger');
  expect(button).toHaveAttribute('data-slot', 'accordion-trigger');
  expect(button).toHaveAttribute('data-disabled');
});

test('uses aria-labelledby without adding the default aria-label', () => {
  render({
    components: { CloseButton },
    template: `
      <span id="close-label">Dismiss dialog</span>
      <CloseButton aria-labelledby="close-label" />
    `,
  });

  const button = screen.getByRole('button', { name: 'Dismiss dialog' });

  expect(button).not.toHaveAttribute('aria-label');
});
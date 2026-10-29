import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '@/index';

test('renders a native button with safe defaults, stable hooks, attrs, classes, and a Vue ref', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: { Button },
    setup() {
      return { buttonRef };
    },
    template:
      '<Button ref="buttonRef" id="save-button" data-testid="button" data-probe="root" class="px-8" aria-label="Save changes">Save changes</Button>',
  });

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(buttonRef.value?.$el).toBe(button);
  const buttonLocator = page.getByRole('button', { name: 'Save changes' });

  await expect.element(buttonLocator).toHaveAttribute('id', 'save-button');
  expect(button.getAttribute('data-probe')).toBe('root');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-busy');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-disabled');
  expect(button.dataset).toMatchObject({ scope: 'button', part: 'root', slot: 'button-root' });
  expect(button.dataset).toMatchObject({ variant: 'default', size: 'md' });
  expect(getComputedStyle(button).paddingInline).toBe('32px');
});

test('reads the token duration and lets a consumer duration replace it', () => {
  render({
    components: { Button },
    template: '<Button class="duration-500" data-testid="button">Save</Button>',
  });

  const button = screen.getByTestId('button');

  expect(button.classList.contains('duration-500')).toBe(true);
  expect(getComputedStyle(button).transitionDuration.split(', ')[0]).toBe('0.5s');
});
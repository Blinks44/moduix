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
      '<Button ref="buttonRef" id="save-button" data-testid="button" data-probe="root" class="consumer-class" aria-label="Save changes">Save changes</Button>',
  });

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(buttonRef.value?.$el).toBe(button);
  const buttonLocator = page.getByRole('button', { name: 'Save changes' });

  await expect.element(buttonLocator).toHaveAttribute('id', 'save-button');
  expect(button.getAttribute('data-probe')).toBe('root');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-busy');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-disabled');
  expect(button.dataset).toMatchObject({
    scope: 'button',
    part: 'root',
    slot: 'button-root',
    variant: 'default',
    size: 'md',
  });
  expect(button.classList.contains('consumer-class')).toBe(true);
});

test('lets the public variables override variant and size defaults', () => {
  render({
    components: { Button },
    template: `
      <Button variant="outline" style="--moduix-button-bg: rgb(1, 2, 3); --moduix-button-height: 50px">Themed</Button>
      <Button aria-label="Square" size="icon-lg" style="--moduix-button-height: 44px">×</Button>
    `,
  });

  const themed = screen.getByRole('button', { name: 'Themed' });
  const square = screen.getByRole('button', { name: 'Square' });

  expect(getComputedStyle(themed).backgroundColor).toBe('rgb(1, 2, 3)');
  expect(themed.offsetHeight).toBe(50);
  expect([square.offsetWidth, square.offsetHeight]).toEqual([44, 44]);
});
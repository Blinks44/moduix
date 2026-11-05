import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import SelectOverride from './SelectOverride.svelte';

test('applies consumer classes after Tailwind defaults', async () => {
  const { container } = render(SelectOverride);
  const item = container.querySelector('[data-slot="select-item"]')!;
  expect([...item.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect.element(page.locator('[data-slot="select-item"]')).toHaveCSS('padding-top', '0px');
  await expect.element(page.locator('[data-slot="select-item"]')).toHaveCSS('padding-left', '0px');
});
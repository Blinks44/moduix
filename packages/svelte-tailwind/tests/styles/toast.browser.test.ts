import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ToastOverride from './ToastOverride.svelte';

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const { component } = render(ToastOverride);
  component.create();

  const root = (await screen.findByText('Custom styles')).closest('[data-slot="toast-root"]');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-primary', 'p-6']));
  expect([...screen.getByText('Custom styles').classList]).toEqual(
    expect.arrayContaining(['text-lg']),
  );

  await expect.element(page.locator('[data-slot="toast-root"]')).toHaveCSS('padding', '24px');
});
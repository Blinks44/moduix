import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ComboboxOverride from './ComboboxOverride.svelte';

test('preserves semantic hosts with asChild and consumer utility classes', async () => {
  const { component } = render(ComboboxOverride);
  const root = screen.getByRole('region', { name: 'Fruit selection' });
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  expect(root.tagName).toBe('SECTION');
  expect([...root.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect(component.getRoot()).toBe(root);
  expect([...screen.getByText('Fruit').classList]).toEqual(
    expect.arrayContaining(['consumer-label']),
  );
  expect([...input.parentElement!.classList]).toEqual(expect.arrayContaining(['consumer-control']));
  expect([...input.classList]).toEqual(expect.arrayContaining(['consumer-input']));
  await expect.element(page.locator('[data-slot="combobox-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="combobox-input"]')).toHaveCSS('height', '36px');
});
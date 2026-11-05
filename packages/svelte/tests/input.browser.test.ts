import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import BoundInput from './input/BoundInput.svelte';
import InputRefs from './input/InputRefs.svelte';
import InputWidths from './input/InputWidths.svelte';

test('forwards the input ref on the ordinary path', () => {
  const { component } = render(InputRefs);

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(component.getRef()).toBe(input);
  expect(input.getAttribute('data-slot')).toBe('input-root');
});

test('preserves asChild composition and forwards its ref to the semantic input', async () => {
  const { component } = render(InputRefs, { props: { asChild: true } });

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(component.getRef()).toBe(input);
  await expect
    .element(page.getByRole('textbox', { name: 'Repository' }))
    .toHaveAttribute('name', 'repository');
  expect(input.getAttribute('data-slot')).toBe('input-root');
});

test.each([false, true])('supports controlled bind:value updates (asChild=%s)', async (asChild) => {
  const changes: string[] = [];
  const { component } = render(BoundInput, { props: { asChild, changes } });

  await expect.element(page.getByRole('textbox', { name: 'Project key' })).toHaveValue('initial');
  await page.getByRole('textbox', { name: 'Project key' }).fill('next');

  await expect.element(page.getByRole('textbox', { name: 'Project key' })).toHaveValue('next');
  await expect.element(page.getByText('next')).toBeAttached();
  expect(changes).toEqual(['next']);

  component.setValue('from parent');
  await expect
    .element(page.getByRole('textbox', { name: 'Project key' }))
    .toHaveValue('from parent');
  expect(changes).toEqual(['next']);
});

test('uses the native character width with htmlSize', () => {
  render(InputWidths);

  expect(screen.getByRole('textbox', { name: 'Full width' }).offsetWidth).toBe(600);
  expect(screen.getByRole('textbox', { name: 'Four characters' }).offsetWidth).toBeLessThan(200);
});

test('shrinks below its htmlSize width in a narrow flex row', () => {
  render(InputWidths, { props: { narrow: true } });

  expect(screen.getByRole('textbox', { name: 'Narrow' }).offsetWidth).toBe(80);
});
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import RadioGroupAsChild from './RadioGroupAsChild.svelte';
import RadioGroupOverride from './RadioGroupOverride.svelte';

test('keeps asChild composition semantic with an explicit item input', async () => {
  const { component } = render(RadioGroupAsChild);

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  await expect
    .element(page.getByTestId('custom-item'))
    .toHaveAttribute('data-slot', 'radio-group-item');
  expect([...item.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect(component.getItemRef()).toBe(item);
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(RadioGroupOverride);

  const root = screen.getByTestId('root');
  const item = screen.getByTestId('item');
  const control = screen.getByTestId('control');
  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...item.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['size-6', 'border-primary', 'bg-muted', 'before:size-3']),
  );
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.getByTestId('control')).toHaveCSS('width', '24px');
});
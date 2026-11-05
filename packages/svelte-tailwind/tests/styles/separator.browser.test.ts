import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import TestSeparator from '../../../svelte/tests/separator/TestSeparator.svelte';

test('applies the public defaults and direct styling props', async () => {
  const { component } = render(TestSeparator, {
    props: { 'data-testid': 'separator', class: 'custom-separator', style: 'color: red' },
  });

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');
  expect(component.getRef()).toBe(separator);

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  });
  expect(separator.classList.contains('custom-separator')).toBe(true);
  expect(separator.style).toMatchObject({ color: 'red' });
  await expect.element(page.getByTestId('separator')).toHaveCSS('display', 'block');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '1px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-style', 'solid');
  await expect.element(page.getByTestId('separator')).toHaveCSS('margin', '0px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('flex-shrink', '0');
  expect(separator.getBoundingClientRect().width).toBe(separator.parentElement!.clientWidth);
});

test('allows consumer utilities to replace selected defaults', async () => {
  render(TestSeparator, {
    props: { 'data-testid': 'separator', class: 'w-32 border-t-2 border-primary' },
  });

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect([...separator.classList]).toEqual(
    expect.arrayContaining(['w-32', 'border-primary', 'border-t-2']),
  );
  await expect.element(page.getByTestId('separator')).toHaveCSS('width', '128px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '2px');
});
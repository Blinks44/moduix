import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import CardOverride from './CardOverride.svelte';

test('merges consumer utility classes last on the root and parts', async () => {
  render(CardOverride);

  await expect.element(page.getByText('Customized body')).toHaveCount(1);
  const body = screen.getByText('Customized body');
  const root = body.parentElement!;

  expect(root.classList.contains('rounded-none')).toBe(true);
  expect([...body.classList]).toEqual(expect.arrayContaining(['px-2', 'pt-3', 'text-foreground']));
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-left', '8px');
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-top', '12px');
  expect(getComputedStyle(root).borderRadius).toBe('0px');
});
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import TagsInputAsChildClear from './TagsInputAsChildClear.svelte';
import TagsInputOverride from './TagsInputOverride.svelte';

test('lets consumer utilities replace Tailwind defaults and keeps visual parts visible', async () => {
  const { container } = render(TagsInputOverride);

  const root = container.querySelector('[data-slot="tags-input-root"]')!;
  const control = container.querySelector('[data-slot="tags-input-control"]')!;
  const input = container.querySelector('[data-slot="tags-input-input"]')!;
  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect([...control.classList]).toEqual(expect.arrayContaining(['rounded-lg']));
  expect([...input.classList]).toEqual(expect.arrayContaining(['h-8']));
  expect([...clearTrigger.classList]).toEqual(expect.arrayContaining(['size-5']));
  await expect.element(page.locator('[data-slot="tags-input-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="tags-input-input"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('width', '20px');
});

test('keeps consumer-owned styles on an asChild clear trigger', async () => {
  const { container } = render(TagsInputAsChildClear);

  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;
  expect([...clearTrigger.classList]).toEqual(expect.arrayContaining(['h-9', 'rounded-lg']));
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('height', '36px');
});
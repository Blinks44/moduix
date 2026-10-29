import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@/index';

test('lets consumer utilities replace defaults and keeps visual parts visible', async () => {
  const { container } = render(
    <TagsInput className="w-80" defaultValue={['React']}>
      <TagsInputLabel>Styled frameworks</TagsInputLabel>
      <TagsInputControl className="rounded-lg">
        <TagsInputItems />
        <TagsInputInput className="h-8" />
        <TagsInputClearTrigger className="size-5" aria-label="Clear styled frameworks" />
      </TagsInputControl>
    </TagsInput>,
  );

  const root = container.querySelector('[data-slot="tags-input-root"]')!;
  const control = container.querySelector('[data-slot="tags-input-control"]')!;
  const input = container.querySelector('[data-slot="tags-input-input"]')!;
  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect([...control!.classList]).toEqual(expect.arrayContaining(['rounded-lg']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['h-8']));
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['size-5']));
  await expect.element(page.locator('[data-slot="tags-input-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="tags-input-input"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('width', '20px');
});

test('keeps consumer-owned styles on an asChild clear trigger', async () => {
  const { container } = render(
    <TagsInput defaultValue={['React']}>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput />
      </TagsInputControl>
      <TagsInputClearTrigger asChild>
        <button className="h-9 rounded-lg" type="button">
          Clear all tags
        </button>
      </TagsInputClearTrigger>
    </TagsInput>,
  );

  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;

  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['h-9', 'rounded-lg']));
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('height', '36px');
});
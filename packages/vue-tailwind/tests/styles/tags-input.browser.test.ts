import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemContext,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
} from '@/index';

const tagsInputComponents = {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemContext,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
} as unknown as Record<string, Component>;

test('keeps the consumer in control of v-model values and forwards value details once', async () => {
  const details: string[][] = [];
  const Harness = defineComponent({
    components: tagsInputComponents,
    setup() {
      return { details, value: ref(['React']) };
    },
    template: `
      <TagsInput v-model="value" @value-change="details.push($event.value)">
        <TagsInputLabel>Controlled frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInput>
      <output>{{ value.join(',') }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('button', { name: 'Clear frameworks', exact: true }).click();

  await expect.poll(() => details).toEqual([[]]);
});

test('lets consumer utilities replace Tailwind defaults and keeps visual parts visible', async () => {
  const { container } = render(
    defineComponent({
      components: tagsInputComponents,
      template: `
        <TagsInput class="w-80" :default-value="['React']">
          <TagsInputLabel>Styled frameworks</TagsInputLabel>
          <TagsInputControl class="rounded-lg">
            <TagsInputItems />
            <TagsInputInput class="h-8" />
            <TagsInputClearTrigger class="size-5" aria-label="Clear styled frameworks" />
          </TagsInputControl>
        </TagsInput>
      `,
    }),
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
    defineComponent({
      components: tagsInputComponents,
      template: `
        <TagsInput :default-value="['React']">
          <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
          <TagsInputClearTrigger as-child>
            <button class="h-9 rounded-lg" type="button">Clear all tags</button>
          </TagsInputClearTrigger>
        </TagsInput>
      `,
    }),
  );

  const clearTrigger = container.querySelector('[data-slot="tags-input-clear-trigger"]')!;
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['h-9', 'rounded-lg']));
  await expect
    .element(page.locator('[data-slot="tags-input-clear-trigger"]'))
    .toHaveCSS('height', '36px');
});
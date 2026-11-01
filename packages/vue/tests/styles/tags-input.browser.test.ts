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
import { CalendarDate } from '@internationalized/date';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  DateInput,
  DateInputContext,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
} from '@/index';

const dateInputComponents = {
  DateInput,
  DateInputContext,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
} as unknown as Record<string, Component>;

test('keeps explicit inputs inside an asChild root and forwards refs', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: dateInputComponents,
    setup() {
      return { rootRef, releaseDate: [new CalendarDate(2026, 6, 22)] };
    },
    template: `
      <form>
        <DateInput ref="rootRef" as-child :default-value="releaseDate" name="release-date">
          <fieldset>
            <DateInputLabel>Release date</DateInputLabel>
            <DateInputControl>
              <DateInputSegments />
            </DateInputControl>
            <DateInputHiddenInput name="release-date" />
          </fieldset>
        </DateInput>
      </form>
    `,
  });

  const { container } = render(Harness);

  const root = container.querySelector('[data-slot="date-input-root"]')!;
  expect(root.tagName).toBe('FIELDSET');
  expect(rootRef.value?.$el).toBe(root);
  await expect
    .element(page.locator('[data-slot="date-input-root"]'))
    .toHaveAttribute('data-slot', 'date-input-root');
  expect(root.querySelector('input[type="hidden"]')!.getAttribute('name')).toBe('release-date');
});

test('applies native utilities to owned parts and lets consumer utilities win', async () => {
  const { container } = render({
    components: dateInputComponents,
    template: `
      <DateInput class="w-80 max-w-sm gap-4">
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl class="w-80 rounded-lg bg-muted px-0 text-primary">
          <DateInputSegmentGroup class="gap-2">
            <DateInputSegmentContext v-slot="segment">
              <DateInputSegment :segment="segment" class="min-w-0 px-0" />
            </DateInputSegmentContext>
          </DateInputSegmentGroup>
          <DateInputSeparator>to</DateInputSeparator>
        </DateInputControl>
      </DateInput>
    `,
  });

  const control = container.querySelector('[data-slot="date-input-control"]');
  const segmentGroup = container.querySelector('[data-slot="date-input-segment-group"]');
  const segment = container.querySelector('[data-slot="date-input-segment"]');

  expect([...control!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect(segmentGroup!.classList.contains('gap-2')).toBe(true);
  expect([...segment!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'px-0']));
});
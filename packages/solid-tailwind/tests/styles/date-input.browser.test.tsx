import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
} from '@/index';

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(() => (
    <DateInput class="w-80 max-w-sm gap-4">
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl class="w-80 rounded-lg bg-muted px-0 text-primary">
        <DateInputSegmentGroup class="gap-2">
          <DateInputSegmentContext>
            {(segment) => <DateInputSegment segment={segment} class="min-w-0 px-0" />}
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  ));

  const root = container.querySelector('[data-slot="date-input-root"]');
  const control = container.querySelector('[data-slot="date-input-control"]');
  const segmentGroup = container.querySelector('[data-slot="date-input-segment-group"]');
  const segment = container.querySelector('[data-slot="date-input-segment"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4']));
  expect([...control!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect(segmentGroup!.classList.contains('gap-2')).toBe(true);
  expect([...segment!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'px-0']));
});
import { CalendarDate } from '@internationalized/date';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
  useDateInput,
} from '../src';

function ProviderDateInput() {
  const dateInput = useDateInput({
    defaultValue: [new CalendarDate(2026, 6, 22)],
    name: 'report-date',
  });

  return (
    <DateInputRootProvider value={dateInput}>
      <DateInputLabel>Report date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput name="report-date" />
    </DateInputRootProvider>
  );
}

test('submits through explicit Ark hidden inputs', async () => {
  const { container } = render(() => (
    <form>
      <DateInput
        selectionMode="range"
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
      >
        <DateInputLabel>Travel dates</DateInputLabel>
        <DateInputControl>
          <DateInputSegments index={0} />
          <DateInputSeparator>to</DateInputSeparator>
          <DateInputSegments index={1} />
        </DateInputControl>
        <DateInputHiddenInput index={0} name="check-in" />
        <DateInputHiddenInput index={1} name="check-out" />
      </DateInput>
      <ProviderDateInput />
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="hidden"]')).toHaveLength(3);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['check-in[0]', '6/22/2026'],
    ['check-out[1]', '6/26/2026'],
    ['report-date', '6/22/2026'],
  ]);
  await page.getByRole('spinbutton').nth(0).press('ArrowUp');
  expect(new FormData(form).get('check-in[0]')).toBe('7/22/2026');
});

test('keeps explicit inputs inside an asChild root', async () => {
  render(() => (
    <form>
      <DateInput
        asChild={(props) => <fieldset {...props()} />}
        defaultValue={[new CalendarDate(2026, 6, 22)]}
        name="release-date"
      >
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput name="release-date" />
      </DateInput>
    </form>
  ));

  await expect
    .element(page.locator('fieldset input[type="hidden"]'))
    .toHaveAttribute('name', 'release-date');
});

test('preserves Ark segment semantics, styling hooks, and root refs', async () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <DateInput
      ref={(element) => (rootRef = element)}
      invalid
      defaultValue={[new CalendarDate(2026, 6, 22)]}
      name="release-date"
    >
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  ));

  expect(rootRef!.getAttribute('data-slot')).toBe('date-input-root');
  expect(rootRef!.getAttribute('data-scope')).toBe('date-input');

  const control = rootRef.querySelector('[data-slot="date-input-control"]');

  expect(control!.getAttribute('data-part')).toBe('control');
  expect(control!.hasAttribute('data-invalid')).toBe(true);
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
  await expect
    .element(page.getByRole('spinbutton').nth(0))
    .toHaveAttribute('data-slot', 'date-input-segment');
});

test('applies native utilities to the component-owned parts', async () => {
  render(() => (
    <DateInput>
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
        <DateInputSeparator>to</DateInputSeparator>
      </DateInputControl>
    </DateInput>
  ));
  await expect
    .element(page.locator('[data-slot="date-input-root"]').nth(0))
    .toHaveCSS('display', 'inline-flex');
  await expect
    .element(page.locator('[data-slot="date-input-root"]').nth(0))
    .toHaveCSS('flex-direction', 'column');
  await expect
    .element(page.locator('[data-slot="date-input-root"]').nth(0))
    .toHaveCSS('max-width', 'none');
  await expect
    .element(page.locator('[data-slot="date-input-root"]').nth(0))
    .toHaveCSS('gap', '4px');
  await expect
    .element(page.locator('[data-slot="date-input-label"]').nth(0))
    .toHaveCSS('font-size', '14px');
  await expect
    .element(page.locator('[data-slot="date-input-label"]').nth(0))
    .toHaveCSS('font-weight', '500');
  await expect
    .element(page.locator('[data-slot="date-input-control"]').nth(0))
    .toHaveCSS('min-height', '36px');
  await expect
    .element(page.locator('[data-slot="date-input-control"]').nth(0))
    .toHaveCSS('border-left-width', '1px');
  await expect
    .element(page.locator('[data-slot="date-input-control"]').nth(0))
    .toHaveCSS('padding-left', '12px');
  await expect
    .element(page.locator('[data-slot="date-input-segment-group"]').nth(0))
    .toHaveCSS('display', 'flex');
  await expect
    .element(page.locator('[data-slot="date-input-segment-group"]').nth(0))
    .toHaveCSS('gap', '2px');
  await expect
    .element(page.locator('[data-slot="date-input-segment"]').nth(0))
    .toHaveCSS('line-height', '24px');
  await expect
    .element(page.locator('[data-slot="date-input-segment"]').nth(0))
    .toHaveCSS('padding-left', '4px');
  await expect
    .element(page.locator('[data-slot="date-input-separator"]').nth(0))
    .toHaveCSS('user-select', 'none');
});

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
  expect(['w-full', 'max-w-none', 'gap-1'].some((name) => root!.classList.contains(name))).toBe(
    false,
  );
  expect([...control!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect(
    ['w-full', 'rounded-md', 'bg-background', 'px-3'].some((name) =>
      control!.classList.contains(name),
    ),
  ).toBe(false);
  expect(segmentGroup!.classList.contains('gap-2')).toBe(true);
  expect(segmentGroup!.classList.contains('gap-0.5')).toBe(false);
  expect([...segment!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'px-0']));
  expect(['min-w-[2ch]', 'px-1'].some((name) => segment!.classList.contains(name))).toBe(false);
});
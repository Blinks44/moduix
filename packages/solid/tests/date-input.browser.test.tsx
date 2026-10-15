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
  DateInputSegments,
  DateInputSeparator,
  useDateInput,
  Field,
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

test('sizes the root to its content and stretches the control to the root', () => {
  render(() => (
    <div style={{ width: '600px' }}>
      <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
    </div>
  ));

  const root = document.querySelector<HTMLElement>('[data-slot="date-input-root"]')!;
  const control = document.querySelector<HTMLElement>('[data-slot="date-input-control"]')!;

  expect(root.offsetWidth).toBeLessThan(300);
  expect(control.offsetWidth).toBe(root.offsetWidth);
});

test('does not dim a disabled date input twice inside a disabled field', () => {
  render(() => (
    <Field disabled>
      <DateInput disabled>
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
      </DateInput>
    </Field>
  ));

  const field = document.querySelector('[data-slot="field-root"]')!;
  const root = document.querySelector('[data-slot="date-input-root"]')!;

  expect(getComputedStyle(field).opacity).toBe('0.5');
  expect(getComputedStyle(root).opacity).toBe('1');
});

test('shows a focused placeholder segment in the foreground color', async () => {
  render(() => (
    <DateInput>
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  ));

  await page.getByRole('spinbutton').nth(0).click();
  await new Promise((resolve) => setTimeout(resolve, 400));

  const label = document.querySelector('[data-slot="date-input-label"]')!;
  const segment = document.querySelector('[data-slot="date-input-segment"]')!;

  expect(segment.hasAttribute('data-placeholder-shown')).toBe(true);
  expect(getComputedStyle(segment).color).toBe(getComputedStyle(label).color);
});
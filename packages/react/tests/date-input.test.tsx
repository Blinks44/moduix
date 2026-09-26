import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
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

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render(
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
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="hidden"]')).toHaveLength(3);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['check-in[0]', '6/22/2026'],
    ['check-out[1]', '6/26/2026'],
    ['report-date', '6/22/2026'],
  ]);
});

test('keeps explicit inputs inside an asChild root', () => {
  const { container } = render(
    <form>
      <DateInput asChild defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
        <fieldset>
          <DateInputLabel>Release date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
          <DateInputHiddenInput name="release-date" />
        </fieldset>
      </DateInput>
    </form>,
  );

  expect(container.querySelector('fieldset input[type="hidden"]')).toHaveAttribute(
    'name',
    'release-date',
  );
});

test('preserves Ark segment semantics, styling hooks, and root refs', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <DateInput
      ref={rootRef}
      invalid
      defaultValue={[new CalendarDate(2026, 6, 22)]}
      name="release-date"
    >
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'date-input-root');
  expect(rootRef.current).toHaveAttribute('data-scope', 'date-input');

  const control = rootRef.current?.querySelector('[data-slot="date-input-control"]');

  expect(control).toHaveAttribute('data-part', 'control');
  expect(control).toHaveAttribute('data-invalid');
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute('data-slot', 'date-input-segment');
});
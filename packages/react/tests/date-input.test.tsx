import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { DateInput, useDateInput } from '../src';

function ProviderDateInput() {
  const dateInput = useDateInput({
    defaultValue: [new CalendarDate(2026, 6, 22)],
    name: 'report-date',
  });

  return (
    <DateInput.RootProvider value={dateInput}>
      <DateInput.Label>Report date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput.RootProvider>
  );
}

test('renders Ark-shaped range names and automatic form inputs', () => {
  const { container } = render(
    <form>
      <DateInput
        selectionMode="range"
        names={['check-in', 'check-out']}
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
      >
        <DateInput.Label>Travel dates</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments index={0} />
          <DateInput.Separator>to</DateInput.Separator>
          <DateInput.Segments index={1} />
        </DateInput.Control>
      </DateInput>
      <ProviderDateInput />
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('[data-slot="date-input-hidden-input"]')).toHaveLength(3);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['check-in[0]', '6/22/2026'],
    ['check-out[1]', '6/26/2026'],
    ['report-date', '6/22/2026'],
  ]);
});

test('keeps automatic inputs inside an asChild root', () => {
  const { container } = render(
    <form>
      <DateInput asChild defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
        <fieldset>
          <DateInput.Label>Release date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </fieldset>
      </DateInput>
    </form>,
  );

  expect(container.querySelector('fieldset [data-slot="date-input-hidden-input"]')).toHaveAttribute(
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
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
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
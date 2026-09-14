import { CalendarDate } from '@internationalized/date';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
      <DateInput.HiddenInput name="report-date" />
    </DateInput.RootProvider>
  );
}

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render(() => (
    <form>
      <DateInput
        selectionMode="range"
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
      >
        <DateInput.Label>Travel dates</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments index={0} />
          <DateInput.Separator>to</DateInput.Separator>
          <DateInput.Segments index={1} />
        </DateInput.Control>
        <DateInput.HiddenInput index={0} name="check-in" />
        <DateInput.HiddenInput index={1} name="check-out" />
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
});

test('keeps explicit inputs inside an asChild root', () => {
  const { container } = render(() => (
    <form>
      <DateInput
        asChild={(props) => <fieldset {...props()} />}
        defaultValue={[new CalendarDate(2026, 6, 22)]}
        name="release-date"
      >
        <DateInput.Label>Release date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput name="release-date" />
      </DateInput>
    </form>
  ));

  expect(container.querySelector('fieldset input[type="hidden"]')).toHaveAttribute(
    'name',
    'release-date',
  );
});

test('preserves Ark segment semantics, styling hooks, and root refs', () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <DateInput
      ref={(element) => (rootRef = element)}
      invalid
      defaultValue={[new CalendarDate(2026, 6, 22)]}
      name="release-date"
    >
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'date-input-root');
  expect(rootRef).toHaveAttribute('data-scope', 'date-input');

  const control = rootRef.querySelector('[data-slot="date-input-control"]');

  expect(control).toHaveAttribute('data-part', 'control');
  expect(control).toHaveAttribute('data-invalid');
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute('data-slot', 'date-input-segment');
});
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
      <DateInput.HiddenInput name="report-date" />
    </DateInput.RootProvider>
  );
}

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render(
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
          <DateInput.Label>Release date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
          <DateInput.HiddenInput name="release-date" />
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

test('applies native utilities to the component-owned parts', () => {
  const { container } = render(
    <DateInput>
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
        <DateInput.Separator>to</DateInput.Separator>
      </DateInput.Control>
    </DateInput>,
  );

  expect(container.querySelector('[data-slot="date-input-root"]')).toHaveClass(
    'inline-flex',
    'w-full',
    'max-w-none',
    'flex-col',
    'items-start',
    'gap-1',
  );
  expect(container.querySelector('[data-slot="date-input-label"]')).toHaveClass(
    'text-sm',
    'font-medium',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="date-input-control"]')).toHaveClass(
    'inline-flex',
    'w-full',
    'min-h-control-md',
    'items-center',
    'rounded-md',
    'border-border',
    'bg-background',
    'px-3',
    'py-1',
  );
  expect(container.querySelector('[data-slot="date-input-segment-group"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-0.5',
    'tabular-nums',
  );
  expect(container.querySelector('[data-slot="date-input-segment"]')).toHaveClass(
    'min-w-[2ch]',
    'rounded-sm',
    'px-1',
    'py-0',
    'text-center',
    'leading-6',
  );
  expect(container.querySelector('[data-slot="date-input-separator"]')).toHaveClass(
    'text-muted-foreground',
    'select-none',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(
    <DateInput className="w-80 max-w-sm gap-4">
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control className="w-80 rounded-lg bg-muted px-0 text-primary">
        <DateInput.SegmentGroup className="gap-2">
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment segment={segment} className="min-w-0 px-0" />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
    </DateInput>,
  );

  const root = container.querySelector('[data-slot="date-input-root"]');
  const control = container.querySelector('[data-slot="date-input-control"]');
  const segmentGroup = container.querySelector('[data-slot="date-input-segment-group"]');
  const segment = container.querySelector('[data-slot="date-input-segment"]');

  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4');
  expect(root).not.toHaveClass('w-full', 'max-w-none', 'gap-1');
  expect(control).toHaveClass('w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary');
  expect(control).not.toHaveClass('w-full', 'rounded-md', 'bg-background', 'px-3');
  expect(segmentGroup).toHaveClass('gap-2');
  expect(segmentGroup).not.toHaveClass('gap-0.5');
  expect(segment).toHaveClass('min-w-0', 'px-0');
  expect(segment).not.toHaveClass('min-w-[2ch]', 'px-1');
});
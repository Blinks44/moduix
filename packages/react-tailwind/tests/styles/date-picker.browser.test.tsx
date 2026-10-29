import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { DatePicker, DatePickerLabel, DatePickerControl, DatePickerInput } from '@/index';

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(
    <DatePicker className="w-full max-w-sm gap-4">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerControl className="w-80 gap-4">
        <DatePickerInput className="h-10 bg-muted ps-0 pe-0" />
      </DatePickerControl>
    </DatePicker>,
  );

  const root = container.querySelector('[data-slot="date-picker-root"]')!;
  const control = container.querySelector('[data-slot="date-picker-control"]')!;
  const input = screen.getByRole('textbox');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'max-w-sm', 'gap-4']));
  expect([...control!.classList]).toEqual(expect.arrayContaining(['w-80', 'gap-4']));
  expect([...input!.classList]).toEqual(
    expect.arrayContaining(['h-10', 'bg-muted', 'ps-0', 'pe-0']),
  );
});
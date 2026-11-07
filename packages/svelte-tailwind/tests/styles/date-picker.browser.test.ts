import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import DatePickerOverride from './DatePickerOverride.svelte';

test('applies Tailwind defaults before consumer classes', async () => {
  render(DatePickerOverride);

  const root = screen
    .getByRole('textbox', { name: 'Release date' })
    .closest('[data-slot="date-picker-root"]');
  expect(root!.classList.contains('custom-root')).toBe(true);
});
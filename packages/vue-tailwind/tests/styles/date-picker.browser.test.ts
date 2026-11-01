import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContext,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerRangeField,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerValueText,
  DatePickerYearSelect,
  Field,
  Fieldset,
} from '@/index';

const datePickerComponents = {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContext,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerRangeField,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerValueText,
  DatePickerYearSelect,
  Field,
  Fieldset,
};

test('applies Tailwind defaults before consumer classes', async () => {
  const Harness = defineComponent({
    components: datePickerComponents,
    template:
      '<DatePicker class="custom-root"><DatePickerLabel>Release date</DatePickerLabel><DatePickerField /></DatePicker>',
  });

  render(Harness);
  const root = screen
    .getByRole('textbox', { name: 'Release date' })
    .closest('[data-slot="date-picker-root"]');
  expect(root!.classList.contains('custom-root')).toBe(true);
});
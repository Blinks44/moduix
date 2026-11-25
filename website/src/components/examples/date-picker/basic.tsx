import {
  DatePicker,
  DatePickerField,
  DatePickerLabel,
  DatePickerPanel,
  parseDate,
} from '@moduix/react/date-picker';

export default function DatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPanel />
    </DatePicker>
  );
}
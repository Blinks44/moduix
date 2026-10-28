import { parseDate } from '@ark-ui/react/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerDayTable,
  DatePickerMonthTable,
  DatePickerYearTable,
} from '@moduix/react/date-picker';

// Anatomy scene: the basic example kept open and inline so every part can be outlined.
export default function DatePickerAnatomy() {
  return (
    <div
      style={{
        minHeight: 480,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <DatePicker
        open
        portalled={false}
        defaultValue={[parseDate('2026-06-22')]}
        name="release-date"
      >
        <DatePickerLabel>Release date</DatePickerLabel>
        <DatePickerField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerDayTable />
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerMonthTable />
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerYearTable />
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
    </div>
  );
}
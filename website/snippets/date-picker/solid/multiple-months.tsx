import { parseDate } from '@ark-ui/solid/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerRangeText,
  DatePickerDayTable,
} from '@moduix/solid/date-picker';

export default function MultipleMonthsDatePickerDemo() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePickerLabel>Planning window</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerRangeText />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <div>
            <DatePickerDayTable showHeader={false} />
            <DatePickerDayTable offset={1} showHeader={false} />
          </div>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}
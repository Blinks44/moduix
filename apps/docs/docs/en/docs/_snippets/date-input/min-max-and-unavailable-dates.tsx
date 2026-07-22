import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
export default function MinMaxDateInputDemo() {
  return (
    <PreviewLayout width="10rem">
      <DateInput
        defaultValue={[new CalendarDate(2026, 6, 24)]}
        min={minDate}
        max={maxDate}
        isDateUnavailable={(date) => date.day === unavailableDay}
      >
        <DateInput.Label>Booking date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
    </PreviewLayout>
  );
}
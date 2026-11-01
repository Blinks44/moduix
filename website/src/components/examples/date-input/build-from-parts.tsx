import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
} from '@moduix/react/date-input';

export default function BuildFromPartsDateInputDemo() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegmentGroup>
          <DateInputSegmentContext>
            {(segment) => <DateInputSegment segment={segment} />}
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  );
}
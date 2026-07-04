/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext } from '@ark-ui/react/date-input';
import { CalendarDateTime } from '@internationalized/date';
import { DateInput } from '@moduix/react';

function DateInputSegments() {
  return (
    <DateInput.SegmentGroup>
      <DateInputSegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInputSegmentContext>
    </DateInput.SegmentGroup>
  );
}
export function GranularityDateInputDemo() {
  return (
    <DateInput
      granularity="minute"
      hourCycle={24}
      defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
    >
      <DateInput.Label>Date and time</DateInput.Label>
      <DateInput.Control>
        <DateInputSegments />
      </DateInput.Control>
      <DateInput.HiddenInput name="scheduled-at" />
    </DateInput>
  );
}

//#endregion
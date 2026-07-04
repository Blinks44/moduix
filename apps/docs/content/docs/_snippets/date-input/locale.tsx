/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext } from '@ark-ui/react/date-input';
import { CalendarDate } from '@internationalized/date';
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
export function LocaleDateInputDemo() {
  return (
    <DateInput locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
      <DateInput.Label>German locale</DateInput.Label>
      <DateInput.Control>
        <DateInputSegments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}

//#endregion
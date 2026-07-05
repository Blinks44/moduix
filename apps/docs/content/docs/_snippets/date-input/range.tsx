/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext } from '@ark-ui/react/date-input';
import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];
function DateInputSegments({ index }: { index?: number }) {
  return (
    <DateInput.SegmentGroup index={index}>
      <DateInputSegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInputSegmentContext>
    </DateInput.SegmentGroup>
  );
}
export function RangeDateInputDemo() {
  return (
    <DateInput selectionMode="range" defaultValue={defaultRange}>
      <DateInput.Label>Travel dates</DateInput.Label>
      <DateInput.Control className="date-input-range-control">
        <DateInputSegments index={0} />
        <DateInput.Separator>to</DateInput.Separator>
        <DateInputSegments index={1} />
      </DateInput.Control>
      <DateInput.HiddenInput index={0} name="check-in" />
      <DateInput.HiddenInput index={1} name="check-out" />
    </DateInput>
  );
}

//#endregion
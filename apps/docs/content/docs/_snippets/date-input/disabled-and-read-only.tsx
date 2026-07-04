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
export function DisabledReadOnlyDateInputDemo() {
  return (
    <div className="date-input-state-grid">
      <DateInput disabled defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="disabled-date" />
      </DateInput>

      <DateInput readOnly defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="read-only-date" />
      </DateInput>
    </div>
  );
}

//#endregion
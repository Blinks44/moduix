/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext, type DateInputDateValue } from '@ark-ui/react/date-input';
import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';
import { useState } from 'react';

function DateInputSegments() {
  return (
    <DateInput.SegmentGroup>
      <DateInputSegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInputSegmentContext>
    </DateInput.SegmentGroup>
  );
}
export function ControlledDateInputDemo() {
  const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);
  return (
    <div>
      <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
        <DateInput.Label>Controlled date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
      <div className="date-input-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}

//#endregion
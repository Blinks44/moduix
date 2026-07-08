/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext } from '@ark-ui/react/date-input';
import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function CustomSegmentsDateInputDemo() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInput.Label>Custom segments</DateInput.Label>
      <DateInput.Control className="date-input-custom-control">
        <DateInput.SegmentGroup>
          <DateInputSegmentContext>
            {(segment) => (
              <DateInput.Segment
                segment={segment}
                className={
                  segment.type === 'day' ? 'date-input-day-segment' : 'date-input-custom-segment'
                }
              />
            )}
          </DateInputSegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput name="custom-date" />
    </DateInput>
  );
}

//#endregion
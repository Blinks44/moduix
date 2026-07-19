/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function CustomSegmentsDateInputDemo() {
  return (
    <DateInput name="custom-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInput.Label>Custom segments</DateInput.Label>
      <DateInput.Control className="date-input-custom-control">
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => (
              <DateInput.Segment
                segment={segment}
                className={
                  segment.type === 'day' ? 'date-input-day-segment' : 'date-input-custom-segment'
                }
              />
            )}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
    </DateInput>
  );
}

//#endregion
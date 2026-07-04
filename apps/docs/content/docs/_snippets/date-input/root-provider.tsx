/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext, useDateInput } from '@ark-ui/react/date-input';
import { today } from '@internationalized/date';
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
export function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
  });
  return (
    <div>
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Report date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="report-date" />
      </DateInput.RootProvider>
      <div className="date-input-root-provider-actions">
        <button type="button" onClick={() => dateInput.clearValue()}>
          Clear
        </button>
        <button type="button" onClick={() => dateInput.focus()}>
          Focus
        </button>
      </div>
    </div>
  );
}

//#endregion
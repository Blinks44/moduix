/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInputSegmentContext } from '@ark-ui/react/date-input';
import { DateInput, Field } from '@moduix/react';

function DateInputSegments() {
  return (
    <DateInput.SegmentGroup>
      <DateInputSegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInputSegmentContext>
    </DateInput.SegmentGroup>
  );
}
export function DateInputFieldDemo() {
  return (
    <Field invalid>
      <DateInput required invalid>
        <DateInput.Label>Deadline</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="deadline" />
      </DateInput>
      <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
    </Field>
  );
}

//#endregion
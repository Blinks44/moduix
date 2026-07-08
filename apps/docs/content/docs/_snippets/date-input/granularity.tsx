/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDateTime } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function GranularityDateInputDemo() {
  return (
    <DateInput
      granularity="minute"
      hourCycle={24}
      defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
    >
      <DateInput.Label>Date and time</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput name="scheduled-at" />
    </DateInput>
  );
}

//#endregion
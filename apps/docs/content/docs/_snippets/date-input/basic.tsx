/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function DateInputDemo() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}

//#endregion
/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function LocaleDateInputDemo() {
  return (
    <DateInput locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
      <DateInput.Label>German locale</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  );
}

//#endregion
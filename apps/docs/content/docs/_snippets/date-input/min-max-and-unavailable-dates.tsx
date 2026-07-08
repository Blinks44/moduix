/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
export function MinMaxDateInputDemo() {
  return (
    <DateInput
      defaultValue={[new CalendarDate(2026, 6, 24)]}
      min={minDate}
      max={maxDate}
      isDateUnavailable={(date) => date.day === unavailableDay}
    >
      <DateInput.Label>Booking date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}

//#endregion
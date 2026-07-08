/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function DisabledReadOnlyDateInputDemo() {
  return (
    <div className="date-input-state-grid">
      <DateInput disabled defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput name="disabled-date" />
      </DateInput>

      <DateInput readOnly defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput name="read-only-date" />
      </DateInput>
    </div>
  );
}

//#endregion
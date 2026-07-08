/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useDateInput } from '@ark-ui/react/date-input';
import { today } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
  });
  return (
    <div>
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Report date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
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
/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { today } from '@internationalized/date';
import { DateInput, useDateInput } from '@moduix/react';

export function RootProviderDateInputDemo() {
  const dateInput = useDateInput({
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
  return (
    <div>
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Report date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
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
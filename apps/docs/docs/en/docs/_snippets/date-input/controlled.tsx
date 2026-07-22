import { CalendarDate } from '@internationalized/date';
import { DateInput, type DateInputDateValue } from '@moduix/react';
import { useState } from 'react';

export default function ControlledDateInputDemo() {
  const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);
  return (
    <div>
      <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
        <DateInput.Label>Controlled date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
      <div className="date-input-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}
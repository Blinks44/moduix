/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const priorityOptions = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Normal',
    value: 'normal',
  },
  {
    label: 'High',
    value: 'high',
  },
];
export function SelectFieldDemo() {
  return (
    <Field required>
      <Field.Label>Priority</Field.Label>
      <Field.Select defaultValue="">
        <option value="" disabled>
          Select priority
        </option>
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field.Select>
      <Field.HelperText>Used for triage queues.</Field.HelperText>
    </Field>
  );
}

//#endregion
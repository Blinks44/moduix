//#region demo
import { Checkbox } from '@moduix/react';
import { useState } from 'react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxControlledGroupDemo() {
  const [value, setValue] = useState(['push'] as string[]);

  return (
    <Checkbox.Group value={value} onValueChange={setValue} name="notifications">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{option.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
//#endregion
//#region demo
import { Checkbox } from '@moduix/react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxGroupDemo() {
  return (
    <Checkbox.Group defaultValue={['email']} name="notifications">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <Checkbox.Control />
          <Checkbox.Label>{option.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
//#endregion
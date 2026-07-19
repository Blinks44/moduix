//#region demo
import { Checkbox } from '@moduix/react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxInvalidGroupDemo() {
  return (
    <Checkbox.Group invalid defaultValue={['email']} name="notifications">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <Checkbox.Control />
          <Checkbox.Label>{option.label}</Checkbox.Label>
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
//#endregion
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { useState } from 'react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export default function CheckboxControlledGroupDemo() {
  const [value, setValue] = useState(['push'] as string[]);

  return (
    <CheckboxGroup value={value} onValueChange={setValue} name="notifications">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <CheckboxControl />
          <CheckboxLabel>{option.label}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
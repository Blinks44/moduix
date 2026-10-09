import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export default function CheckboxInvalidGroupDemo() {
  return (
    <CheckboxGroup invalid defaultValue={['email']} name="notifications">
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
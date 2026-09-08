import { Checkbox } from '@moduix/solid/checkbox';
import { For } from 'solid-js';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export default function CheckboxInvalidGroupDemo() {
  return (
    <Checkbox.Group invalid defaultValue={['email']} name="notifications">
      <For each={options}>
        {(option) => (
          <Checkbox value={option.value}>
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        )}
      </For>
    </Checkbox.Group>
  );
}
import { Checkbox } from '@moduix/solid/checkbox';
import { createSignal, For } from 'solid-js';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export default function CheckboxControlledGroupDemo() {
  const [value, setValue] = createSignal<string[]>(['push']);

  return (
    <Checkbox.Group value={value} onValueChange={setValue} name="notifications">
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
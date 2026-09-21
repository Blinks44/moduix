import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { For } from 'solid-js';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export default function CheckboxInvalidGroupDemo() {
  return (
    <CheckboxGroup invalid defaultValue={['email']} name="notifications">
      <For each={options}>
        {(option) => (
          <Checkbox value={option.value}>
            <CheckboxControl />
            <CheckboxLabel>{option.label}</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        )}
      </For>
    </CheckboxGroup>
  );
}
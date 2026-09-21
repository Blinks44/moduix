import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { For } from 'solid-js';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export default function CheckboxMaxSelectedDemo() {
  return (
    <CheckboxGroup defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
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
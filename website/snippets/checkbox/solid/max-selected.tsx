import { Checkbox } from '@moduix/solid/checkbox';
import { For } from 'solid-js';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export default function CheckboxMaxSelectedDemo() {
  return (
    <Checkbox.Group defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
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
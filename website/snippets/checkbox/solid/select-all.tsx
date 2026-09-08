import { Checkbox } from '@moduix/solid/checkbox';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/checkbox/checkbox-select-all.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxSelectAllDemo() {
  const [value, setValue] = createSignal(['react']);
  const allValues = options.map((option) => option.value);
  const allSelected = () => value().length === allValues.length;
  const indeterminate = () => value().length > 0 && value().length < allValues.length;

  return (
    <div class={styles.root}>
      <Checkbox
        checked={indeterminate() ? 'indeterminate' : allSelected()}
        onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
      >
        <Checkbox.Control />
        <Checkbox.Label>Select all</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox>
      <Checkbox.Group value={value} onValueChange={setValue} name="frameworks">
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
    </div>
  );
}
import { Checkbox } from '@moduix/solid/checkbox';
import { Fieldset } from '@moduix/solid/fieldset';
import { For } from 'solid-js';
import styles from '@/components/examples/checkbox/checkbox-group-with-fieldset.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupFieldsetDemo() {
  return (
    <Fieldset class={styles.root}>
      <Fieldset.Legend>Frameworks</Fieldset.Legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
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
    </Fieldset>
  );
}
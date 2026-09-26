import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { Fieldset, FieldsetLegend } from '@moduix/solid/fieldset';
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
      <FieldsetLegend>Frameworks</FieldsetLegend>
      <CheckboxGroup defaultValue={['react']} name="frameworks">
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
    </Fieldset>
  );
}
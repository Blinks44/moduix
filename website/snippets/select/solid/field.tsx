import { createListCollection } from '@ark-ui/solid/collection';
import { Field } from '@moduix/solid/field';
import { Select } from '@moduix/solid/select';
import { For } from 'solid-js';
import styles from '@/components/examples/select/select-field.module.css';

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
});

export default function SelectFieldDemo() {
  return (
    <Field class={styles.root} required>
      <Select collection={frameworks} name="framework">
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select framework" />
          </Select.Trigger>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <For each={frameworks.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select>
      <Field.HelperText>Pick the framework used by this project.</Field.HelperText>
    </Field>
  );
}
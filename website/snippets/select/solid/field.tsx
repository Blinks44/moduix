import { createListCollection } from '@ark-ui/solid/collection';
import { Field, FieldHelperText } from '@moduix/solid/field';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectClearTrigger,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/solid/select';
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
        <SelectLabel>Framework</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder="Select framework" />
          </SelectTrigger>
          <SelectClearTrigger aria-label="Clear selection" />
          <SelectIndicator />
        </SelectControl>
        <SelectPositioner>
          <SelectContent>
            <For each={frameworks.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <FieldHelperText>Pick the framework used by this project.</FieldHelperText>
    </Field>
  );
}

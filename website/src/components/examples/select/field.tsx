import { createListCollection } from '@ark-ui/react/collection';
import { Field, FieldHelperText } from '@moduix/react/field';
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
  SelectHiddenSelect,
  SelectOption,
} from '@moduix/react/select';
import styles from '@/components/examples/select/select-field.module.css';

const frameworks = createListCollection({
  items: [
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'Solid',
      value: 'solid',
    },
    {
      label: 'Vue',
      value: 'vue',
    },
    {
      label: 'Svelte',
      value: 'svelte',
      disabled: true,
    },
  ],
});

export default function SelectFieldDemo() {
  return (
    <Field className={styles.root} required>
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
            {frameworks.items.map((item) => (
              <SelectOption key={item.value} item={item}>
                {item.label}
              </SelectOption>
            ))}
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <FieldHelperText>Pick the framework used by this project.</FieldHelperText>
    </Field>
  );
}
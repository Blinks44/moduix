import { createListCollection } from '@ark-ui/solid/collection';
import { Field, FieldHelperText } from '@moduix/solid/field';
import { Select } from '@moduix/solid/select';
import styles from '@/components/examples/field/field-select.module.css';

const priorities = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'High', value: 'high' },
  ],
});

export default function SelectFieldDemo() {
  return (
    <Field class={styles.root}>
      <Select collection={priorities} required name="priority">
        <Select.Label>Priority</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select priority" />
          </Select.Trigger>
          <Select.Indicator />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {priorities.items.map((item) => (
              <Select.Item item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select>
      <FieldHelperText>Used for triage queues.</FieldHelperText>
    </Field>
  );
}

import { createListCollection } from '@ark-ui/react/collection';
import { Field, FieldHelperText } from '@moduix/react/field';
import { Select } from '@moduix/react/select';
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
    <Field className={styles.root}>
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
              <Select.Item key={item.value} item={item}>
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

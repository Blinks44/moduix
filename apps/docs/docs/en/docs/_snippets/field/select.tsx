import { createListCollection } from '@ark-ui/react/collection';
import { Field, Select } from '@moduix/react';

const priorities = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'High', value: 'high' },
  ],
});

export default function SelectFieldDemo() {
  return (
    <Field required>
      <Select collection={priorities} name="priority">
        <Select.Label>Priority</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select priority" />
            <Select.Indicator />
          </Select.Trigger>
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
      </Select>
      <Field.HelperText>Used for triage queues.</Field.HelperText>
    </Field>
  );
}
import { createListCollection } from '@ark-ui/solid/collection';
import { Field, FieldHelperText } from '@moduix/solid/field';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/solid/select';
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
        <SelectLabel>Priority</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder="Select priority" />
          </SelectTrigger>
          <SelectIndicator />
        </SelectControl>
        <SelectPositioner>
          <SelectContent>
            {priorities.items.map((item) => (
              <SelectItem item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <FieldHelperText>Used for triage queues.</FieldHelperText>
    </Field>
  );
}

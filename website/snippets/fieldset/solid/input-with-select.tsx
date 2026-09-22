import { createListCollection } from '@ark-ui/solid/collection';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
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
import { For } from 'solid-js';
import styles from '@/components/examples/fieldset/fieldset-input-with-select.module.css';

const countryCodes = createListCollection({
  items: [
    {
      label: '+1',
      value: '+1',
    },
    {
      label: '+44',
      value: '+44',
    },
    {
      label: '+49',
      value: '+49',
    },
    {
      label: '+41',
      value: '+41',
    },
  ],
});

export default function PhoneInput() {
  return (
    <Fieldset class={styles.root}>
      <FieldsetLegend>Mobile number</FieldsetLegend>
      <div class={styles.phoneInput}>
        <Select
          class={styles.countryCode}
          collection={countryCodes}
          defaultValue={['+1']}
          name="countryCode"
        >
          <SelectLabel>Code</SelectLabel>
          <SelectControl>
            <SelectTrigger>
              <SelectValueText />
            </SelectTrigger>
            <SelectIndicator />
          </SelectControl>
          <SelectPositioner>
            <SelectContent>
              <For each={countryCodes.items}>
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
        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input type="tel" aria-label="Phone number" />
        </Field>
      </div>
      <FieldsetHelperText>Include the area code.</FieldsetHelperText>
    </Fieldset>
  );
}

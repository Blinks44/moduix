import { createListCollection } from '@ark-ui/react/collection';
import { Field, FieldLabel } from '@moduix/react/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
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
} from '@moduix/react/select';
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
    <Fieldset className={styles.root}>
      <FieldsetLegend>Mobile number</FieldsetLegend>
      <div className={styles.phoneInput}>
        <Select
          className={styles.countryCode}
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
              {countryCodes.items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              ))}
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

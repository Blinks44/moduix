import { Field, FieldLabel } from '@moduix/solid/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';

export default function DisabledFieldset() {
  return (
    <Fieldset class={styles.root} disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <FieldsetHelperText>
        Your address cannot be changed after order confirmation.
      </FieldsetHelperText>
      <Field>
        <FieldLabel>Street</FieldLabel>
        <Input value="123 Main St" />
      </Field>
      <Field>
        <FieldLabel>City</FieldLabel>
        <Input value="San Francisco" />
      </Field>
    </Fieldset>
  );
}

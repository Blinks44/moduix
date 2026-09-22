import { Field, FieldLabel } from '@moduix/react/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';

export default function DisabledFieldset() {
  return (
    <Fieldset className={styles.root} disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <FieldsetHelperText>
        Your address cannot be changed after order confirmation.
      </FieldsetHelperText>
      <Field>
        <FieldLabel>Street</FieldLabel>
        <Input defaultValue="123 Main St" />
      </Field>
      <Field>
        <FieldLabel>City</FieldLabel>
        <Input defaultValue="San Francisco" />
      </Field>
    </Fieldset>
  );
}
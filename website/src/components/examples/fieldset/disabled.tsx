import { Field } from '@moduix/react/field';
import { Fieldset } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';

export default function DisabledFieldset() {
  return (
    <Fieldset className={styles.root} disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <Fieldset.HelperText>
        Your address cannot be changed after order confirmation.
      </Fieldset.HelperText>
      <Field>
        <Field.Label>Street</Field.Label>
        <Input defaultValue="123 Main St" />
      </Field>
      <Field>
        <Field.Label>City</Field.Label>
        <Input defaultValue="San Francisco" />
      </Field>
    </Fieldset>
  );
}
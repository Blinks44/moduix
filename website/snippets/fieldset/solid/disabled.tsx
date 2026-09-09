import { Field } from '@moduix/solid/field';
import { Fieldset } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';

export default function DisabledFieldset() {
  return (
    <Fieldset class={styles.root} disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <Fieldset.HelperText>
        Your address cannot be changed after order confirmation.
      </Fieldset.HelperText>
      <Field>
        <Field.Label>Street</Field.Label>
        <Input value="123 Main St" />
      </Field>
      <Field>
        <Field.Label>City</Field.Label>
        <Input value="San Francisco" />
      </Field>
    </Fieldset>
  );
}
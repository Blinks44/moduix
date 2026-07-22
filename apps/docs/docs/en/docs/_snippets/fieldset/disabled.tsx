import { Field, Fieldset } from '@moduix/react';

export default function DisabledFieldset() {
  return (
    <Fieldset className="fieldset" disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <Fieldset.HelperText>
        Your address cannot be changed after order confirmation.
      </Fieldset.HelperText>
      <Field>
        <Field.Label>Street</Field.Label>
        <Field.Input defaultValue="123 Main St" />
      </Field>
      <Field>
        <Field.Label>City</Field.Label>
        <Field.Input defaultValue="San Francisco" />
      </Field>
    </Fieldset>
  );
}
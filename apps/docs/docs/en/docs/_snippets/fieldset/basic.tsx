import { Field, Fieldset } from '@moduix/react';

export default function ContactDetails() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Name</Field.Label>
        <Field.Input name="name" />
      </Field>
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input name="email" type="email" />
      </Field>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
    </Fieldset>
  );
}
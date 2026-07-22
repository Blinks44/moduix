import { Field, Fieldset } from '@moduix/react';

export default function PersonalInformation() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Personal information</Fieldset.Legend>
      <Field>
        <Field.Label>First name</Field.Label>
        <Field.Input />
        <Field.HelperText>As it appears on your ID.</Field.HelperText>
      </Field>
      <Field>
        <Field.Label>Last name</Field.Label>
        <Field.Input />
      </Field>
    </Fieldset>
  );
}
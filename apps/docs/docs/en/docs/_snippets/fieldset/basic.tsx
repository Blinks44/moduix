import { Field } from '@moduix/react/field';
import { Fieldset } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';

export default function ContactDetails() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Name</Field.Label>
        <Input name="name" />
      </Field>
      <Field>
        <Field.Label>Email</Field.Label>
        <Input name="email" type="email" />
      </Field>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
    </Fieldset>
  );
}
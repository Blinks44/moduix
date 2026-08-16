import { Field } from '@moduix/react/field';
import { Fieldset } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';

export default function PersonalInformation() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Personal information</Fieldset.Legend>
      <Field>
        <Field.Label>First name</Field.Label>
        <Input />
        <Field.HelperText>As it appears on your ID.</Field.HelperText>
      </Field>
      <Field>
        <Field.Label>Last name</Field.Label>
        <Input />
      </Field>
    </Fieldset>
  );
}
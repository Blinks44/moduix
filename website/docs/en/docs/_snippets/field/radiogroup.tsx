import { Field } from '@moduix/react/field';
import { RadioGroup } from '@moduix/react/radio-group';

export default function RadioGroupFieldDemo() {
  return (
    <Field invalid>
      <Field.Label>Account type</Field.Label>
      <RadioGroup invalid required defaultValue="team" name="account-type">
        <RadioGroup.Option value="personal">Personal account</RadioGroup.Option>
        <RadioGroup.Option value="team">Team account</RadioGroup.Option>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      <Field.ErrorText>Choose an account type.</Field.ErrorText>
    </Field>
  );
}
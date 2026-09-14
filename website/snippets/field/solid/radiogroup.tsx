import { Field } from '@moduix/solid/field';
import { RadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/field/field-radiogroup.module.css';

export default function RadioGroupFieldDemo() {
  return (
    <Field class={styles.root} invalid>
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
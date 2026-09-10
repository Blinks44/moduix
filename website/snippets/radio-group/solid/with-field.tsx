import { Field } from '@moduix/solid/field';
import { RadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-field.module.css';

export default function RadioGroupFieldDemo() {
  return (
    <Field class={styles.field} invalid>
      <Field.Label>Account type</Field.Label>
      <RadioGroup invalid required name="account-type">
        <RadioGroup.Option value="personal">Personal account</RadioGroup.Option>
        <RadioGroup.Option value="team">Team account</RadioGroup.Option>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      <Field.ErrorText>Choose an account type.</Field.ErrorText>
    </Field>
  );
}
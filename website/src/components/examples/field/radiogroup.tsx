import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { RadioGroup, RadioGroupOption } from '@moduix/react/radio-group';
import styles from '@/components/examples/field/field-radiogroup.module.css';

export default function RadioGroupFieldDemo() {
  return (
    <Field className={styles.root} invalid>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup invalid required defaultValue="team" name="account-type">
        <RadioGroupOption value="personal">Personal account</RadioGroupOption>
        <RadioGroupOption value="team">Team account</RadioGroupOption>
      </RadioGroup>
      <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
      <FieldErrorText>Choose an account type.</FieldErrorText>
    </Field>
  );
}
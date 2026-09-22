import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/react/field';
import {
  RadioGroup,
  RadioGroupOption,
} from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-field.module.css';

export default function RadioGroupFieldDemo() {
  return (
    <Field invalid className={styles.field}>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup invalid required name="account-type">
        <RadioGroupOption value="personal">Personal account</RadioGroupOption>
        <RadioGroupOption value="team">Team account</RadioGroupOption>
      </RadioGroup>
      <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
      <FieldErrorText>Choose an account type.</FieldErrorText>
    </Field>
  );
}

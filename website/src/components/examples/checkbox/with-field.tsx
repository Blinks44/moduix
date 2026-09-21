import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import styles from '@/components/examples/checkbox/checkbox-with-field.module.css';

export default function CheckboxFieldDemo() {
  return (
    <Field className={styles.root}>
      <Checkbox required name="terms" value="accepted">
        <CheckboxControl />
        <CheckboxLabel>Accept terms</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <FieldHelperText>Required to continue.</FieldHelperText>
      <FieldErrorText>Please accept the terms.</FieldErrorText>
    </Field>
  );
}

import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Field } from '@moduix/react/field';
import styles from '@/components/examples/checkbox/checkbox-with-field.module.css';

export default function CheckboxFieldDemo() {
  return (
    <Field className={styles.root}>
      <Checkbox required name="terms" value="accepted">
        <CheckboxControl />
        <CheckboxLabel>Accept terms</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Field.HelperText>Required to continue.</Field.HelperText>
      <Field.ErrorText>Please accept the terms.</Field.ErrorText>
    </Field>
  );
}
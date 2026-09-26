import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-basic.module.css';

export default function InputDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Name</FieldLabel>
      <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
      <Input name="name" placeholder="Enter your name" />
    </Field>
  );
}
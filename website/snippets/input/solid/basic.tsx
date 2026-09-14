import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/input/input-basic.module.css';

export default function InputDemo() {
  return (
    <Field class={styles.root}>
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input name="name" placeholder="Enter your name" />
    </Field>
  );
}
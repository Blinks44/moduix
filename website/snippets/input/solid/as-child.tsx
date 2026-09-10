import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/input/input-as-child.module.css';

export default function InputAsChildDemo() {
  return (
    <Field class={styles.root}>
      <Field.Label>Repository</Field.Label>
      <Input
        asChild={(props) => <input {...props()} name="repository" placeholder="owner/project" />}
      />
    </Field>
  );
}
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-custom-element.module.css';

export default function CustomElementInputDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Repository</FieldLabel>
      <Input asChild>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  );
}
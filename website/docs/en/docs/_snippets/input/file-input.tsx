import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-file-input.module.css';

export default function FileInputDemo() {
  return (
    <Field className={styles.root}>
      <Field.Label>Attachment</Field.Label>
      <Input accept=".pdf,.png" type="file" />
      <Field.HelperText>Choose a PDF or PNG file.</Field.HelperText>
    </Field>
  );
}
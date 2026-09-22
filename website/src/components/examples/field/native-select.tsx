import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { NativeSelect } from '@moduix/react/native-select';
import styles from '@/components/examples/field/field-native-select.module.css';

export default function NativeSelectFieldDemo() {
  return (
    <Field className={styles.root} required>
      <FieldLabel>Priority</FieldLabel>
      <NativeSelect defaultValue="" name="priority">
        <option value="" disabled>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </NativeSelect>
      <FieldHelperText>Used for triage queues.</FieldHelperText>
    </Field>
  );
}
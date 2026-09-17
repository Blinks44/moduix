import { Field } from '@moduix/solid/field';
import { NativeSelect } from '@moduix/solid/native-select';
import styles from '@/components/examples/field/field-native-select.module.css';

export default function NativeSelectFieldDemo() {
  return (
    <Field class={styles.root} required>
      <Field.Label>Priority</Field.Label>
      <NativeSelect name="priority">
        <option value="" disabled>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </NativeSelect>
      <Field.HelperText>Used for triage queues.</Field.HelperText>
    </Field>
  );
}
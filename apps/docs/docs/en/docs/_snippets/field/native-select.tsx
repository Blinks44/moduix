import { Field, NativeSelect } from '@moduix/react';

export default function NativeSelectFieldDemo() {
  return (
    <Field required>
      <Field.Label>Priority</Field.Label>
      <NativeSelect defaultValue="" name="priority">
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
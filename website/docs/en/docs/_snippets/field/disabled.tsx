import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function DisabledFieldDemo() {
  return (
    <Field disabled>
      <Field.Label>Organization</Field.Label>
      <Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}
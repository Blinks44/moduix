import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function ReadOnlyFieldDemo() {
  return (
    <Field readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}
import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function FieldDemo() {
  return (
    <Field required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  );
}
import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function InputDemo() {
  return (
    <Field>
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input name="name" placeholder="Enter your name" />
    </Field>
  );
}
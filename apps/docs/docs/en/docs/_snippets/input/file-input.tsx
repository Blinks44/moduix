import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function FileInputDemo() {
  return (
    <Field>
      <Field.Label>Attachment</Field.Label>
      <Input accept=".pdf,.png" type="file" />
      <Field.HelperText>Choose a PDF or PNG file.</Field.HelperText>
    </Field>
  );
}
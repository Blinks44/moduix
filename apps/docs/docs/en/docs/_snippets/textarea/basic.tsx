import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';

export default function TextareaDemo() {
  return (
    <Field>
      <Field.Label>Comment</Field.Label>
      <Field.HelperText>Included in the issue summary visible to the whole team.</Field.HelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  );
}
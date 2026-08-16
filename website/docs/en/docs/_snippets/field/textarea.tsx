import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';

export default function TextareaFieldDemo() {
  return (
    <Field>
      <Field.Label>Summary</Field.Label>
      <Textarea autoresize placeholder="Describe the request" />
      <Field.HelperText>The textarea grows as the content expands.</Field.HelperText>
    </Field>
  );
}
import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';

export default function AutoResizeTextareaDemo() {
  return (
    <Field>
      <Field.Label>Issue description</Field.Label>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}
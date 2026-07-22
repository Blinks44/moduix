import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function TextareaFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field>
        <Field.Label>Summary</Field.Label>
        <Field.Textarea placeholder="Describe the request" />
        <Field.HelperText>Use a short operational summary.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function TextareaAutoresizeFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field>
        <Field.Label>Details</Field.Label>
        <Field.Textarea autoresize placeholder="Add extra context" />
        <Field.HelperText>The textarea grows as the user types.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
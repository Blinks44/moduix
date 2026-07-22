import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function FieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field required>
        <Field.Label>
          Name
          <Field.RequiredIndicator />
        </Field.Label>
        <Field.Input placeholder="Enter your name" />
        <Field.HelperText>Visible on your public profile.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
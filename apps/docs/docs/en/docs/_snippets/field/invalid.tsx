import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function InvalidFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field invalid required>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" placeholder="name@example.com" />
        <Field.HelperText>Use your work email.</Field.HelperText>
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}
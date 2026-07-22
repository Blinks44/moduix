import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function DisabledFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field disabled>
        <Field.Label>Organization</Field.Label>
        <Field.Input placeholder="Acme Inc." />
        <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
import { Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ReadOnlyFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field readOnly>
        <Field.Label>Workspace key</Field.Label>
        <Field.Input defaultValue="MAPS" />
        <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
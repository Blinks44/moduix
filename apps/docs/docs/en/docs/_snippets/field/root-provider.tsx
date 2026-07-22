import { Field, useField } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function RootProviderFieldDemo() {
  const field = useField({
    id: 'root-provider-field',
    required: true,
  });
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field.RootProvider value={field}>
        <Field.Label>Project key</Field.Label>
        <Field.Input placeholder="MAPS" />
        <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
      </Field.RootProvider>
    </PreviewLayout>
  );
}
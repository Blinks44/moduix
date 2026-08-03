import { Field, useField } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function RootProviderFieldDemo() {
  const field = useField({
    id: 'root-provider-field',
    required: true,
  });
  return (
    <Field.RootProvider value={field}>
      <Field.Label>Project key</Field.Label>
      <Input placeholder="MAPS" />
      <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
    </Field.RootProvider>
  );
}
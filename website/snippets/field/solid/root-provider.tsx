import { Field, useField } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-root-provider.module.css';

export default function RootProviderFieldDemo() {
  const field = useField({
    id: 'root-provider-field',
    required: true,
  });

  return (
    <Field.RootProvider class={styles.root} value={field}>
      <Field.Label>Project key</Field.Label>
      <Input placeholder="MAPS" />
      <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
    </Field.RootProvider>
  );
}
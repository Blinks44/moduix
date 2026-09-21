import {
  Field,
  useField,
  FieldHelperText,
  FieldLabel,
  FieldRootProvider,
} from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-root-provider.module.css';

export default function RootProviderFieldDemo() {
  const field = useField({
    id: 'root-provider-field',
    required: true,
  });

  return (
    <FieldRootProvider class={styles.root} value={field}>
      <FieldLabel>Project key</FieldLabel>
      <Input placeholder="MAPS" />
      <FieldHelperText>The field state is created outside the rendered tree.</FieldHelperText>
    </FieldRootProvider>
  );
}
